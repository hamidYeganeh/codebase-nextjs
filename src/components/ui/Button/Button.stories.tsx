import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'light', 'flat', 'faded', 'shadow', 'ghost'],
    },
    color: {
      control: 'select',
      options: ['primary'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    radius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    fullWidth: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    as: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    color: 'primary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    loading: true,
    color: 'primary',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Delete',
    color: 'primary',
    startIcon: <span>🗑️</span>,
  },
};
