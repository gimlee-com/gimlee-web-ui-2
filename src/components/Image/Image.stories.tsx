import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './Image'

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1490822180406-880c226c150b?fit=crop&w=650&h=433&q=80',
    width: 600,
    height: 400,
    alt: 'Sample Image',
  },
}

export const SlowLoading: Story = {
  render: (args) => {
    // Artificial delay would be hard to implement here without a proxy or similar
    // but we can see the placeholder if we use a broken or very large image.
    return <Image {...args} src={`https://httpbin.org/delay/2?url=${encodeURIComponent(args.src || '')}`} />
  },
  args: {
    src: 'https://images.unsplash.com/photo-1490822180406-880c226c150b?fit=crop&w=650&h=433&q=80',
    width: 600,
    height: 400,
  }
}
