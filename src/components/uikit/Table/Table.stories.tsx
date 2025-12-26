import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'

const meta: Meta<typeof Table> = {
  title: 'UIkit/Table',
  component: Table,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

const TableContent = () => (
  <>
    <thead>
      <tr>
        <th>Table Heading</th>
        <th>Table Heading</th>
        <th>Table Heading</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Table Data</td>
        <td>Table Data</td>
        <td>Table Data</td>
      </tr>
      <tr>
        <td>Table Data</td>
        <td>Table Data</td>
        <td>Table Data</td>
      </tr>
      <tr>
        <td>Table Data</td>
        <td>Table Data</td>
        <td>Table Data</td>
      </tr>
    </tbody>
  </>
)

export const Basic: Story = {
  render: () => (
    <Table>
      <TableContent />
    </Table>
  ),
}

export const Divider: Story = {
  args: { divider: true },
  render: (args) => (
    <Table {...args}>
      <TableContent />
    </Table>
  ),
}

export const Striped: Story = {
  args: { striped: true },
  render: (args) => (
    <Table {...args}>
      <TableContent />
    </Table>
  ),
}

export const Hover: Story = {
  args: { hover: true, divider: true },
  render: (args) => (
    <Table {...args}>
      <TableContent />
    </Table>
  ),
}

export const Small: Story = {
  args: { small: true, divider: true },
  render: (args) => (
    <Table {...args}>
      <TableContent />
    </Table>
  ),
}

export const Justify: Story = {
  args: { justify: true, divider: true },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th className="uk-table-shrink">Shrink</th>
          <th>Expand</th>
          <th className="uk-width-small">Small</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data</td>
          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
          <td><Button variant="default">Button</Button></td>
        </tr>
        <tr>
          <td>Data</td>
          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
          <td><Button variant="default">Button</Button></td>
        </tr>
      </tbody>
    </Table>
  ),
}

export const Middle: Story = {
  args: { middle: true, divider: true },
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th className="uk-table-shrink">Shrink</th>
          <th>Expand</th>
          <th className="uk-width-small">Small</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data</td>
          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
          <td><Button variant="default">Button</Button></td>
        </tr>
      </tbody>
    </Table>
  ),
}

export const Responsive: Story = {
  render: () => (
    <div className="uk-overflow-auto">
      <Table divider striped small>
        <thead>
          <tr>
            {[...Array(12)].map((_, i) => <th key={i}>Heading {i + 1}</th>)}
          </tr>
        </thead>
        <tbody>
          {[...Array(3)].map((_, i) => (
            <tr key={i}>
              {[...Array(12)].map((_, j) => <td key={j}>Data {j + 1}</td>)}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  ),
}
