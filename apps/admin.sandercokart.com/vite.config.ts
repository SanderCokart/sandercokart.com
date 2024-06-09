import path from 'path';

import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    Unfonts({
      custom: {
        preload: true,
        families: [
          {
            transform(font) {
              switch (font.basename) {
                case 'Geist-Light':
                  font.weight = 300;
                case 'Geist-Regular':
                  font.weight = 400;
                case 'Geist-Semibold':
                  font.weight = 600;
                case 'Geist-Bold':
                  font.weight = 700;
              }
              return font;
            },
            name: 'Geist',
            src: './src/assets/fonts/Geist/*.woff2',
          },
          {
            transform(font) {
              switch (font.basename) {
                case 'GeistMono-Light':
                  font.weight = 300;
                case 'GeistMono-Regular':
                  font.weight = 400;
                case 'GeistMono-Semibold':
                  font.weight = 600;
                case 'GeistMono-Bold':
                  font.weight = 700;
              }
              return font;
            },
            name: 'GeistMono',
            src: './src/assets/fonts/GeistMono/*.woff2',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
