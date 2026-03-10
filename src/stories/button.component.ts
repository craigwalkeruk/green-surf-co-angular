import { ChangeDetectionStrategy, Component, EventEmitter, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="inline-block cursor-pointer border-0 rounded-full font-bold leading-none font-inter shadow-sm transition-colors"
      [class.bg-primary-500 text-white]="primary()"
      [class.bg-transparent text-gray-900 ring-1 ring-inset ring-black/15 shadow-none]="!primary()"
      [class.px-4 py-[11px] text-xs]="size() === 'small'"
      [class.px-5 py-[11px] text-sm]="size() === 'medium'"
      [class.px-6 py-3 text-base]="size() === 'large'"
      (click)="onClick.emit($event)"
    >
      {{ label() }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  primary = input<boolean>(false);
  size = input<'small' | 'medium' | 'large'>('medium');
  label = input.required<string>();
  onClick = output<Event>();
}
