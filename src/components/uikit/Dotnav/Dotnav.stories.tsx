import type { Meta, StoryObj } from '@storybook/react'
import { Dotnav, DotnavItem } from './Dotnav'

const meta: Meta<typeof Dotnav> = {
  title: 'UIkit/Dotnav',
  component: Dotnav,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dotnav>

export const Basic: Story = {
  render: () => (
    <Dotnav>
      <DotnavItem active><a href="#">Item 1</a></DotnavItem>
      <DotnavItem><a href="#">Item 2</a></DotnavItem>
      <DotnavItem><a href="#">Item 3</a></DotnavItem>
      <DotnavItem><a href="#">Item 4</a></DotnavItem>
      <DotnavItem><a href="#">Item 5</a></DotnavItem>
    </Dotnav>
  ),
}

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: (args) => (
    <Dotnav {...args}>
      <DotnavItem active><a href="#">Item 1</a></DotnavItem>
      <DotnavItem><a href="#">Item 2</a></DotnavItem>
      <DotnavItem><a href="#">Item 3</a></DotnavItem>
      <DotnavItem><a href="#">Item 4</a></DotnavItem>
      <DotnavItem><a href="#">Item 5</a></DotnavItem>
    </Dotnav>
  ),
}
