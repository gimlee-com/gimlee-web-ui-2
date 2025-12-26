import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from './Card'

const meta: Meta<typeof Card> = {
  title: 'UIkit/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'hover'],
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardTitle>Default Card</CardTitle>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </CardBody>
    </Card>
  ),
}

export const Primary: Story = {
  ...Default,
  args: {
    variant: 'primary',
  },
}

export const Hover: Story = {
  ...Default,
  args: {
    variant: 'hover',
  },
}

export const WithHeaderAndFooter: Story = {
  render: (args) => (
    <Card {...args} className="uk-width-1-2@m">
      <CardHeader>
        <CardTitle>Header</CardTitle>
      </CardHeader>
      <CardBody>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </CardBody>
      <CardFooter>
        <p>Footer</p>
      </CardFooter>
    </Card>
  ),
}

export const WithMediaTop: Story = {
  render: (args) => (
    <Card {...args} className="uk-width-1-2@m">
      <CardMedia position="top">
        <img
          src="https://getuikit.com/docs/images/light.jpg"
          width="1800"
          height="1200"
          alt=""
        />
      </CardMedia>
      <CardBody>
        <CardTitle>Media Top</CardTitle>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </CardBody>
    </Card>
  ),
}