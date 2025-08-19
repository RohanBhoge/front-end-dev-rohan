import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import { Mail, Lock } from 'lucide-react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    isInvalid: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: 'Enter your primary email address.',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
    label: 'Username',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    placeholder: 'Search...',
  },
};

export const Invalid: Story = {
  args: {
    ...Default.args,
    label: 'Email',
    value: 'invalid-email',
    isInvalid: true,
    errorMessage: 'Please enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Full Name',
    value: 'John Doe',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'API Key',
    value: 'Loading data...',
    isLoading: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    value: '12345678',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Search',
    value: 'Some text that can be cleared',
    showClearButton: true,
    onClear: () => alert('Cleared!'), // In a real app, this would update state
  },
};