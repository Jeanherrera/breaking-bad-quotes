import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/test/',
        'eslint.config.js',
        'vite.config.js',
        'dist/*',
      ],
    },
  },
  server: {
    middleware: [
      (req, res, next) => {
        if (req.url === '/health') {
          res.statusCode = 200;
          res.end();
          return;
        }
        next();
      },
    ],
  },
});
