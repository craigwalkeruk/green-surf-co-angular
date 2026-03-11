import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap cursor-pointer rounded-md font-medium leading-none font-[\"Public Sans\"] shadow-sm transition-all duration-200 capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white shadow-[0px_2px_6px_0px_rgba(115,103,240,0.3)] hover:bg-primary-600 hover:shadow-[0px_4px_8px_0px_rgba(115,103,240,0.4)] focus-visible:ring-primary-500 data-[disabled=true]:bg-primary-400 data-[disabled=true]:text-white/70 data-[disabled=true]:shadow-sm data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
        secondary: 'bg-neutral-500 text-white shadow-[0px_2px_6px_0px_rgba(128,131,144,0.3)] hover:bg-neutral-600 hover:shadow-[0px_4px_8px_0px_rgba(128,131,144,0.4)] focus-visible:ring-neutral-500 data-[disabled=true]:bg-neutral-400 data-[disabled=true]:text-white/70 data-[disabled=true]:shadow-sm data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
        success: 'bg-emerald-500 text-white shadow-[0px_2px_6px_0px_rgba(16,185,129,0.3)] hover:bg-emerald-600 hover:shadow-[0px_4px_8px_0px_rgba(16,185,129,0.4)] focus-visible:ring-emerald-500 data-[disabled=true]:bg-emerald-400 data-[disabled=true]:text-white/70 data-[disabled=true]:shadow-sm data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
        warning: 'bg-amber-500 text-white shadow-[0px_2px_6px_0px_rgba(245,158,11,0.3)] hover:bg-amber-600 hover:shadow-[0px_4px_8px_0px_rgba(245,158,11,0.4)] focus-visible:ring-amber-500 data-[disabled=true]:bg-amber-400 data-[disabled=true]:text-white/70 data-[disabled=true]:shadow-sm data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
        error: 'bg-rose-500 text-white shadow-[0px_2px_6px_0px_rgba(255,76,81,0.3)] hover:bg-rose-600 hover:shadow-[0px_4px_8px_0px_rgba(255,76,81,0.4)] focus-visible:ring-rose-500 data-[disabled=true]:bg-rose-400 data-[disabled=true]:text-white/70 data-[disabled=true]:shadow-sm data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
        info: 'bg-cyan-500 text-white shadow-[0px_2px_6px_0px_rgba(0,186,209,0.3)] hover:bg-cyan-600 hover:shadow-[0px_4px_8px_0px_rgba(0,186,209,0.4)] focus-visible:ring-cyan-500 data-[disabled=true]:bg-cyan-400 data-[disabled=true]:text-white/70 data-[disabled=true]:shadow-sm data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60',
      },
      size: {
        small: 'px-4 py-1.5 text-xs h-8',
        medium: 'px-5 py-2 text-[15px] leading-[22px] h-10',
        large: 'px-6 py-3 text-base h-12'
      }
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'medium'
    }
  }
);

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [disabled]="disabled()"
      [attr.data-disabled]="disabled() ? 'true' : null"
      [class]="classes()"
      (click)="onClick.emit()"
    >
      {{ label() }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  // Six color variants per Figma Color Frame Default row: primary, secondary, error, warning, info, success
  variant = input<'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>('secondary');
  size = input<'small' | 'medium' | 'large'>('medium');
  label = input.required<string>();
  disabled = input<boolean>(false);
  onClick = output();
  classes = computed(() => buttonVariants({
    variant: this.variant(),
    size: this.size()
  }));
}
