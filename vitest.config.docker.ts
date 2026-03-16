import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import angular from '@analogjs/vite-plugin-angular';
import { compareWithFigma } from './vitest.commands';

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
    watch: false,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({
        contextOptions: {
          deviceScaleFactor: 1.5,
          viewport: { width: 1920, height: 1080 },
        },
      }),
      ui: false,
      instances: [{ browser: 'chromium' }],
      commands: { compareWithFigma },
      screenshotFailures: true,
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0.1,
            allowedMismatchedPixelRatio: 0.03,
            diffColor: [255, 0, 0],
            diffColorAlt: [255, 255, 0],
            diffMask: false,
          },
        },
      },
    },
    reporters: ['verbose', 'html'],
  },
});
