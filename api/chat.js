import { handleChatJson } from './_chat.js';

/**
 * Endpoint asisten AI untuk produksi (Vercel Function).
 *
 * POST /api/chat
 * { "messages": [{ "role": "user", "content": "..." }] }
 *
 * API key Gemini dibaca dari environment variable `GEMINI_API_KEY`
 * (atur di dashboard Vercel, jangan commit ke repository).
 */
export const config = { maxDuration: 30 };

function readBody(req) {
    if (req.body && typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') {
        try {
            return JSON.parse(req.body);
        } catch {
            return null;
        }
    }
    return null;
}

function clientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.trim()) {
        return forwarded.split(',')[0].trim();
    }
    if (typeof req.headers['x-real-ip'] === 'string') return req.headers['x-real-ip'];
    return 'unknown';
}

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Metode tidak didukung.' }));
        return;
    }

    const payload = readBody(req);
    const { status, body } = await handleChatJson({
        payload,
        ip: clientIp(req),
    });

    res.statusCode = status;
    res.end(JSON.stringify(body));
}
