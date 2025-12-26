import type { Meta, StoryObj } from '@storybook/react'
import { Dropnav } from './Dropnav'
import { Subnav } from '../Subnav/Subnav'
import { Tab, TabItem } from '../Tab/Tab'
import { Dropdown } from '../Dropdown/Dropdown'
import { Nav, NavItem, NavHeader, NavDivider } from '../Nav/Nav'
import { DropParentIcon } from '../Drop/Drop'
import { Section } from '../Section/Section'

const meta: Meta<typeof Dropnav> = {
  title: 'UIkit/Dropnav',
  component: Dropnav,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dropnav>

export const Basic: Story = {
  render: () => (
    <Dropnav>
      <Subnav>
        <li className="uk-active"><a href="#">Active</a></li>
        <li>
          <a href="#">Parent <DropParentIcon /></a>
          <Dropdown>
            <Nav variant="dropdown">
              <NavItem active><a href="#">Active</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
            </Nav>
          </Dropdown>
        </li>
        <li>
          <a href="#">Parent <DropParentIcon /></a>
          <Dropdown>
            <Nav variant="dropdown">
              <NavItem active><a href="#">Active</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
            </Nav>
          </Dropdown>
        </li>
        <li><a href="#">Item</a></li>
      </Subnav>
    </Dropnav>
  ),
}

export const WithDropbar: Story = {
  render: () => (
    <Dropnav dropbar={true}>
      <Subnav>
        <li className="uk-active"><a href="#">Active</a></li>
        <li>
          <a href="#">Item</a>
          <Dropdown>
            <Nav variant="dropdown">
              <NavItem active><a href="#">Active</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
              <NavHeader>Header</NavHeader>
              <NavItem><a href="#">Item</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
              <NavDivider />
              <NavItem><a href="#">Item</a></NavItem>
            </Nav>
          </Dropdown>
        </li>
        <li><a href="#">Item</a></li>
      </Subnav>
    </Dropnav>
  ),
}

export const ClickMode: Story = {
  render: () => (
    <Dropnav mode="click">
      <Subnav>
        <li className="uk-active"><a href="#">Active</a></li>
        <li>
          <a href="#">Parent <DropParentIcon /></a>
          <Dropdown>
            <Nav variant="dropdown">
              <NavItem active><a href="#">Active</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
            </Nav>
          </Dropdown>
        </li>
        <li><a href="#">Item</a></li>
      </Subnav>
    </Dropnav>
  ),
}

export const Alignment: Story = {
  render: () => (
    <Dropnav align="center">
      <Subnav className="uk-flex-center">
        <li className="uk-active"><a href="#">Active</a></li>
        <li>
          <a href="#">Parent <DropParentIcon /></a>
          <Dropdown>
            <Nav variant="dropdown">
              <NavItem active><a href="#">Active</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
            </Nav>
          </Dropdown>
        </li>
        <li><a href="#">Item</a></li>
      </Subnav>
    </Dropnav>
  ),
}

export const WithTab: Story = {
  render: () => (
    <Dropnav>
      <Tab>
        <TabItem active><a href="#">Active</a></TabItem>
        <TabItem>
          <a href="#">Parent <DropParentIcon /></a>
          <Dropdown>
            <Nav variant="dropdown">
              <NavItem active><a href="#">Active</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
              <NavItem><a href="#">Item</a></NavItem>
            </Nav>
          </Dropdown>
        </TabItem>
        <TabItem><a href="#">Item</a></TabItem>
      </Tab>
    </Dropnav>
  ),
}
