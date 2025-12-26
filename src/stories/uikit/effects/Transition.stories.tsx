import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../../../components/uikit/Grid/Grid'
import { Icon } from '../../../components/uikit/Icon/Icon'

const meta: Meta = {
  title: 'UIkit/Effects/Transition',
  parameters: { controls: { hideNoControlsWarning: true } },
}
export default meta
type Story = StoryObj

const transitionCard = (transitionCls: string, label: string) => (
  <div className="uk-inline-clip uk-transition-toggle" tabIndex={0}>
    <img
      src="https://getuikit.com/docs/images/dark.jpg"
      width={400}
      height={266}
      alt=""
    />
    <div
      className={`uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle ${transitionCls}`}
    >
      <p className="uk-h5 uk-margin-remove">{label}</p>
    </div>
  </div>
)

export const BasicTransitions: Story = {
  name: 'Fade & Slide',
  render: () => (
    <div className="uk-padding">
      <Grid className="uk-child-width-1-3@s" gap="medium">
        <div>{transitionCard('uk-transition-fade', 'Fade')}</div>
        <div>{transitionCard('uk-transition-slide-bottom', 'Slide Bottom')}</div>
        <div>{transitionCard('uk-transition-slide-top', 'Slide Top')}</div>
        <div>{transitionCard('uk-transition-slide-left', 'Slide Left')}</div>
        <div>{transitionCard('uk-transition-slide-right', 'Slide Right')}</div>
      </Grid>
    </div>
  ),
}

export const ScaleAndIcon: Story = {
  name: 'Scale & icon overlay',
  render: () => (
    <div className="uk-padding">
      <Grid className="uk-child-width-1-2@s" gap="medium">
        <div>
          <div className="uk-inline-clip uk-transition-toggle" tabIndex={0}>
            <img
              src="https://getuikit.com/docs/images/dark.jpg"
              width="400"
              height="266"
              alt=""
              className="uk-transition-scale-up uk-transition-opaque"
            />
          </div>
        </div>
        <div>
          <div
            className="uk-inline-clip uk-transition-toggle uk-light"
            tabIndex={0}
          >
            <img
              src="https://getuikit.com/docs/images/dark.jpg"
              width="400"
              height="266"
              alt=""
            />
            <div className="uk-position-center">
              <span className="uk-transition-fade">
                <Icon icon="plus" ratio={2} />
              </span>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  ),
}