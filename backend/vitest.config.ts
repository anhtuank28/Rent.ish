import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    // Tránh test nhầm các file build cũ
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
