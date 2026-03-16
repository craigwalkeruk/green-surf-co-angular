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

function resetContainerStyles(container: HTMLElement) {
  container.style.display = 'block';
  container.style.overflow = 'hidden';
  container.style.lineHeight = '0';
  container.style.fontSize = '0';
  container.style.boxSizing = 'content-box';
  container.style.padding = '0';
  container.style.margin = '0';
  container.style.border = 'none';
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

  resetContainerStyles(container);

  container.appendChild(fixture.nativeElement);
  document.body.appendChild(container);

  const button = fixture.nativeElement.querySelector('button');

  button.style.boxShadow = 'none';
  button.style.margin = '0';
  button.style.position = 'absolute';
  button.style.top = '0';
  button.style.left = '0';
  button.style.border = 'none';
  button.style.outline = 'none';

  fixture.detectChanges();

  const screenshotTarget = page.getByTestId('screenshot-container-md');

  // Take screenshot and compare with Figma reference
  const result = await commands.compareWithFigma(
    'screenshot-container-md',
    'ButtonComponent-btn-primary-1-chromium-linux.png',
    'src/stories/button.component.spec.ts'
  ) as CompareWithFigmaResult;
  if (!result.matches) {
    expect.fail(result.message);
  }

  const rect = container.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();
  console.log('Body Rect:', bodyRect.width, bodyRect.height);
  console.log(screenshotTarget);
  console.log('container height:', rect.height);
  console.log('container width:', rect.width);
  console.log('button height:', button.getBoundingClientRect().height);
  console.log('button width:', button.getBoundingClientRect().width);

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

  resetContainerStyles(container);

  container.appendChild(fixture.nativeElement);

  document.body.appendChild(container);

  const buttonLarge = fixture.nativeElement.querySelector('button');
  buttonLarge.style.boxShadow = 'none';
  buttonLarge.style.margin = '0';
  buttonLarge.style.position = 'absolute';
  buttonLarge.style.top = '0';
  buttonLarge.style.left = '0';
  buttonLarge.style.border = 'none';
  buttonLarge.style.outline = 'none';

  fixture.detectChanges();

  const screenshotTargetLarge = page.getByTestId('screenshot-container-lg');

  // Take screenshot and compare with Figma reference
  const resultLg = await commands.compareWithFigma(
    'screenshot-container-lg',
    'ButtonComponent-btn-primary-lg-1-chromium-linux.png',
    'src/stories/button.component.spec.ts'
  ) as CompareWithFigmaResult;
  if (!resultLg.matches) {
    expect.fail(resultLg.message);
  }

  console.log(screenshotTargetLarge);
  const rectLarge = container.getBoundingClientRect();
  console.log('container height:', rectLarge.height);
  console.log('container width:', rectLarge.width);

  console.log('button height:', buttonLarge.getBoundingClientRect().height);
  console.log('button width:', buttonLarge.getBoundingClientRect().width);
});
