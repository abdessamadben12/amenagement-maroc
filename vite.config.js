// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild, mode }) => ({
  plugins: [
    react(),
  ],
  server: {
    // En dev, les images envoyées depuis l'admin sont servies par l'API PHP.
    proxy: {
      '/uploads': loadEnv(mode, process.cwd(), '').VITE_API_BASE_URL || 'http://localhost:8080',
    },
  },
  build: {
    manifest: !isSsrBuild,
    target: 'es2017', // code plus moderne et léger
    assetsInlineLimit: 0, // évite de mettre les images dans le JS
    cssCodeSplit: true,
    sourcemap: false,
    
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // noms optimisés pour le cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: isSsrBuild ? '[name].js' : 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop()
          if (/png|jpe?g|svg|gif|webp|avif/i.test(ext)) {
            return 'assets/img/[name]-[hash][extname]'
          }
          if (/css/i.test(ext)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        ...(!isSsrBuild && {
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['framer-motion'],
          },
        }),
      },
    },
    
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}))
