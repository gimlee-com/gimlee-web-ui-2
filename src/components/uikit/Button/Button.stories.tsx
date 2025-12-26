import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UIkit/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'danger', 'text', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'large', undefined],
    },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    disabled: false,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    variant: 'primary',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    variant: 'primary',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
}

export const GroupedWithMargin: Story = {
  render: () => (
    <div className="uk-panel uk-padding uk-background-muted">
      <p>
        Resize the container or view on a smaller screen to see the `uk-margin`
        attribute in action. It adds a top margin to buttons that wrap to the
        next line.
      </p>
      <div uk-margin="">
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const Grouped: Story = {
  render: () => (
    <div className="uk-button-group">
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
    </div>
  ),
}