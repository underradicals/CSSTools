/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import autoprefixer from 'autoprefixer';

const root = resolve(__dirname, "src");

export default defineConfig({
  server: {
    port: 3000,
    host: '127.0.0.1'
  },
  plugins: [],
  resolve: {
    alias: {
      '@': root
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer
      ]
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    }
  }
});