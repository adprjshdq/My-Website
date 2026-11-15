import { exec } from 'node:child_process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Saat `npm run dev`, PDF CV dibuat ulang setiap kali isi CV atau skrip
 * generatornya disimpan. Dengan begitu tombol "Unduh PDF" di lokal tidak
 * pernah menampilkan versi lama. Untuk build, `prebuild` yang menanganinya.
 */
function cvPdfWatcher() {
  const target = (path) => fileURLToPath(new URL(path, import.meta.url)).replace(/\\/g, '/')

  return {
    name: 'cv-pdf-watcher',
    apply: 'serve',
    configureServer(server) {
      const watched = new Set([target('./src/data/cv.js'), target('./scripts/generate-cv-pdf.jsx')])
      let timer

      const onChange = (file) => {
        if (!watched.has(file.replace(/\\/g, '/'))) return

        clearTimeout(timer)
        timer = setTimeout(() => {
          exec('npm run cv:pdf', (error) => {
            if (error) {
              server.config.logger.error(`[cv] gagal membuat PDF: ${error.message}`)
              return
            }
            server.config.logger.info('[cv] PDF diperbarui dari src/data/cv.js')
          })
        }, 400)
      }

      server.watcher.on('change', onChange)
      server.watcher.on('add', onChange)
      server.httpServer?.once('close', () => {
        clearTimeout(timer)
        server.watcher.off('change', onChange)
        server.watcher.off('add', onChange)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cvPdfWatcher()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      // Dua halaman: portofolio (/) dan CV (/cv/) yang siap dicetak ke PDF.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        cv: fileURLToPath(new URL('./cv/index.html', import.meta.url)),
      },
    },
  },
})
