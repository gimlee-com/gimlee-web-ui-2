import type { Meta, StoryObj } from '@storybook/react'
import { Subnav } from './Subnav'
import { Icon } from '../Icon/Icon'

const meta: Meta<typeof Subnav> = {
  title: 'UIkit/Nav/Subnav',
  component: Subnav,
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'divider', 'pill'],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Subnav>

const renderSubNav = (args: Story['args']) => (
  <Subnav {...args}>
    <li className="uk-active">
      <a href="#">Active</a>
    </li>
    <li>
      <a href="#">Item</a>
    </li>
    <li className="uk-disabled">
      <span>Disabled</span>
    </li>
  </Subnav>
)

export const Default: Story = {
  render: renderSubNav,
}

export const Pill: Story = {
  render: renderSubNav,
  args: {
    variant: 'pill',
  },
}

export const WithDropdown: Story = {
  render: (args) => (
    <Subnav {...args}>
      <li className="uk-active">
        <a href="#">Active</a>
      </li>
      <li>
        <a href="#">Item</a>
      </li>
      <li>
        <a href="#">
          More <Icon icon="triangle-down" />
        </a>
        <div uk-dropdown="mode: click">
          <ul className="uk-nav uk-dropdown-nav">
            <li className="uk-active">
              <a href="#">Active</a>
            </li>
            <li>
              <a href="#">Item</a>
            </li>
            <li className="uk-nav-header">Header</li>
            <li>
              <a href="#">Item</a>
            </li>
          </ul>
        </div>
      </li>
    </Subnav>
  ),
  args: {
    variant: 'pill',
  },
  name: 'With Dropdown',
}