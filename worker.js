/**
 * ArtGate — Cloudflare Worker (Production-Ready)
 * Obsługuje formularz kontaktowy i wysyłkę maili przez Resend API.
 *
 * Zabezpieczenia:
 *  - CORS ograniczony do domeny produkcyjnej
 *  - In-memory rate limiting (5 req/min per IP)
 *  - Walidacja i sanityzacja danych wejściowych
 *  - Honeypot anti-bot check
 *  - Weryfikacja Content-Type
 *  - HTML escaping przed wstrzyknięciem do treści maila
 */

// --- Rate Limiter (In-Memory) ---
// Reset następuje przy restarcie Workera (akceptowalne dla podstawowej ochrony).
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuta
const RATE_LIMIT_MAX_REQUESTS = 5;       // max 5 zgłoszeń / minutę / IP

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

// --- HTML Escape (zapobieganie HTML Injection w treści maila) ---
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// --- Walidacja email ---
function isValidEmail(email) {
  // RFC 5322 uproszczona, wystarczająca do produkcji
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// --- Dozwolone origins ---
const ALLOWED_ORIGINS = [
  'https://kopydlowski.site',
  'https://www.kopydlowski.site',
  'https://artgate.com.pl',
  'https://www.artgate.com.pl',
];

// W dev dodajemy localhost
const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

function getAllowedOrigin(requestOrigin, env) {
  const isDev = env.ENVIRONMENT === 'development';
  const allowed = isDev ? [...ALLOWED_ORIGINS, ...DEV_ORIGINS] : ALLOWED_ORIGINS;

  if (allowed.includes(requestOrigin)) {
    return requestOrigin;
  }
  // Fallback — zwracamy produkcyjną domenę zamiast wildcard
  return 'https://kopydlowski.site';
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
    };

    // --- Obsługa Preflight (OPTIONS) ---
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    // --- Trasa: Opinie Google (GET /reviews lub /api/reviews) ---
    if (url.pathname === '/reviews' || url.pathname === '/api/reviews') {
      if (request.method !== 'GET') {
        return new Response(
          JSON.stringify({ error: 'Metoda niedozwolona. Użyj GET dla tej ścieżki.' }),
          { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Allow': 'GET, OPTIONS' } }
        );
      }

      const apiKey = env.GOOGLE_PLACES_API_KEY;
      const placeId = env.GOOGLE_PLACE_ID;

      // Domyślne dane gdy brak klucza lub błąd (ArtGate ma średnią 5.0)
      const fallbackData = {
        rating: parseFloat(env.FALLBACK_RATING || '5.0'),
        user_ratings_total: parseInt(env.FALLBACK_TOTAL_REVIEWS || '32', 10),
        source: 'fallback'
      };

      if (!apiKey || !placeId) {
        return new Response(
          JSON.stringify(fallbackData),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      try {
        const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}&language=pl`;

        // Cache na poziomie Cloudflare Edge na 1 godzinę (oszczędza limit API)
        const googleResponse = await fetch(googleUrl, {
          cf: {
            cacheTtl: 3600,
            cacheEverything: true,
          }
        });

        if (!googleResponse.ok) {
          throw new Error(`Google API status: ${googleResponse.status}`);
        }

        const data = await googleResponse.json();

        if (data.status === 'OK' && data.result) {
          const result = {
            rating: data.result.rating || 5.0,
            user_ratings_total: data.result.user_ratings_total || 32,
            source: 'google_places_api'
          };
          return new Response(
            JSON.stringify(result),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } else {
          console.error('[ArtGate Worker] Google Places API status błędu:', data.status, data.error_message);
          return new Response(
            JSON.stringify({ ...fallbackData, error: data.status, details: data.error_message }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (err) {
        console.error('[ArtGate Worker] Błąd pobierania opinii Google:', err);
        return new Response(
          JSON.stringify({ ...fallbackData, error: err.message || err }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // --- Odrzucenie metod innych niż POST dla formularza ---
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Metoda niedozwolona.' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Allow': 'POST, OPTIONS' } }
      );
    }

    // --- Weryfikacja Content-Type ---
    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Oczekiwany Content-Type: application/json.' }),
        { status: 415, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- Rate Limiting ---
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' } }
      );
    }

    // --- Parsowanie JSON ---
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Niepoprawny format danych (wymagany JSON).' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { name, phone, email, message, website } = body;

    // --- Honeypot (anti-bot) ---
    // Pole "website" jest ukryte dla ludzi. Jeśli jest wypełnione — to bot.
    if (website) {
      // Cichy sukces — bot nie wie, że został zablokowany
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- Walidacja pól wymaganych ---
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Brak wymaganych pól: name, email, message.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- Walidacja formatu email ---
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Podany adres email jest nieprawidłowy.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- Walidacja długości pól ---
    if (name.trim().length > 100) {
      return new Response(
        JSON.stringify({ error: 'Pole "Imię i nazwisko" jest zbyt długie (max 100 znaków).' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (message.trim().length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Wiadomość jest zbyt długa (max 5000 znaków).' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- Sanityzacja przed wstrzyknięciem do HTML maila ---
    const safeName    = escapeHtml(name.trim());
    const safeEmail   = escapeHtml(email.trim());
    const safePhone   = escapeHtml((phone || '').trim());
    const safeMessage = escapeHtml(message.trim());

    // --- Wysyłka przez Resend API ---
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
          reply_to: safeEmail,
          subject: `Nowe zgłoszenie z formularza: ${safeName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
              <h2 style="color: #1e40af; margin-bottom: 16px; font-size: 20px;">📬 Nowe zgłoszenie z formularza kontaktowego</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 140px;">Imię i nazwisko</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${safeEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Telefon</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${safePhone || '<em style="color: #94a3b8;">Nie podano</em>'}</td>
                </tr>
              </table>
              <div style="margin-top: 20px;">
                <p style="font-weight: bold; color: #475569; margin-bottom: 8px;">Treść wiadomości:</p>
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; white-space: pre-wrap; color: #0f172a; line-height: 1.6;">${safeMessage}</div>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Wiadomość wysłana z artgate.com.pl / kopydlowski.site</p>
            </div>
          `,
        }),
      });

      if (resendResponse.ok) {
        return new Response(
          JSON.stringify({ success: true, message: 'Wiadomość została wysłana pomyślnie.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Resend zwrócił błąd — logujemy szczegóły
      const errorData = await resendResponse.text();
      console.error(`[ArtGate Worker] Resend API Error (${resendResponse.status}):`, errorData);

      return new Response(
        JSON.stringify({ error: 'Wystąpił problem z wysyłką. Spróbuj ponownie lub skontaktuj się telefonicznie.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (err) {
      console.error('[ArtGate Worker] Nieoczekiwany błąd:', err?.message || err);
      return new Response(
        JSON.stringify({ error: 'Wewnętrzny błąd serwera. Spróbuj ponownie później.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  },
};