import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Alert } from './Alert'
import { Button } from '../Button/Button'

const meta: Meta<typeof Alert> = {
  title: 'UIkit/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', undefined],
    },
    children: { control: 'text' },
    onClose: { action: 'closed' },
  },
  args: {
    children: 'This is an alert message.',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'This is a primary alert.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'This is a success alert.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'This is a warning alert.',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'This is a danger alert.',
  },
}

// A special story to demonstrate the closable functionality.
const ClosableAlertStory = (args: Story['args']) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsVisible(true)} disabled={isVisible}>
        Show Alert
      </Button>
      <div className="uk-margin-top">
        {isVisible && (
          <Alert
            {...args}
            onClose={() => {
              // This will be logged in the Storybook Actions panel
              args?.onClose?.()
              setIsVisible(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

export const Closable: Story = {
  render: ClosableAlertStory,
  args: {
    variant: 'danger',
    children:
      'This is a closable alert. Click the close button to dismiss it.',
  },
}