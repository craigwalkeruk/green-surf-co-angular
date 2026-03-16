import { promises as fs } from 'node:fs';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import type { BrowserCommand } from 'vitest/node';

export interface CompareWithFigmaOptions {
  threshold?: number;
  maxDiffPercentage?: number;
  sizeTolerance?: number; // Allow small size differences (default: 2px)
}

export interface CompareWithFigmaResult {
  matches: boolean;
  diffPercentage: number;
  sizeMismatch: boolean;
  message: string;
}

/**
 * Server-side command to compare a screenshot with a reference image.
 * - Never creates/updates baseline files - fails if reference is missing
 * - Handles size mismatches by padding and still generating diff
 * - Always logs diff percentage and generates diff image
 * - Outputs diffs to .vitest-attachment directory
 */
export const compareWithFigma: BrowserCommand<[
  testId: string,
  imageName: string,
  testPath: string,
  options?: CompareWithFigmaOptions
]> = async (context, testId, imageName, testPath, options = {}) => {
  // Get the playwright locator and take a screenshot
  const locator = context.iframe.locator(`[data-testid="${testId}"]`);
  const screenshotBuffer = await locator.screenshot();

  // Resolve testPath relative to project root (process.cwd())
  const absoluteTestPath = path.isAbsolute(testPath) ? testPath : path.join(process.cwd(), testPath);
  const testDir = path.dirname(absoluteTestPath);
  const specName = path.basename(absoluteTestPath);
  const {
    threshold = 0.1,
    maxDiffPercentage = 1.0,
    sizeTolerance = 2,
  } = options;

  // Reference image path: __screenshots__/{spec-name}/{imageName}
  const screenshotsDir = path.join(testDir, '__screenshots__', specName);
  const baselinePath = path.join(screenshotsDir, imageName);

  // Diff output path: .vitest-attachments/{spec-name}/ (at project root)
  const attachmentDir = path.join(process.cwd(), '.vitest-attachments', specName);
  const baseName = imageName.replace(/\.png$/, '');
  const diffPath = path.join(attachmentDir, `${baseName}-diff.png`);
  const actualPath = path.join(attachmentDir, `${baseName}-actual.png`);
  const referencePath = path.join(attachmentDir, `${baseName}-reference.png`);

  // Ensure attachment directory exists
  await fs.mkdir(attachmentDir, { recursive: true });

  // Save the actual screenshot for inspection
  await fs.writeFile(actualPath, screenshotBuffer);

  // Check if baseline exists - never create it, just fail
  try {
    await fs.access(baselinePath);
  } catch (err) {
    const message = `MISSING REFERENCE IMAGE: ${baselinePath}`;
    console.error(`[compareWithFigma] ${message}`);
    console.error(`[compareWithFigma] Error details:`, err);
    console.error(`[compareWithFigma] testPath: ${testPath}, testDir: ${testDir}, specName: ${specName}`);
    return {
      matches: false,
      diffPercentage: 100,
      sizeMismatch: false,
      message,
    };
  }

  // Read baseline image and copy to attachments
  const baselineData = await fs.readFile(baselinePath);
  await fs.writeFile(referencePath, baselineData);

  const baseline = PNG.sync.read(baselineData);
  const screenshot = PNG.sync.read(screenshotBuffer);

  let sizeMismatch = false;
  let width = baseline.width;
  let height = baseline.height;

  // Handle size differences - only flag as mismatch if beyond tolerance
  const widthDiff = Math.abs(baseline.width - screenshot.width);
  const heightDiff = Math.abs(baseline.height - screenshot.height);
  const withinTolerance = widthDiff <= sizeTolerance && heightDiff <= sizeTolerance;

  if (baseline.width !== screenshot.width || baseline.height !== screenshot.height) {
    if (!withinTolerance) {
      sizeMismatch = true;
    }
    console.warn(
      `[compareWithFigma] SIZE DIFF: baseline=${baseline.width}x${baseline.height}, ` +
      `screenshot=${screenshot.width}x${screenshot.height} ` +
      `(${withinTolerance ? 'within tolerance' : 'MISMATCH'})`
    );

    // Use the larger dimensions
    width = Math.max(baseline.width, screenshot.width);
    height = Math.max(baseline.height, screenshot.height);

    // Create padded versions of both images
    const paddedBaseline = new PNG({ width, height });
    const paddedScreenshot = new PNG({ width, height });

    // Fill with white background
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        paddedBaseline.data[idx] = 255;
        paddedBaseline.data[idx + 1] = 255;
        paddedBaseline.data[idx + 2] = 255;
        paddedBaseline.data[idx + 3] = 255;
        paddedScreenshot.data[idx] = 255;
        paddedScreenshot.data[idx + 1] = 255;
        paddedScreenshot.data[idx + 2] = 255;
        paddedScreenshot.data[idx + 3] = 255;
      }
    }

    // Copy original images into padded versions
    PNG.bitblt(baseline, paddedBaseline, 0, 0, baseline.width, baseline.height, 0, 0);
    PNG.bitblt(screenshot, paddedScreenshot, 0, 0, screenshot.width, screenshot.height, 0, 0);

    // Replace with padded versions for comparison
    baseline.data = paddedBaseline.data;
    baseline.width = width;
    baseline.height = height;
    screenshot.data = paddedScreenshot.data;
    screenshot.width = width;
    screenshot.height = height;
  }

  // Create diff image
  const diff = new PNG({ width, height });

  // Compare images
  const numDiffPixels = pixelmatch(
    baseline.data,
    screenshot.data,
    diff.data,
    width,
    height,
    { threshold }
  );

  // Always save diff image (even on pass)
  await fs.writeFile(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffPercentage = (numDiffPixels / totalPixels) * 100;
  const matches = !sizeMismatch && diffPercentage <= maxDiffPercentage;

  // Always log diff percentage
  console.log(
    `[compareWithFigma] ${imageName}: ${diffPercentage.toFixed(2)}% diff ` +
    `(${matches ? 'PASS' : 'FAIL'}, threshold: ${maxDiffPercentage}%)` +
    (sizeMismatch ? ' [SIZE MISMATCH]' : '')
  );
  console.log(`[compareWithFigma] Diff saved to: ${diffPath}`);

  const message = sizeMismatch
    ? `Size mismatch and ${diffPercentage.toFixed(2)}% pixel difference. See diff: ${diffPath}`
    : matches
      ? `Image matches reference (diff: ${diffPercentage.toFixed(2)}%). See diff: ${diffPath}`
      : `Image differs by ${diffPercentage.toFixed(2)}% (threshold: ${maxDiffPercentage}%). See diff: ${diffPath}`;

  return {
    matches,
    diffPercentage,
    sizeMismatch,
    message,
  } as CompareWithFigmaResult;
};
