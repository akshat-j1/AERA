import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { getRoutePath } from './src/lib/routePaths';

function ssgPreviewRoutesPlugin(): Plugin {
  return {
    name: 'aera-ssg-preview-routes',
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'HEAD') return next();
        const url = new URL(request.url ?? '/', 'http://127.0.0.1');
        const route = getRoutePath(url.pathname);
        if (route !== '/404') {
          const index = route === '/' ? '/index.html' : `${route}/index.html`;
          request.url = index + url.search;
          return next();
        }

        const extension = path.extname(url.pathname);
        const custom404 = path.join(dist, '404.html');
        const requestedFile = path.resolve(dist, '.' + url.pathname);
        const isDocument = !extension || extension === '.html';
        const exists = requestedFile.startsWith(dist + path.sep) && fs.existsSync(requestedFile);
        if (!isDocument || (exists && url.pathname !== '/404.html') || !fs.existsSync(custom404)) {
          return next();
        }

        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        if (request.method === 'HEAD') return void response.end();
        fs.createReadStream(custom404).pipe(response);
      });
    },
  };
}

const localReelDir = path.resolve('public/media/local-reels');
const localReelFiles = process.env.AERA_ENABLE_LOCAL_REELS === '1' && fs.existsSync(localReelDir)
  ? fs.readdirSync(localReelDir).filter((filename) => /\.(mp4|jpg)$/.test(filename))
  : [];

const { headers: [{ headers: documentHeaders }] } = JSON.parse(fs.readFileSync('vercel.json', 'utf8')) as {
  headers: Array<{ headers: Array<{ key: string; value: string }> }>;
};

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? 'mpa' : 'spa',
  preview: {
    headers: Object.fromEntries(documentHeaders.map(({ key, value }) => [key, value])),
  },
  define: { __AERA_LOCAL_REEL_FILES__: JSON.stringify(localReelFiles) },
  plugins: [react(), tailwindcss(), ssgPreviewRoutesPlugin()],
  build: {
    manifest: true,
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
}));
