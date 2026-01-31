import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './Image'

const meta: Meta<typeof Image> = {
  title: 'UIKit/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1490822180406-880c226c150b?fit=crop&w=650&h=433&q=80',
    width: 650,
    height: 433,
    alt: 'A beautiful landscape',
  },
}

export const Background: Story = {
  args: {
    as: 'div',
    src: 'https://images.unsplash.com/photo-1490822180406-880c226c150b?fit=crop&w=650&h=433&q=80',
    className: 'uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light',
    children: <h1 className="uk-heading-small">Background Image</h1>,
    style: { height: '300px' },
  },
}
