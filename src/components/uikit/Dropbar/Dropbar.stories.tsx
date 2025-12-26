import type { Meta, StoryObj } from '@storybook/react'
import { Dropbar } from './Dropbar'
import { Navbar, NavbarContainer, NavbarLeft, NavbarNav, NavbarItem } from '../Navbar/Navbar'
import { Nav, NavItem, NavHeader, NavDivider } from '../Nav/Nav'

const meta: Meta<typeof Dropbar> = {
  title: 'UIkit/Dropbar',
  component: Dropbar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dropbar>

export const Basic: Story = {
  render: () => (
    <div className="uk-overflow-auto uk-height-medium">
      <NavbarContainer>
        <Navbar>
          <NavbarLeft>
            <NavbarNav>
              <NavbarItem>
                <a href="#">Hover</a>
                <Dropbar variant="top" stretch="x">
                  <div className="uk-padding-large">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                </Dropbar>
              </NavbarItem>
            </NavbarNav>
          </NavbarLeft>
        </Navbar>
      </NavbarContainer>
    </div>
  ),
}

export const WithNav: Story = {
  render: () => (
    <div className="uk-overflow-auto uk-height-large">
      <NavbarContainer>
        <Navbar>
          <NavbarLeft>
            <NavbarNav>
              <NavbarItem>
                <a href="#">Hover</a>
                <Dropbar variant="top" stretch="x">
                  <Nav variant="dropdown">
                    <NavItem active><a href="#">Active</a></NavItem>
                    <NavItem><a href="#">Item</a></NavItem>
                    <NavHeader>Header</NavHeader>
                    <NavItem><a href="#">Item</a></NavItem>
                    <NavDivider />
                    <NavItem><a href="#">Item</a></NavItem>
                  </Nav>
                </Dropbar>
              </NavbarItem>
            </NavbarNav>
          </NavbarLeft>
        </Navbar>
      </NavbarContainer>
    </div>
  ),
}

export const Directions: Story = {
  render: () => (
    <div className="uk-overflow-auto uk-height-large">
      <NavbarContainer>
        <Navbar>
          <NavbarLeft>
            <NavbarNav>
              <NavbarItem>
                <a href="#">Top</a>
                <Dropbar variant="top" stretch="x" target="!.uk-navbar-container">
                  <div className="uk-padding">Top Dropbar</div>
                </Dropbar>
              </NavbarItem>
              <NavbarItem>
                <a href="#">Left</a>
                <Dropbar variant="left" stretch="y" target="!.uk-navbar-container">
                  <div className="uk-padding">Left Dropbar</div>
                </Dropbar>
              </NavbarItem>
              <NavbarItem>
                <a href="#">Right</a>
                <Dropbar variant="right" pos="bottom-right" stretch="y" target="!.uk-navbar-container">
                  <div className="uk-padding">Right Dropbar</div>
                </Dropbar>
              </NavbarItem>
            </NavbarNav>
          </NavbarLeft>
        </Navbar>
      </NavbarContainer>
    </div>
  ),
}
