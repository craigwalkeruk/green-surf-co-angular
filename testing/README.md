# Visual Regression Testing

This project uses Vitest Browser Mode with a custom `compareWithFigma` command for visual regression testing.

## Configuration

### `compareWithFigma` Command

The `compareWithFigma` command compares screenshots against reference images stored in `__screenshots__` directories.

#### Config Options

Add `compareWithFigmaOptions` to your Vitest browser config:

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    browser: {
      compareWithFigmaOptions: {
        threshold: 0.1,           // Pixelmatch threshold (0-1), default: 0.1
        maxDiffPercentage: 5.0,   // Max allowed diff %, default: 1.0
        sizeTolerance: 2,         // Allowed size diff in pixels, default: 2
      },
    },
  },
});
```

#### Per-Test Options

You can override config options per-test:

```typescript
const result = await commands.compareWithFigma(screenshot.base64, {
  imageName: 'my-component.png',
  maxDiffPercentage: 10.0,  // Override for this test only
});
```

#### Option Precedence

1. Per-call options (highest priority)
2. `compareWithFigmaOptions` from vitest config
3. Built-in defaults (lowest priority)

### Reference Images

- Location: `src/**/__screenshots__/{spec-filename}/{image-name}.png`
- The command never auto-creates baselines - it fails if reference is missing
- Diff images are saved to `.vitest-attachments/`

## Future Enhancements

Consider converting `compareWithFigma` to a custom Vitest matcher (`expect.extend`) for better integration with Vitest's assertion system. This would enable:

- Better error messages in test output
- Integration with Vitest's snapshot update workflow (`--update`)
- Cleaner test syntax: `await expect(screenshot).toMatchFigmaSnapshot()`
