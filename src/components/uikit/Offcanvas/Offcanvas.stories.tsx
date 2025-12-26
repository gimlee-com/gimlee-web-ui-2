import type { Meta, StoryObj } from '@storybook/react'
import { Offcanvas, OffcanvasBar, OffcanvasClose } from './Offcanvas'
import { Button } from '../Button/Button'
import { Nav, NavItem, NavHeader, NavDivider, SubNav } from '../Nav/Nav'

const meta: Meta<typeof Offcanvas> = {
  title: 'UIkit/Offcanvas',
  component: Offcanvas,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Offcanvas>

export const Basic: Story = {
  render: (args) => (
    <div>
      <Button uk-toggle="target: #offcanvas-usage">Open</Button>

      <Offcanvas id="offcanvas-usage" {...args}>
        <OffcanvasBar>
          <OffcanvasClose />
          <h3>Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </OffcanvasBar>
      </Offcanvas>
    </div>
  ),
}

export const Overlay: Story = {
  args: {
    overlay: true,
  },
  render: (args) => (
    <div>
      <Button uk-toggle="target: #offcanvas-overlay">Open</Button>

      <Offcanvas id="offcanvas-overlay" {...args}>
        <OffcanvasBar>
          <OffcanvasClose />
          <h3>Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </OffcanvasBar>
      </Offcanvas>
    </div>
  ),
}

export const Flip: Story = {
  args: {
    flip: true,
    overlay: true,
  },
  render: (args) => (
    <div>
      <Button uk-toggle="target: #offcanvas-flip">Open</Button>

      <Offcanvas id="offcanvas-flip" {...args}>
        <OffcanvasBar>
          <OffcanvasClose />
          <h3>Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </OffcanvasBar>
      </Offcanvas>
    </div>
  ),
}

export const NavInOffcanvas: Story = {
  name: 'Nav in Off-canvas',
  args: {
    overlay: true,
  },
  render: (args) => (
    <div>
      <Button uk-toggle="target: #offcanvas-nav">Open Nav</Button>

      <Offcanvas id="offcanvas-nav" {...args}>
        <OffcanvasBar>
          <OffcanvasClose />
          <Nav variant="default">
            <NavItem active>
              <a href="#">Active</a>
            </NavItem>
            <NavItem parent>
              <a href="#">Parent</a>
              <SubNav>
                <li>
                  <a href="#">Sub item</a>
                </li>
                <li>
                  <a href="#">Sub item</a>
                </li>
              </SubNav>
            </NavItem>
            <NavHeader>Header</NavHeader>
            <NavItem>
              <a href="#">
                <span className="uk-margin-small-right" uk-icon="icon: table" />
                Item
              </a>
            </NavItem>
            <NavItem>
              <a href="#">
                <span className="uk-margin-small-right" uk-icon="icon: thumbnails" />
                Item
              </a>
            </NavItem>
            <NavDivider />
            <NavItem>
              <a href="#">
                <span className="uk-margin-small-right" uk-icon="icon: trash" />
                Item
              </a>
            </NavItem>
          </Nav>
        </OffcanvasBar>
      </Offcanvas>
    </div>
  ),
}
