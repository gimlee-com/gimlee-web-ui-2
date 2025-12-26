import type { Meta, StoryObj } from '@storybook/react'
import { Thumbnav } from './Thumbnav'

const meta: Meta<typeof Thumbnav> = {
  title: 'UIkit/Nav/Thumbnav',
  component: Thumbnav,
  argTypes: {
    vertical: { control: 'boolean' },
  },
  args: {
    vertical: false,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Thumbnav>

const renderThumbNav = (args: Story['args']) => (
  <Thumbnav {...args}>
    <li className="uk-active">
      <a href="#">
        <img
          src="https://getuikit.com/docs/images/photo.jpg"
          width="100"
          alt=""
        />
      </a>
    </li>
    <li>
      <a href="#">
        <img
          src="https://getuikit.com/docs/images/dark.jpg"
          width="100"
          alt=""
        />
      </a>
    </li>
    <li>
      <a href="#">
        <img
          src="https://getuikit.com/docs/images/light.jpg"
          width="100"
          alt=""
        />
      </a>
    </li>
  </Thumbnav>
)

export const Default: Story = {
  render: renderThumbNav,
}

export const Vertical: Story = {
  render: renderThumbNav,
  args: {
    vertical: true,
  },
}