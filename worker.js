const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

const ALLOWED_ORIGINS = [
  'https://kopydlowski.site',
  'https://www.kopydlowski.site',
  'https://artgate.com.pl',
  'https://www.artgate.com.pl',
];

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

function getAllowedOrigin(requestOrigin, env) {
  const isDev = env.ENVIRONMENT === 'development';
  const allowed = isDev ? [...ALLOWED_ORIGINS, ...DEV_ORIGINS] : ALLOWED_ORIGINS;
  return allowed.includes(requestOrigin) ? requestOrigin : 'https://kopydlowski.site';
}

export default {
  async fetch(request, env, ctx) {
    const requestOrigin = request.headers.get('Origin') || '';
    const allowedOrigin = getAllowedOrigin(requestOrigin, env);

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    // --- Endpoint: Opinie Google ---
    if (url.pathname === '/reviews' || url.pathname === '/api/reviews') {
      if (request.method !== 'GET') {
        return new Response(
          JSON.stringify({ error: 'Metoda niedozwolona.' }),
          { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Allow': 'GET, OPTIONS' } }
        );
      }

      const apiKey = env.GOOGLE_PLACES_API_KEY;
      const placeId = env.GOOGLE_PLACE_ID;

      const fallbackData = {
        rating: parseFloat(env.FALLBACK_RATING || '5.0'),
        user_ratings_total: parseInt(env.FALLBACK_TOTAL_REVIEWS || '8', 10),
        latest_review: null,
        source: 'fallback'
      };

      if (!apiKey || !placeId) {
        return new Response(
          JSON.stringify(fallbackData),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      try {
        const googleUrl = `https://places.googleapis.com/v1/places/${placeId}`;
        const googleResponse = await fetch(googleUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
          },
          cf: { cacheTtl: 3600, cacheEverything: true }
        });

        if (!googleResponse.ok) {
          const errorText = await googleResponse.text();
          throw new Error(`Google API: ${googleResponse.status} - ${errorText}`);
        }

        const data = await googleResponse.json();

        // Wyciąganie pierwszej opinii z 5 gwiazdkami
        const reviews = data.reviews || [];
        const topFiveStarReview = reviews.find(r => r.rating === 5);

        const latestReview = topFiveStarReview ? {
          author: topFiveStarReview.authorAttribution?.displayName || 'Klient Google',
          text: topFiveStarReview.text?.text || topFiveStarReview.originalText?.text || '',
          publishTime: topFiveStarReview.relativePublishTimeDescription || ''
        } : null;

        return new Response(
          JSON.stringify({
            rating: data.rating || 5.0,
            user_ratings_total: data.userRatingCount || 8,
            latest_review: latestReview,
            source: 'google_places_api'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      } catch (err) {
        console.error('[ArtGate Worker] Błąd Places API:', err);
        return new Response(
          JSON.stringify({ ...fallbackData, error: err.message || err }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // --- Endpoint: Formularz Kontaktowy ---
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Metoda niedozwolona.' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Allow': 'POST, OPTIONS' } }
      );
    }

    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Oczekiwany Content-Type: application/json.' }),
        { status: 415, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Zbyt wiele zapytań.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Niepoprawny JSON.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { name, phone, email, message, website } = body;

    // Honeypot check
    if (website) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Brak wymaganych pól: name, email, message.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Podany adres email jest nieprawidłowy.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (name.trim().length > 100 || message.trim().length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Przekroczono limit długości pól.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = (phone || '').trim() || 'Nie podano';
    const cleanMessage = message.trim();

    const plainTextContent = `Nowe zgłoszenie z formularza kontaktowego ArtGate\n\n` +
      `Imię i nazwisko: ${cleanName}\n` +
      `Email: ${cleanEmail}\n` +
      `Telefon: ${cleanPhone}\n\n` +
      `Treść wiadomości:\n${cleanMessage}`;

    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Formularz ArtGate <kontakt@kopydlowski.site>',
          to: ['maks.kopydlowski@gmail.com'],
          reply_to: cleanEmail,
          subject: `Nowe zgłoszenie z formularza: ${cleanName}`,
          text: plainTextContent,
        }),
      });

      if (resendResponse.ok) {
        return new Response(
          JSON.stringify({ success: true, message: 'Wiadomość została wysłana pomyślnie.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const errorData = await resendResponse.text();
      console.error(`[ArtGate Worker] Resend API Error (${resendResponse.status}):`, errorData);

      return new Response(
        JSON.stringify({ error: 'Wystąpił problem z wysyłką wiadomości.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (err) {
      console.error('[ArtGate Worker] Błąd serwera:', err?.message || err);
      return new Response(
        JSON.stringify({ error: 'Wewnętrzny błąd serwera.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  },
};