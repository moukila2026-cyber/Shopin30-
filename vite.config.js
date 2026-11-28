import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        // Découpage du bundle : la librairie d'icônes, React et le QR code
        // ne sont rechargés que lorsqu'ils changent (cache navigateur longue durée).
        manualChunks(id) {
          // Le catalogue (286 fiches) change à chaque arrivage : chunk séparé
          // pour que le code applicatif reste en cache navigateur.
          if (id.includes('/shared/catalog.js')) return 'catalog-data';
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('qrcode')) return 'qrcode';
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
            return 'react-vendor';
          }
          return 'vendor';
        },
      },
      // Deux applications web totalement distinctes :
      // 1) index.html -> Boutique publique client
      // 2) admin.html -> Console Seller Central / Administration isolée
      input: {
        storefront: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin.html'),
      },
    },
  },
});
