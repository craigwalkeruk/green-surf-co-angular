import { expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { ButtonComponent } from './button.component';

// wait for fonts to load
await document.fonts.ready

const isMacRetina = navigator.platform.toLowerCase().includes('mac');
document.body.style.transformOrigin = 'top left';
document.body.style.transform = isMacRetina ? `scale(2.6)` : `scale(${window.devicePixelRatio})`;

// This test uses a screenshot exported from Figma as a golden source of truth; it is not a snapshot of the previous run
it('ButtonComponent-btn-primary', async () => {
  const fixture = TestBed.createComponent(ButtonComponent);
  fixture.componentRef.setInput('label', 'Button');
  fixture.componentRef.setInput('variant', 'primary');

  // Create a container with padding to capture the box-shadow
  const container = document.createElement('div');
  container.setAttribute('data-testid', 'screenshot-container-md');

  container.style.width = '88px';

  container.appendChild(fixture.nativeElement);
  document.body.appendChild(container);


  fixture.detectChanges();

  const screenshotTarget = page.getByTestId('screenshot-container-md');

  // Compare with Figma reference using the custom matcher
  await expect(screenshotTarget).toMatchFigmaSnapshot({
    imageName: 'ButtonComponent-btn-primary.png',
  });
});

it('ButtonComponent-btn-primary-lg', async () => {
  const fixture = TestBed.createComponent(ButtonComponent);
  fixture.componentRef.setInput('label', 'Button');
  fixture.componentRef.setInput('variant', 'primary');
  fixture.componentRef.setInput('size', 'large');

  // Create a container with padding to capture the box-shadow
  const container = document.createElement('div');
  container.setAttribute('data-testid', 'screenshot-container-lg');
  container.style.width = '106px';

  container.appendChild(fixture.nativeElement);
  document.body.appendChild(container);

  fixture.detectChanges();

  const screenshotTargetLarge = page.getByTestId('screenshot-container-lg');

  // Compare with Figma reference using the custom matcher
  await expect(screenshotTargetLarge).toMatchFigmaSnapshot({
    imageName: 'ButtonComponent-btn-primary-lg.png',
  });
});
