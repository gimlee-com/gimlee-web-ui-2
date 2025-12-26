import type { Meta, StoryObj } from '@storybook/react'
import UIkit from 'uikit'
import { Button } from '../../components/uikit/Button/Button'

const meta: Meta = {
  title: 'UIkit/Notification',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export default meta
type Story = StoryObj

export const Usage: Story = {
  render: () => (
    <Button
      onClick={() => UIkit.notification({ message: 'Notification message' })}
    >
      Click me
    </Button>
  ),
}

export const HTMLMessage: Story = {
  name: 'HTML message',
  render: () => (
    <Button
      onClick={() =>
        UIkit.notification({
          message: "<span uk-icon='icon: check'></span> Message with an icon",
        })
      }
    >
      With icon
    </Button>
  ),
}

export const Position: Story = {
  render: () => (
    <div className="uk-margin" uk-margin="">
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Top Left...', pos: 'top-left' })
        }
      >
        Top Left
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Top Center...', pos: 'top-center' })
        }
      >
        Top Center
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Top Right...', pos: 'top-right' })
        }
      >
        Top Right
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Bottom Left...', pos: 'bottom-left' })
        }
      >
        Bottom Left
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({
            message: 'Bottom Center...',
            pos: 'bottom-center',
          })
        }
      >
        Bottom Center
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Bottom Right...', pos: 'bottom-right' })
        }
      >
        Bottom Right
      </Button>
    </div>
  ),
}

export const Style: Story = {
  render: () => (
    <div className="uk-margin" uk-margin="">
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Primary message...', status: 'primary' })
        }
      >
        Primary
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Success message...', status: 'success' })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Warning message...', status: 'warning' })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Danger message...', status: 'danger' })
        }
      >
        Danger
      </Button>
    </div>
  ),
}

export const Timeout: Story = {
  render: () => (
    <div className="uk-margin" uk-margin="">
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Disappears in 1s', timeout: 1000 })
        }
      >
        1 second
      </Button>
      <Button
        onClick={() =>
          UIkit.notification({ message: 'Stays until clicked', timeout: 0 })
        }
      >
        Infinite
      </Button>
    </div>
  ),
}

export const CloseAll: Story = {
  name: 'Close all',
  render: () => (
    <div className="uk-margin" uk-margin="">
      <Button
        onClick={() => {
          UIkit.notification({ message: 'Message 1', timeout: 0 })
          UIkit.notification({ message: 'Message 2', timeout: 0 })
          UIkit.notification({ message: 'Message 3', timeout: 0 })
        }}
      >
        Open multiple
      </Button>
      <Button onClick={() => UIkit.notification.closeAll()}>Close All</Button>
    </div>
  ),
}
