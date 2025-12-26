import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'
import { Button } from '../Button/Button'
import { Nav, NavItem, NavHeader, NavDivider } from '../Nav/Nav'

const meta: Meta<typeof Dropdown> = {
  title: 'UIkit/Nav/Dropdown',
  component: Dropdown,
  argTypes: {
    large: { control: 'boolean' },
  },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  render: (args) => (
    <div className="uk-inline">
      <Button>Hover Me</Button>
      <Dropdown {...args} uk-dropdown="">
        <p>This is a simple dropdown.</p>
      </Dropdown>
    </div>
  ),
}

export const WithNav: Story = {
  name: 'With a Nav',
  render: (args) => (
    <div className="uk-inline">
      <Button>Hover Me</Button>
      <Dropdown {...args} uk-dropdown="">
        <Nav className="uk-dropdown-nav">
          <NavItem active>
            <a href="#">Active</a>
          </NavItem>
          <NavItem>
            <a href="#">Item</a>
          </NavItem>
          <NavHeader>Header</NavHeader>
          <NavItem>
            <a href="#">Item</a>
          </NavItem>
          <NavDivider />
          <NavItem>
            <a href="#">Separated Item</a>
          </NavItem>
        </Nav>
      </Dropdown>
    </div>
  ),
}

export const ClickMode: Story = {
  render: (args) => (
    <div className="uk-inline">
      <Button>Click Me</Button>
      <Dropdown {...args} uk-dropdown="mode: click">
        <p>This dropdown appears on click.</p>
      </Dropdown>
    </div>
  ),
}