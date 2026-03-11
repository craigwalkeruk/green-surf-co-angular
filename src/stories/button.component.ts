import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [class]="classes()"
      (click)="onClick.emit()"
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
  onClick = output();
  classes = computed(() => {
    const cls: string[] = [
      'inline-block cursor-pointer border-0 rounded-md font-medium leading-none font-[\"Public Sans\"] shadow-sm transition-colors capitalize'
    ];
    if (this.primary()) {
      cls.push('bg-primary-500', 'text-white', 'shadow-[0px_2px_6px_0px_rgba(115,103,240,0.3)]');
    } else {
      cls.push('bg-transparent', 'text-gray-900', 'ring-1', 'ring-inset', 'ring-black/15', 'shadow-none');
    }
    const sz = this.size();
    if (sz === 'small') {
      cls.push('px-4', 'py-[11px]', 'text-xs');
    } else if (sz === 'medium') {
      cls.push('px-5', 'py-2', 'text-[15px]', 'leading-[22px]');
    } else if (sz === 'large') {
      cls.push('px-6', 'py-3', 'text-base');
    }
    return cls.join(' ');
  });
}
