import type { Meta, StoryObj } from '@storybook/react'
import { Search, SearchInput, SearchIcon } from './Search'
import { Navbar, NavbarContainer, NavbarLeft, NavbarRight, NavbarItem } from '../Navbar/Navbar'
import { Dropdown } from '../Dropdown/Dropdown'
import { Modal, ModalDialog, ModalCloseFull } from '../Modal/Modal'
import { Button } from '../Button/Button'

const meta: Meta<typeof Search> = {
  title: 'UIkit/Search',
  component: Search,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Search>

export const Basic: Story = {
  render: () => (
    <Search variant="default">
      <SearchIcon />
      <SearchInput placeholder="Search" aria-label="Search" />
    </Search>
  ),
}

export const ClickableIcon: Story = {
  render: () => (
    <Search variant="default">
      <SearchIcon tag="button" type="button" />
      <SearchInput placeholder="Search" aria-label="Search" />
    </Search>
  ),
}

export const IconFlipped: Story = {
  render: () => (
    <Search variant="default">
      <SearchInput placeholder="Search" aria-label="Search" />
      <SearchIcon flip />
    </Search>
  ),
}

export const NavbarSearch: Story = {
  render: () => (
    <NavbarContainer>
      <Navbar>
        <NavbarLeft>
          <NavbarItem>
            <Search variant="navbar">
              <SearchIcon />
              <SearchInput placeholder="Search" aria-label="Search" />
            </Search>
          </NavbarItem>
        </NavbarLeft>
      </Navbar>
    </NavbarContainer>
  ),
}

export const SearchDropdown: Story = {
  render: () => (
    <NavbarContainer>
      <Navbar>
        <NavbarRight>
          <NavbarItem>
            <SearchIcon tag="a" className="uk-navbar-toggle" href="#" />
            <Dropdown mode="click" pos="left-center" offset={0} className="uk-padding-remove">
              <Search variant="navbar" className="uk-width-large">
                <SearchInput placeholder="Search" aria-label="Search" autoFocus />
              </Search>
            </Dropdown>
          </NavbarItem>
        </NavbarRight>
      </Navbar>
    </NavbarContainer>
  ),
}

export const FullscreenModal: Story = {
  render: () => (
    <div>
      <Button uk-toggle="target: #modal-full">Open Search Modal</Button>
      <Modal id="modal-full" className="uk-modal-full">
        <ModalDialog className="uk-flex uk-flex-center uk-flex-middle" uk-height-viewport="">
          <ModalCloseFull large />
          <Search variant="large">
            <SearchInput className="uk-text-center" placeholder="Search" aria-label="Search" autoFocus />
          </Search>
        </ModalDialog>
      </Modal>
    </div>
  ),
}

