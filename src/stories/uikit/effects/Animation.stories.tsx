import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../../../components/uikit/Grid/Grid'
import { Card, CardBody } from '../../../components/uikit/Card/Card'

const meta: Meta = {
  title: 'UIkit/Effects/Animation',
  parameters: { controls: { hideNoControlsWarning: true } },
}
export default meta
type Story = StoryObj

const box = (cls: string, label: string) => (
  <div className="uk-animation-toggle" tabIndex={0}>
    <Card>
      <CardBody className={cls}>
        <p className="uk-text-center uk-margin-remove">{label}</p>
      </CardBody>
    </Card>
  </div>
)

export const CommonAnimations: Story = {
  name: 'Common animations',
  render: () => (
    <div className="uk-padding">
      <Grid className="uk-child-width-1-2 uk-child-width-1-4@m" match>
        <div>{box('uk-animation-fade', 'Fade')}</div>
        <div>{box('uk-animation-scale-up', 'Scale Up')}</div>
        <div>{box('uk-animation-scale-down', 'Scale Down')}</div>
        <div>{box('uk-animation-shake', 'Shake')}</div>
        <div>{box('uk-animation-slide-top', 'Slide Top')}</div>
        <div>{box('uk-animation-slide-bottom', 'Slide Bottom')}</div>
        <div>{box('uk-animation-slide-left', 'Slide Left')}</div>
        <div>{box('uk-animation-slide-right', 'Slide Right')}</div>
      </Grid>
    </div>
  ),
}

export const ReverseAndFast: Story = {
  name: 'Reverse & fast',
  render: () => (
    <div className="uk-padding">
      <Grid className="uk-child-width-1-3@m" match>
        <div>{box('uk-animation-fade uk-animation-reverse', 'Fade Reverse')}</div>
        <div>
          {box('uk-animation-scale-up uk-animation-reverse', 'Scale Reverse')}
        </div>
        <div>{box('uk-animation-slide-left uk-animation-fast', 'Slide Fast')}</div>
      </Grid>
    </div>
  ),
}