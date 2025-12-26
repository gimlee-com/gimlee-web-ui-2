import type { Meta, StoryObj } from '@storybook/react'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from './DescriptionList'

const meta: Meta<typeof DescriptionList> = {
  title: 'UIkit/Description List',
  component: DescriptionList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DescriptionList>

export const Basic: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionTerm>Description term</DescriptionTerm>
      <DescriptionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</DescriptionDetails>
      <DescriptionTerm>Description term</DescriptionTerm>
      <DescriptionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</DescriptionDetails>
      <DescriptionTerm>Description term</DescriptionTerm>
      <DescriptionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</DescriptionDetails>
    </DescriptionList>
  ),
}

export const Divider: Story = {
  args: {
    divider: true,
  },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionTerm>Description term</DescriptionTerm>
      <DescriptionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</DescriptionDetails>
      <DescriptionTerm>Description term</DescriptionTerm>
      <DescriptionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</DescriptionDetails>
      <DescriptionTerm>Description term</DescriptionTerm>
      <DescriptionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</DescriptionDetails>
    </DescriptionList>
  ),
}
