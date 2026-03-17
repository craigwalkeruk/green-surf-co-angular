# Visual Regression Testing with Figma

This folder contains utilities for comparing rendered Angular components against Figma design exports.

## Overview

Unlike traditional snapshot testing that compares against previous test runs, this system compares against **Figma-exported images** as the source of truth. This ensures components match the original design specifications.

## Key Behaviors

- **Never auto-creates baselines** - Tests fail if reference images are missing
- **Never auto-updates baselines** - Reference images must be manually exported from Figma
- **Always generates diffs** - Even on pass, for debugging and inspection

## Files

| File | Purpose |
|------|---------|
| `vitest.commands.ts` | Server-side Vitest browser command for image comparison |
| `figma-snapshot-matcher.ts` | Custom Vitest matcher (`toMatchFigmaSnapshot`) |

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
    └── figma-snapshot-matcher.ts

.vitest-attachments/           # Generated diffs (gitignored)
└── button.component.spec.ts/
    ├── ButtonComponent-btn-primary-actual.png
    ├── ButtonComponent-btn-primary-reference.png
    └── ButtonComponent-btn-primary-diff.png
```

## Usage

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

## Debugging Failures

When a test fails:

1. Check `.vitest-attachments/{spec-file}/` for:
   - `*-actual.png` - What the test rendered
   - `*-reference.png` - The Figma export
   - `*-diff.png` - Highlighted differences

2. Common issues:
   - **Size mismatch**: Retina displays capture at 2x. Ensure container dimensions match Figma frame size.
   - **Font differences**: Ensure fonts are loaded before screenshot.
   - **Timing issues**: Add `await fixture.whenStable()` if needed.

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
│  - Writes diff to .vitest-attachments/                      │
└─────────────────────────────────────────────────────────────┘
```
