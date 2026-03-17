import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import angular from '@analogjs/vite-plugin-angular';
import { compareWithFigma } from './src/test/vitest.commands';

export default defineConfig({
  plugins: [angular()],
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/compiler',
      '@testing-library/angular',
      'class-variance-authority',
    ],
  },
  test: {
    update: false,
    globals: true,
    css: true,
    include: ['src/stories/button.component.spec.ts'],
    setupFiles: ['./src/test-setup.ts'],
    watch: true,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      commands: { compareWithFigma },
      compareWithFigmaOptions: {
        maxDiffPercentage: 5.0,
      },
      screenshotFailures: false,
      screenshotDirectory: '.vitest-attachments/temp',
    },
    reporters: ['verbose'],
  },
});
