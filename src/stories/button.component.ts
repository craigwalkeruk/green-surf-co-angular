import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'gsc-button',
  standalone: true,
  imports: [],
  template: `
    <button type="button" [disabled]="disabled()" [class]="classes()" (click)="onClick.emit()">
      {{ label() }}
    </button>
  `,
  styleUrls: ['./button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // Six color variants per Figma Color Frame Default row: primary, secondary, error, warning, info, success
  variant = input<'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>('primary');
  size = input<'small' | 'medium' | 'large'>('medium');
  label = input.required<string>();
  disabled = input<boolean>(false);
  onClick = output();

  classes = computed(() => {
    return {
      'gsc-button': true,
      [`gsc-button--${this.variant()}`]: true,
      [`gsc-button--${this.size()}`]: true,
    };
  });
}
