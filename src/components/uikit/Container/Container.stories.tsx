import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'UIkit/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [undefined, 'xsmall', 'small', 'large', 'xlarge', 'expand'],
      description: 'Size modifier for the container width',
    },
  },
  // Adding a background color to the children so the container width is visible
  decorators: [
    (Story) => (
      <div style={{ background: '#f8f8f8', padding: '20px 0' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Container>

const PlaceholderContent = () => (
  <div style={{ background: '#daeeff', padding: '20px', border: '1px solid #b2d7ff', textAlign: 'center' }}>
    Container Content
  </div>
)

export const Default: Story = {
  args: {
    children: <PlaceholderContent />,
  },
}

export const XSmall: Story = {
  args: {
    size: 'xsmall',
    children: <PlaceholderContent />,
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    children: <PlaceholderContent />,
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    children: <PlaceholderContent />,
  },
}

export const XLarge: Story = {
  args: {
    size: 'xlarge',
    children: <PlaceholderContent />,
  },
}

export const Expand: Story = {
  args: {
    size: 'expand',
    children: <PlaceholderContent />,
  },
}