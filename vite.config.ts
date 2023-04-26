import { defineConfig, UserConfigExport } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

const args = process.argv.slice(2)

let config: UserConfigExport | null = null

if (args.includes('--dev-react')) {
  config = defineConfig({
    plugins: [react()],
    root: 'resources/js',
    envDir: '../..',
    define: {
      'process.env': process.env,
    },

    server: {
      port: 3000,
      host: 'localhost',
    },
  })
} else {
  console.log('\nbuild react')

  config = defineConfig({
    plugins: [
      laravel({
        input: ['resources/js/index.tsx'],
      }),
      react(),
    ],
    define: {
      'process.env': process.env,
    },

    build: {
      outDir: 'public/build',
      emptyOutDir: true,
      manifest: true,
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/app.3s63ghc9.js',
          entryFileNames: 'js/app.3s63ghc9.js',
          assetFileNames: ({ name }) => {
            if (/\.css$/.test(name ?? '')) {
              return 'css/app.js72gb02k.css'
            }

            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'images/[name].[hash][extname]'
            }

            return '[name].[hash][extname]'
          },
        },
      },
    },
  })
}

export default config
