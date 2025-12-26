import type { Meta, StoryObj } from '@storybook/react'
import { Marker } from './Marker'

const meta: Meta<typeof Marker> = {
  title: 'UIkit/Marker',
  component: Marker,
  args: {
    href: '#',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Marker>

export const Default: Story = {}

export const OnImage: Story = {
  render: (args) => (
    <div className="uk-inline">
      <img src="https://getuikit.com/docs/images/photo.jpg" width="600" alt="" />
      <Marker
        {...args}
        className="uk-position-absolute uk-transform-center"
        style={{ left: '50%', top: '50%' }}
      />
    </div>
  ),
  name: 'Positioned on Image',
}