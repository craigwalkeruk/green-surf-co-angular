## Vitest Visual Regression Testing (VRT) Skill

### Overview
This skill enables pixel-perfect visual testing of Angular components against Figma designs using Vitest's built-in browser mode and screenshot testing capabilities.

### Prerequisites
- Angular 17+ standalone components
- Vitest (^3.0+) with `@vitest/browser` and a provider (e.g., Playwright)
- Tailwind CSS or specialized component CSS

### Setup Steps

#### 1. Install Dependencies
```bash
npm i -D vitest @vitest/browser @vitest/browser-playwright @analogjs/vite-plugin-angular @testing-library/angular
```

#### 2. Create `src/test-setup.ts`
```typescript
import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import '@testing-library/jest-dom';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: true },
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  });
} catch {
  // Environment already initialized, ignore
}
```

#### 3. Create/Update `vitest.config.ts` (root)
```typescript
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    css: true,
    include: ['src/**/*.spec.ts'],
    setupFiles: ['./src/test-setup.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      screenshotFailures: true,
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0.1,
            allowedMismatchedPixelRatio: 0.025,
          },
        },
      },
    },
  },
});
```

#### 4. Export Figma Reference
- Figma: Select component → Export PNG (1x, exact size)
- Save the reference screenshot in the `__screenshots__` directory relative to the test file.
- Format: `[TestFileName]/[ScreenshotName]-1.png` (e.g., `button.component.spec.ts/ButtonComponent-btn-primary-1.png`)

#### 5. Component Test Example (`src/stories/button.component.spec.ts`)
```typescript
import { expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { ButtonComponent } from './button.component';

it('ButtonComponent-btn-primary', async () => {
  const fixture = TestBed.createComponent(ButtonComponent);
  fixture.componentRef.setInput('label', 'Button');
  fixture.componentRef.setInput('variant', 'primary');
  fixture.componentRef.setInput('size', 'medium');

  // Append to DOM so CSS is applied
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();

  const button = page.getByRole('button');
  await expect.element(button).toMatchScreenshot('ButtonComponent-btn-primary-1');
});
```

#### 6. Run Tests

Run `npx vitest [path/to/spec] --browser` to verify match against Figma baselines.
Use `--update` (or `-u`) to update snapshots if the change is intentional.

### Verification (DoD)
- `npx tsc --noEmit`
- `npx vitest --browser`
- Compare `actual` vs `diff` in `.vitest-attachments` if failures occur.

### Tips for Accuracy
- **Thresholds**: Adjust `threshold` (per-pixel sensitivity) and `allowedMismatchedPixelRatio` (total error allowance) in `vitest.config.ts`.
- **Fonts**: Ensure required fonts (e.g., "Public Sans") are available in the test environment or mocked.
- **Cleanup**: Use `destroyAfterEach: true` in `TestBed` setup to ensure a clean state between tests.
- **Headless**: Vitest browser mode runs in a real browser, ensuring high fidelity compared to `jsdom`.
