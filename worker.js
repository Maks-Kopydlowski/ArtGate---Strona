function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function sanitizeHeader(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n]/g, '').trim();
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
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
  const isDev = env.ENVIRONMENT === 'development' || !env.ENVIRONMENT;
  if (isDev || requestOrigin.endsWith('.run.app') || requestOrigin.endsWith('.googleusercontent.com') || requestOrigin.includes('localhost') || requestOrigin.includes('127.0.0.1')) {
    return requestOrigin;
  }
  const allowed = ALLOWED_ORIGINS;
  return allowed.includes(requestOrigin) ? requestOrigin : 'https://kopydlowski.site';
}

// In-memory rate limiting map (cleans up stale entries to prevent memory leaks)
const rateLimitMap = new Map();

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
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://*.google.com https://*.googleapis.com; connect-src 'self' https://artgate-backend.maks-kopydlowski.workers.dev https://places.googleapis.com https://challenges.cloudflare.com https://api.resend.com;",
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
            rating: data.rating ?? 5.0,
            user_ratings_total: data.userRatingCount ?? 8,
            latest_review: latestReview,
            source: 'google_places_api'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      } catch (err) {
        console.error('[ArtGate Worker] Błąd Places API:', err);
        return new Response(
          JSON.stringify({
            ...fallbackData,
            error: 'Błąd pobierania opinii z serwera Google.'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // --- Endpoint: Formularz Kontaktowy ---
    if (url.pathname === '/api/contact' || url.pathname === '/contact') {
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

      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(
          JSON.stringify({ error: 'Niepoprawny JSON.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { name, phone, email, message, website, turnstileToken } = body;

      // Type checking validation to prevent runtime errors or exploit bypasses
      if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof message !== 'string' ||
        (phone !== undefined && phone !== null && typeof phone !== 'string') ||
        (website !== undefined && website !== null && typeof website !== 'string') ||
        (turnstileToken !== undefined && turnstileToken !== null && typeof turnstileToken !== 'string')
      ) {
        return new Response(
          JSON.stringify({ error: 'Nieprawidłowy format lub typ danych wejściowych.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Honeypot check
      if (website) {
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // 1. Rate Limiting check (max 5 submissions per 10 minutes from the same IP)
      const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
      const now = Date.now();
      const windowMs = 10 * 60 * 1000; // 10 minutes
      const limit = 5;

      // Memory-leak-free map cleanup: remove stale entries
      for (const [ip, data] of rateLimitMap.entries()) {
        const filtered = data.filter(timestamp => now - timestamp < windowMs);
        if (filtered.length === 0) {
          rateLimitMap.delete(ip);
        } else {
          rateLimitMap.set(ip, filtered);
        }
      }

      // Check count for current client IP
      const ipRequests = rateLimitMap.get(clientIP) || [];
      const validRequests = ipRequests.filter(timestamp => now - timestamp < windowMs);

      if (validRequests.length >= limit) {
        return new Response(
          JSON.stringify({ error: 'Przekroczono limit wysyłania wiadomości z Twojego adresu IP. Spróbuj ponownie później.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Turnstile verification (no fallback to test site keys)
      const turnstileSecret = env.TURNSTILE_SECRET_KEY;
      if (!turnstileSecret) {
        console.error('[ArtGate Worker] TURNSTILE_SECRET_KEY is missing in production environment!');
        return new Response(
          JSON.stringify({ error: 'Wystąpił błąd konfiguracji serwera (brak klucza weryfikacji).' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!turnstileToken) {
        return new Response(
          JSON.stringify({ error: 'Brak tokenu weryfikacji bezpieczeństwa.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      try {
        const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const verifyResponse = await fetch(verifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: clientIP,
          }).toString(),
        });

        const verifyData = await verifyResponse.json();
        if (!verifyData.success) {
          console.error('[ArtGate Worker] Turnstile verification failed:', verifyData);
          return new Response(
            JSON.stringify({ error: 'Weryfikacja bezpieczeństwa Cloudflare Turnstile nie powiodła się. Spróbuj ponownie.' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (err) {
        console.error('[ArtGate Worker] Turnstile verify API error:', err);
        return new Response(
          JSON.stringify({ error: 'Błąd połączenia z serwerem weryfikacji Turnstile.' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

      // Security limit checks for all fields
      if (name.trim().length > 100 || message.trim().length > 5000 || email.trim().length > 150 || (phone && phone.trim().length > 50)) {
        return new Response(
          JSON.stringify({ error: 'Przekroczono limit długości pól formularza.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Sanitize inputs to prevent header injection or future XSS
      const cleanName = sanitizeHeader(name);
      const cleanEmail = sanitizeHeader(email);
      const cleanPhone = sanitizeHeader(phone) || 'Nie podano';
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
          // Add this request timestamp to the rateLimitMap upon successful verification & email send
          validRequests.push(now);
          rateLimitMap.set(clientIP, validRequests);

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
    }

    // Default route 404
    return new Response(
      JSON.stringify({ error: 'Nie znaleziono ścieżki.' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
