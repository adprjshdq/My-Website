import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { handleChatJson } from '../api/_chat.js';

const MAX_BODY_BYTES = 32 * 1024;

/**
 * Membaca `.env.local` / `.env` langsung dari disk.
 *
 * `loadEnv` milik Vite ikut menyalin `process.env` yang sudah ada, sehingga
 * nilai lama bisa bertahan setelah config di-reload. Untuk dev, membaca file
 * tiap request membuat perubahan API key/model langsung berlaku.
 */
function readLocalEnv() {
    const values = {};

    for (const file of ['.env.local', '.env']) {
        const path = resolve(process.cwd(), file);
        if (!existsSync(path)) continue;

        for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
            const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
            if (!match) continue;

            const [, key, raw] = match;
            // Nilai pertama menang: .env.local diperiksa sebelum .env.
            if (!(key in values)) values[key] = raw.replace(/^['"]|['"]$/g, '');
        }
    }

    return values;
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];

        req.on('data', (chunk) => {
            size += chunk.length;
            if (size > MAX_BODY_BYTES) {
                reject(new Error('body_too_large'));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });

        req.on('end', () => {
            try {
                resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
            } catch {
                reject(new Error('invalid_json'));
            }
        });

        req.on('error', reject);
    });
}

function sendJson(res, status, body) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
}

/**
 * Menjalankan `/api/chat` saat `npm run dev`.
 *
 * Vite tidak mengeksekusi folder `api/` seperti Vercel, jadi middleware ini
 * memakai logika yang sama dengan serverless function. Dengan begitu fitur
 * asisten bisa diuji lokal tanpa `vercel dev`.
 */
export function assistantApi() {
    return {
        name: 'assistant-api',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const pathname = (req.url || '').split('?')[0];
                if (pathname !== '/api/chat') return next();

                if (req.method !== 'POST') {
                    res.setHeader('Allow', 'POST');
                    sendJson(res, 405, { error: 'Metode tidak didukung.' });
                    return;
                }

                let payload;
                try {
                    payload = await readBody(req);
                } catch (error) {
                    const message =
                        error.message === 'body_too_large'
                            ? 'Permintaan terlalu besar.'
                            : 'Format permintaan tidak valid.';
                    sendJson(res, error.message === 'body_too_large' ? 413 : 400, { error: message });
                    return;
                }

                const env = readLocalEnv();
                const { status, body } = await handleChatJson({
                    payload,
                    ip: 'local-dev',
                    apiKey: env.GEMINI_API_KEY || process.env.GEMINI_API_KEY,
                    model: env.GEMINI_MODEL,
                });
                sendJson(res, status, body);
            });
        },
    };
}
