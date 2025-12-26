import type { Meta, StoryObj } from '@storybook/react'
import {
  Countdown,
  CountdownDays,
  CountdownHours,
  CountdownMinutes,
  CountdownSeconds,
  CountdownSeparator,
  CountdownLabel,
} from './Countdown'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof Countdown> = {
  title: 'UIkit/Countdown',
  component: Countdown,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Countdown>

// Future date: 7 days from now
const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

export const Basic: Story = {
  render: () => (
    <Countdown date={futureDate} className="uk-h1">
      <CountdownDays />
      <CountdownHours />
      <CountdownMinutes />
      <CountdownSeconds />
    </Countdown>
  ),
}

export const WithGrid: Story = {
  render: () => (
    <Countdown date={futureDate} className="uk-h1">
      <Grid gap="small" className="uk-child-width-auto uk-flex-middle">
        <div><CountdownDays /></div>
        <div><CountdownHours /></div>
        <div><CountdownMinutes /></div>
        <div><CountdownSeconds /></div>
      </Grid>
    </Countdown>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <Countdown date={futureDate} className="uk-h1">
      <Grid gap="small" className="uk-child-width-auto uk-flex-middle">
        <div><CountdownDays /></div>
        <CountdownSeparator />
        <div><CountdownHours /></div>
        <CountdownSeparator />
        <div><CountdownMinutes /></div>
        <CountdownSeparator />
        <div><CountdownSeconds /></div>
      </Grid>
    </Countdown>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <Countdown date={futureDate}>
      <Grid gap="small" className="uk-child-width-auto uk-text-center">
        <div>
          <div className="uk-h1"><CountdownDays /></div>
          <CountdownLabel className="uk-text-small uk-visible@s">Days</CountdownLabel>
        </div>
        <div className="uk-h1"><CountdownSeparator /></div>
        <div>
          <div className="uk-h1"><CountdownHours /></div>
          <CountdownLabel className="uk-text-small uk-visible@s">Hours</CountdownLabel>
        </div>
        <div className="uk-h1"><CountdownSeparator /></div>
        <div>
          <div className="uk-h1"><CountdownMinutes /></div>
          <CountdownLabel className="uk-text-small uk-visible@s">Minutes</CountdownLabel>
        </div>
        <div className="uk-h1"><CountdownSeparator /></div>
        <div>
          <div className="uk-h1"><CountdownSeconds /></div>
          <CountdownLabel className="uk-text-small uk-visible@s">Seconds</CountdownLabel>
        </div>
      </Grid>
    </Countdown>
  ),
}
