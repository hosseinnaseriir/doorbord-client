import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'date-fns-jalali/_lib/format/longFormatters': 'date-fns-jalali/esm/_lib/format/longFormatters',
    },
  },
  plugins: [react(), tsconfigPaths(),
  VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    manifest: {
      name: 'Doorbord PWA',
      short_name: 'doorbord_pwa',
      description: 'Doorbord PWA',
      theme_color: '#FF6000',
      background_color: '#1D1D1D',
      display: 'standalone',
      scope: '/',
      start_url: '/',

      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
  ],
})
