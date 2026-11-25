import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function ssgPreviewRoutesPlugin(): Plugin {
  return {
    name: 'aera-ssg-preview-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const rawUrl = req.url || '/';
        const [pathname, search] = rawUrl.split('?');
        const cleanPath = (pathname || '/').replace(/\/+$/, '') || '/';
        if (cleanPath !== '/' && !path.extname(cleanPath)) {
          const candidate = path.resolve('dist', cleanPath.slice(1), 'index.html');
          if (fs.existsSync(candidate)) {
            req.url = `${cleanPath}/index.html${search ? `?${search}` : ''}`;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), ssgPreviewRoutesPlugin()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) {
            return 'vendor-motion';
          }
          return undefined;
        },
      },
    },
  },
});
