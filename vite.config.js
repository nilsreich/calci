import { VitePWA } from 'vite-plugin-pwa'
export default {
  plugins: [
    VitePWA({
      includeAssets: ['favicon-16x16.png', 'favicon.ico'],  
      manifest: {
        name: 'Name of your app',
        short_name: 'Short name of your app',
        description: 'Description of your app',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]    
}