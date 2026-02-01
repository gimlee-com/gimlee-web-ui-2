import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    size: 200,
    style: { color: '#009ae3' }
  },
};

export const CustomColor: Story = {
  args: {
    size: 200,
    style: { color: '#800020' }
  },
};

export const Large: Story = {
  args: {
    size: 512,
  },
};
