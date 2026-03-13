import { expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { page } from 'vitest/browser';
import { ButtonComponent } from './button.component';


// This test uses a screenshot exported from Figma as a golden source of truth, it is not a snapshot of the previous run
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

