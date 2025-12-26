import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'UIkit/Divider',
  component: Divider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Divider>

export const Basic: Story = {
  render: () => (
    <div>
      <p>Content above</p>
      <Divider />
      <p>Content below</p>
    </div>
  ),
}

export const Icon: Story = {
  args: {
    variant: 'icon',
  },
}

export const Small: Story = {
  args: {
    variant: 'small',
  },
}

export const Vertical: Story = {
  args: {
    variant: 'vertical',
  },
  render: (args) => (
    <div className="uk-flex uk-flex-middle">
      <span>Left</span>
      <Divider {...args} className="uk-margin-small-left uk-margin-small-right" />
      <span>Right</span>
    </div>
  ),
}
