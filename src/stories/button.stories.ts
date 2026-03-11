import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { ButtonComponent } from './button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Example/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    variant: 'secondary',
    size: 'medium',
    label: 'Button',
    disabled: false,
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzZx5Jpt65qkq1jlau2oFv/POC-Build-from-scratch-in-WebStorm?node-id=324-11174',
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzZx5Jpt65qkq1jlau2oFv/POC-Build-from-scratch-in-WebStorm?node-id=324-11174',
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzZx5Jpt65qkq1jlau2oFv/POC-Build-from-scratch-in-WebStorm?node-id=324-11174',
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzZx5Jpt65qkq1jlau2oFv/POC-Build-from-scratch-in-WebStorm?node-id=324-11174',
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    label: 'Button',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzZx5Jpt65qkq1jlau2oFv/POC-Build-from-scratch-in-WebStorm?node-id=324-11174',
    },
  },
};

export const ColorVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6 p-8 border rounded-md bg-neutral-50">
        <div class="flex gap-4 items-center flex-wrap">
          <storybook-button variant="primary" label="Primary"></storybook-button>
          <storybook-button variant="secondary" label="Secondary"></storybook-button>
          <storybook-button variant="error" label="Error"></storybook-button>
          <storybook-button variant="warning" label="Warning"></storybook-button>
          <storybook-button variant="info" label="Info"></storybook-button>
          <storybook-button variant="success" label="Success"></storybook-button>
        </div>
        <div class="flex gap-4 items-center flex-wrap">
          <storybook-button variant="primary" [disabled]="true" label="Primary Disabled"></storybook-button>
          <storybook-button variant="secondary" [disabled]="true" label="Secondary Disabled"></storybook-button>
          <storybook-button variant="error" [disabled]="true" label="Error Disabled"></storybook-button>
          <storybook-button variant="warning" [disabled]="true" label="Warning Disabled"></storybook-button>
          <storybook-button variant="info" [disabled]="true" label="Info Disabled"></storybook-button>
          <storybook-button variant="success" [disabled]="true" label="Success Disabled"></storybook-button>
        </div>
      </div>
    `,
  }),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VzZx5Jpt65qkq1jlau2oFv/POC-Build-from-scratch-in-WebStorm?node-id=324-11174',
    },
  },
};
