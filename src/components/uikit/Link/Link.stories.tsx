import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'UIkit/Link',
  component: Link,
  argTypes: {
    variant: {
      control: 'select',
      options: ['muted', 'text', 'heading', 'reset', undefined],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Link',
    href: '#',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {}

export const Muted: Story = {
  args: {
    variant: 'muted',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
  },
}

export const InHeading: Story = {
  render: (args) => (
    <h3>
      <Link {...args} />
    </h3>
  ),
  args: {
    variant: 'heading',
  },
}