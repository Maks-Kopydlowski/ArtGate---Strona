import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function inlineCssPlugin() {
  return {
    name: 'inline-css',
    apply: 'build' as const,
    enforce: 'post' as const,
    transformIndexHtml(html: string, ctx: any) {
      if (!ctx.bundle) return html;
      let newHtml = html;
      const fontPreloads: string[] = [];

      for (const [fileName, file] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && file.type === 'asset' && typeof file.source === 'string') {
          const woff2Matches = file.source.match(/url\(([^)]+\.woff2)\)/g);
          if (woff2Matches) {
            woff2Matches.forEach(m => {
              const fontUrl = m.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
              if (fontUrl.includes('Inter-normal')) {
                fontPreloads.push(`<link rel="preload" href="${fontUrl}" as="font" type="font/woff2" crossorigin />`);
              }
            });
          }

          const re = new RegExp(`<link[^>]*href="[^"]*${fileName}"[^>]*>`, 'g');
          newHtml = newHtml.replace(re, `<style>${file.source}</style>`);
        }
      }

      if (fontPreloads.length > 0) {
        const uniquePreloads = Array.from(new Set(fontPreloads)).join('\n    ');
        newHtml = newHtml.replace('<!-- Preconnect & Preload -->', `<!-- Preconnect & Preload -->\n    ${uniquePreloads}`);
      }

      return newHtml;
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), inlineCssPlugin()],
    define: {},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-icons': ['lucide-react'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
