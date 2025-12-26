import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'UIkit/Spinner',
  component: Spinner,
  argTypes: {
    ratio: {
      control: { type: 'number', min: 1, step: 0.5 },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Large: Story = {
  args: {
    ratio: 3,
  },
}

export const ExtraLarge: Story = {
  args: {
    ratio: 4.5,
  },
}