import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'UIkit/Heading',
  component: Heading,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Heading>

export const Sizes: Story = {
  render: () => (
    <div>
      <Heading size="small">Small Heading</Heading>
      <Heading size="medium">Medium Heading</Heading>
      <Heading size="large">Large Heading</Heading>
      <Heading size="xlarge">X-Large Heading</Heading>
      <Heading size="2xlarge">2X-Large Heading</Heading>
      <Heading size="3xlarge">3X-Large Heading</Heading>
    </div>
  ),
}

export const Divider: Story = {
  args: {
    divider: true,
    children: 'Heading Divider',
  },
}

export const Bullet: Story = {
  args: {
    bullet: true,
    children: 'Heading Bullet',
  },
}

export const Line: Story = {
  args: {
    line: true,
    children: 'Heading Line',
  },
}

export const Combined: Story = {
  render: () => (
    <div>
      <Heading size="medium" divider>
        Medium Divider
      </Heading>
      <Heading size="small" bullet className="uk-text-center">
        Small Bullet Centered
      </Heading>
      <Heading size="large" line className="uk-text-right">
        Large Line Right
      </Heading>
    </div>
  ),
}
