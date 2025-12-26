import type { Meta, StoryObj } from '@storybook/react'
import { Leader } from './Leader'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof Leader> = {
  title: 'UIkit/Leader',
  component: Leader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Leader>

export const Basic: Story = {
  render: () => (
    <Grid gap="small">
      <div className="uk-width-expand">
        <Leader>Lorem ipsum dolor sit amet</Leader>
      </div>
      <div>$20.90</div>
    </Grid>
  ),
}

export const FillCharacter: Story = {
  args: {
    fill: '-',
  },
  render: (args) => (
    <Grid gap="small">
      <div className="uk-width-expand">
        <Leader {...args}>Lorem ipsum dolor sit amet</Leader>
      </div>
      <div>$20.90</div>
    </Grid>
  ),
}

export const Responsive: Story = {
  args: {
    media: '@m',
  },
  render: (args) => (
    <Grid gap="small">
      <div className="uk-width-expand">
        <Leader {...args}>Lorem ipsum dolor sit amet (Visible from @m)</Leader>
      </div>
      <div>$20.90</div>
    </Grid>
  ),
}
