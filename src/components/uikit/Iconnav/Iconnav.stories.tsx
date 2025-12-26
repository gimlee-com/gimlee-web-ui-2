import type { Meta, StoryObj } from '@storybook/react'
import { Iconnav } from './Iconnav'
import { Icon } from '../Icon/Icon'

const meta: Meta<typeof Iconnav> = {
  title: 'UIkit/Nav/Iconnav',
  component: Iconnav,
  argTypes: {
    vertical: { control: 'boolean' },
  },
  args: {
    vertical: false,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Iconnav>

const renderIconNav = (args: Story['args']) => (
  <Iconnav {...args}>
    <li className="uk-active">
      <a href="#">
        <Icon icon="plus" />
      </a>
    </li>
    <li>
      <a href="#">
        <Icon icon="file-edit" />
      </a>
    </li>
    <li>
      <a href="#">
        <Icon icon="copy" />
      </a>
    </li>
  </Iconnav>
)

export const Default: Story = {
  render: renderIconNav,
}

export const Vertical: Story = {
  render: renderIconNav,
  args: {
    vertical: true,
  },
}