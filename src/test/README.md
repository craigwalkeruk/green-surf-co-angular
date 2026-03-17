# Visual Regression Testing with Figma

This folder contains utilities for comparing rendered Angular components against Figma design exports.

## Overview

Unlike traditional snapshot testing that compares against previous test runs, this system compares against **Figma-exported images** as the source of truth. This ensures components match the original design specifications.

## Key Behaviors

- **Never auto-creates baselines** - Tests fail if reference images are missing
- **Never auto-updates baselines** - Reference images must be manually exported from Figma
- **Always generates diffs** - Even on pass, for debugging and inspection
- **Auto-generates HTML report** - After every test run (including watch mode)

## Files

| File | Purpose |
|------|---------|
| `vitest.commands.ts` | Server-side Vitest browser command for image comparison |
| `figma-snapshot-matcher.ts` | Custom Vitest matcher (`toMatchFigmaSnapshot`) |
| `generate-vrt-report.ts` | Vitest reporter + standalone script for HTML report generation |

## Directory Structure

```
src/
├── stories/
│   ├── button.component.ts
│   ├── button.component.spec.ts
│   └── __screenshots__/
│       └── button.component.spec.ts/
│           ├── ButtonComponent-btn-primary.png    # Figma export (1x)
│           └── ButtonComponent-btn-primary-lg.png
└── test/
    ├── README.md
    ├── vitest.commands.ts
    ├── figma-snapshot-matcher.ts
    └── generate-vrt-report.ts

.vitest-attachments/           # Generated output (gitignored)
├── button.component.spec.ts/
│   ├── ButtonComponent-btn-primary-actual.png
│   ├── ButtonComponent-btn-primary-reference.png
│   └── ButtonComponent-btn-primary-diff.png
└── vrt-report.html           # Auto-generated HTML report
```

## Usage

### Running Tests

```bash
# Run tests once (report auto-generated)
npm run test-vrt

# Run tests in watch mode (report updates on each run)
npm run test-vrt:watch

# Run tests with Vitest UI
npm run test-vrt:ui

# Run tests in Docker (for CI consistency)
npm run test-vrt-docker
```

The HTML report is **automatically generated** after every test run at `.vitest-attachments/vrt-report.html`.

### In Test Files

```ts
import { expect, it } from 'vitest';
import { page } from 'vitest/browser';

it('matches Figma design', async () => {
  // ... render your component ...

  const element = page.getByTestId('my-component');

  await expect(element).toMatchFigmaSnapshot({
    imageName: 'MyComponent-variant.png',
  });
});
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `imageName` | `string` | Test name + `.png` | Name of the reference image file |
| `threshold` | `number` | `0.1` | Pixelmatch threshold (0-1, lower = stricter) |
| `maxDiffPercentage` | `number` | `5.0` | Maximum allowed pixel difference percentage |
| `sizeTolerance` | `number` | `2` | Allowed size difference in pixels |

### Global Configuration

In `vitest.config.ts`:

```ts
export default defineConfig({
  test: {
    browser: {
      commands: { compareWithFigma },
      compareWithFigmaOptions: {
        maxDiffPercentage: 5.0,  // Global default
      },
    },
  },
});
```

## Adding New Reference Images

1. Export the component frame from Figma at **1x scale**
2. Save to `__screenshots__/{spec-file-name}/{imageName}.png`
3. Run tests to verify

## Viewing Test Results

### HTML Report (Auto-generated)

After tests run, open the report:

```bash
open .vitest-attachments/vrt-report.html
```

The report provides:
- **Side-by-side view** of Figma reference vs actual screenshot
- **Slider comparison** to overlay images
- **Diff highlighting** showing exact pixel differences

### Manual Inspection

Check `.vitest-attachments/{spec-file}/` for:
- `*-actual.png` - What the test rendered
- `*-reference.png` - The Figma export
- `*-diff.png` - Highlighted differences

### Common Issues

- **Size mismatch**: Retina displays capture at 2x. Ensure container dimensions match Figma frame size.
- **Font differences**: Ensure fonts are loaded before screenshot.
- **Timing issues**: Add `await fixture.whenStable()` if needed.

## CI/CD Integration

### GitHub Actions

The VRT tests can be integrated into your CI pipeline:

```yaml
- name: Run VRT Tests
  run: npm run test-vrt

- name: Upload VRT Report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: vrt-report
    path: .vitest-attachments/
    retention-days: 30
```

The report is generated regardless of test pass/fail, so reviewers can always inspect the visual differences.

### Docker

For consistent results across environments:

```bash
npm run test-vrt-docker
```

This uses a Docker container with a fixed viewport and device scale factor.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Test File                            │
│  await expect(element).toMatchFigmaSnapshot({...})          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              figma-snapshot-matcher.ts                       │
│  - Takes screenshot via locator.screenshot()                │
│  - Calls commands.compareWithFigma()                        │
│  - Returns pass/fail result                                 │
└─────────────────────────┬───────────────────────────────────┘
                          │ (Browser → Server)
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                 vitest.commands.ts                          │
│  - Runs on Node.js (server-side)                            │
│  - Reads reference image from __screenshots__/              │
│  - Compares using pixelmatch                                │
│  - Writes to .vitest-attachments/ for report                │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│         generate-vrt-report.ts (Vitest Reporter)            │
│  - Auto-runs after each test run                            │
│  - Reads images from .vitest-attachments/                   │
│  - Generates interactive HTML report                        │
│  - Embeds images as base64 for portability                  │
└─────────────────────────────────────────────────────────────┘
```

## Git Ignore

The following should be in `.gitignore`:

```sh
.vitest-attachments/
```
