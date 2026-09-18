import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    globalSetup: ['./tests/setup.ts'],
    testTimeout: 60000, // Testcontainers cần thời gian để boot Docker
    hookTimeout: 60000,
  },
});
