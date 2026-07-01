// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
  ],
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
