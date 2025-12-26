import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from './Placeholder'

const meta: Meta<typeof Placeholder> = {
  title: 'UIkit/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Placeholder>

export const Basic: Story = {
  render: () => (
    <Placeholder className="uk-text-center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Placeholder>
  ),
}
