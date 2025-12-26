import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'UIkit/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Basic: Story = {
  render: (args) => (
    <nav aria-label="Breadcrumb">
      <Breadcrumb {...args}>
        <BreadcrumbItem>
          <a href="#">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="#">Linked Category</a>
        </BreadcrumbItem>
        <BreadcrumbItem disabled>
          <a>Disabled Category</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <span aria-current="page">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </nav>
  ),
}
