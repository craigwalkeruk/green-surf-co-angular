import { expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { page, commands } from 'vitest/browser';
import { ButtonComponent } from './button.component';

// Type for custom command result
interface CompareWithFigmaResult {
  matches: boolean;
  diffPercentage: number;
  sizeMismatch: boolean;
  message: string;
}

// This test uses a screenshot exported from Figma as a golden source of truth; it is not a snapshot of the previous run
it('ButtonComponent-btn-primary', async () => {
  let container: HTMLElement | null = null;

  const fixture = TestBed.createComponent(ButtonComponent);
  fixture.componentRef.setInput('label', 'Button');
  fixture.componentRef.setInput('variant', 'primary');

  // Create a container with padding to capture the box-shadow
  container = document.createElement('div');
  container.setAttribute('data-testid', `screenshot-container-md`);
  // Figma 1x export size 88 x 38
  container.style.width = '88px';
  container.style.height = '38px';

  container.appendChild(fixture.nativeElement);
  document.body.appendChild(container);

  fixture.detectChanges();

  const button = fixture.nativeElement.querySelector('button');

  const screenshotTarget = page.getByTestId('screenshot-container-md');

  // Take screenshot of the exact element and compare with Figma reference
  const screenshot = await screenshotTarget.screenshot({ base64: true });

  const result = await commands.compareWithFigma(
    screenshot.base64, { imageName: 'ButtonComponent-btn-primary.png' }
  ) as CompareWithFigmaResult;

  if (!result.matches) {
    const rect = container.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    console.log('Body Rect:', bodyRect.width, bodyRect.height);
    console.log(screenshotTarget);
    console.log('container height:', rect.height);
    console.log('container width:', rect.width);
    console.log('button height:', button.getBoundingClientRect().height);
    console.log('button width:', button.getBoundingClientRect().width);

    expect.fail(result.message);
  }
});

it('ButtonComponent-btn-primary-lg', async () => {
  let container: HTMLElement | null = null;

  const fixture = TestBed.createComponent(ButtonComponent);
  fixture.componentRef.setInput('label', 'Button');
  fixture.componentRef.setInput('variant', 'primary');
  fixture.componentRef.setInput('size', 'large');

  // Create a container with padding to capture the box-shadow
  container = document.createElement('div');
  container.setAttribute('data-testid', 'screenshot-container-lg');

  container.style.width = '106px';
  container.style.height = '48px';

  container.appendChild(fixture.nativeElement);

  document.body.appendChild(container);

  const buttonLarge = fixture.nativeElement.querySelector('button');

  fixture.detectChanges();

  const screenshotTargetLarge = page.getByTestId('screenshot-container-lg');

  // Take screenshot of the exact element and compare with Figma reference
  const screenshotLg = await screenshotTargetLarge.screenshot({ base64: true });
  const resultLg = await commands.compareWithFigma(
    screenshotLg.base64,
    { imageName: 'ButtonComponent-btn-primary-lg.png' }
  ) as CompareWithFigmaResult;
  if (!resultLg.matches) {
    console.log(screenshotTargetLarge);
    const rectLarge = container.getBoundingClientRect();
    console.log('container height:', rectLarge.height);
    console.log('container width:', rectLarge.width);

    console.log('button height:', buttonLarge.getBoundingClientRect().height);
    console.log('button width:', buttonLarge.getBoundingClientRect().width);

    expect.fail(resultLg.message);
  }
});
