import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        apropos: resolve(__dirname, 'a-propos.html'),
        besoin: resolve(__dirname, 'prise-de-besoin.html'),
        contact: resolve(__dirname, 'contact.html'),
        auth: resolve(__dirname, 'auth.html'),
        user_dashboard: resolve(__dirname, 'dashboard.html'),
        admin_login: resolve(__dirname, 'admin/index.html'),
        admin_dashboard: resolve(__dirname, 'admin/dashboard.html'),
        admin_clients: resolve(__dirname, 'admin/clients.html'),
        admin_client_detail: resolve(__dirname, 'admin/client-detail.html'),
        admin_stock: resolve(__dirname, 'admin/stock.html'),
        admin_besoins: resolve(__dirname, 'admin/besoins.html'),
        admin_rappels: resolve(__dirname, 'admin/rappels.html'),
        admin_ventes: resolve(__dirname, 'admin/ventes.html'),
      },
    },
  },
})
