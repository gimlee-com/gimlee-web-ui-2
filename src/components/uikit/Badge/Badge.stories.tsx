import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UIkit/Badge',
  component: Badge,
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    children: '1',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const WithMoreDigits: Story = {
  args: {
    children: '100',
  },
}