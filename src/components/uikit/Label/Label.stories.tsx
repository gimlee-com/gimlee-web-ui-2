import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'UIkit/Label',
  component: Label,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Label',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}