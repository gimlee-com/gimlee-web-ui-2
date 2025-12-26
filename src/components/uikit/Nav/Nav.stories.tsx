import type { Meta, StoryObj } from '@storybook/react'
import { Nav, NavItem, SubNav, NavHeader, NavDivider } from './Nav'
import { Icon } from '../Icon/Icon'

const meta: Meta<typeof Nav> = {
  title: 'UIkit/Nav/Nav',
  component: Nav,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Nav>

export const Default: Story = {
  render: (args) => (
    <div className="uk-width-1-2@s">
      <Nav {...args}>
        <NavItem active>
          <a href="#">Active</a>
        </NavItem>
        <NavItem>
          <a href="#">Item</a>
        </NavItem>
        <NavHeader>Header</NavHeader>
        <NavItem>
          <a href="#">
            <Icon icon="table" className="uk-margin-xsmall-right" />
            Item
          </a>
        </NavItem>
        <NavDivider />
        <NavItem>
          <a href="#">
            <Icon icon="trash" className="uk-margin-xsmall-right" />
            Item
          </a>
        </NavItem>
      </Nav>
    </div>
  ),
}

export const Nested: Story = {
  name: 'With Nested Subnav',
  render: (args) => (
    <div className="uk-width-1-2@s">
      <Nav {...args}>
        <NavItem active>
          <a href="#">Active</a>
        </NavItem>
        <NavItem parent>
          <a href="#">Parent</a>
          <SubNav>
            <NavItem>
              <a href="#">Sub Item</a>
            </NavItem>
            <NavItem>
              <a href="#">Sub Item</a>
            </NavItem>
          </SubNav>
        </NavItem>
      </Nav>
    </div>
  ),
}

export const Accordion: Story = {
  name: 'With Accordion Behavior',
  render: (args) => (
    <div className="uk-width-1-2@s">
      <Nav {...args}>
        <NavItem active>
          <a href="#">Active</a>
        </NavItem>
        <NavItem parent>
          <a href="#">
            Parent <Icon icon="nav-parent-icon" />
          </a>
          <SubNav>
            <NavItem>
              <a href="#">Sub Item</a>
            </NavItem>
            <NavItem>
              <a href="#">Sub Item</a>
            </NavItem>
          </SubNav>
        </NavItem>
        <NavItem parent>
          <a href="#">
            Another Parent <Icon icon="nav-parent-icon" />
          </a>
          <SubNav>
            <NavItem>
              <a href="#">Sub Item</a>
            </NavItem>
          </SubNav>
        </NavItem>
      </Nav>
    </div>
  ),
  args: {
    accordion: true,
  },
}

export const Primary: Story = {
  ...Default,
  args: {
    variant: 'primary',
  },
}

export const Centered: Story = {
  ...Default,
  args: {
    variant: 'center',
  },
}