import { expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { ButtonComponent } from './button.component';

// This test uses a screenshot exported from Figma as a golden source of truth; it is not a snapshot of the previous run
it('ButtonComponent-btn-primary', async () => {
  let container: HTMLElement | null = null;

  const fixture = TestBed.createComponent(ButtonComponent);
  fixture.componentRef.setInput('label', 'Button');
  fixture.componentRef.setInput('variant', 'primary');

  // Create a container with padding to capture the box-shadow
  container = document.createElement('div');
  container.setAttribute('data-testid', `screenshot-container-md`);
  container.style.width = '90px';
  container.style.height = '39px';
  container.style.transform = 'translateX(1px)';
  container.appendChild(fixture.nativeElement);

  document.body.appendChild(container);
  fixture.detectChanges();

  const screenshotTarget = page.getByTestId('screenshot-container-md');

  await expect.element(screenshotTarget).toMatchScreenshot('ButtonComponent-btn-primary-1.png');
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
  container.style.width = '109px';
  container.style.height = '49px';
  container.style.transform = 'translate(4px, -2px)';

  container.appendChild(fixture.nativeElement);

  document.body.appendChild(container);
  fixture.detectChanges();

  const screenshotTarget = page.getByTestId('screenshot-container-lg');

  await expect.element(screenshotTarget).toMatchScreenshot('ButtonComponent-btn-primary-lg-1.png');
});
