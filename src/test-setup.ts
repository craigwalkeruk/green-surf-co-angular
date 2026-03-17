import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import '@testing-library/jest-dom';
import './styles.css';

// Only import browser-specific matcher when in browser mode
if (typeof (globalThis as { __vitest_browser__?: boolean }).__vitest_browser__ !== 'undefined') {
  import('./test/figma-snapshot-matcher');
}

// Initialize TestBed environment for vitest browser mode
// Try-catch to handle case where environment is already initialized (e.g., by ng test)
try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false },
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  });
} catch {
  // Environment already initialized, ignore
}
