import type { Meta, StoryObj } from '@storybook/react'
import { Close } from './Close'
import { Alert } from '../Alert/Alert'

const meta: Meta<typeof Close> = {
  title: 'UIkit/Nav/Close',
  component: Close,
  argTypes: {
    large: { control: 'boolean' },
  },
  args: {
    large: false,
    'aria-label': 'Close',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Close>

export const Default: Story = {}

export const Large: Story = {
  args: {
    large: true,
  },
}

export const InAlert: Story = {
  render: (args) => (
    <Alert variant="primary">
      <Close
        {...args}
        className="uk-alert-close"
        onClick={() => alert('Closed!')}
      />
      <p>This is an alert with a close button.</p>
    </Alert>
  ),
  name: 'In an Alert',
}