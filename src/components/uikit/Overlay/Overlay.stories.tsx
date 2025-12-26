import type { Meta, StoryObj } from '@storybook/react'
import { Overlay, OverlayIcon } from './Overlay'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof Overlay> = {
  title: 'UIkit/Overlay',
  component: Overlay,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Overlay>

export const Basic: Story = {
  render: () => (
    <div className="uk-inline">
      <img src="https://getuikit.com/docs/images/photo.jpg" width="600" height="400" alt="" />
      <Overlay className="uk-light uk-position-bottom">
        <p>Default Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Overlay>
    </div>
  ),
}

export const DefaultModifier: Story = {
  render: () => (
    <Grid gap="small" className="uk-child-width-1-2@m">
      <div>
        <div className="uk-inline">
          <img src="https://getuikit.com/docs/images/photo.jpg" width="600" height="400" alt="" />
          <Overlay variant="default" className="uk-position-bottom">
            <p>Default Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Overlay>
        </div>
      </div>
      <div>
        <div className="uk-inline">
          <img src="https://getuikit.com/docs/images/photo.jpg" width="600" height="400" alt="" />
          <div className="uk-overlay-default uk-position-cover"></div>
          <Overlay className="uk-position-bottom uk-dark">
            <p>Default Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Overlay>
        </div>
      </div>
    </Grid>
  ),
}

export const PrimaryModifier: Story = {
  render: () => (
    <Grid gap="small" className="uk-child-width-1-2@m">
      <div>
        <div className="uk-inline">
          <img src="https://getuikit.com/docs/images/photo.jpg" width="600" height="400" alt="" />
          <Overlay variant="primary" className="uk-position-bottom">
            <p>Primary Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Overlay>
        </div>
      </div>
      <div>
        <div className="uk-inline">
          <img src="https://getuikit.com/docs/images/photo.jpg" width="600" height="400" alt="" />
          <div className="uk-overlay-primary uk-position-cover"></div>
          <Overlay className="uk-position-bottom uk-light">
            <p>Primary Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Overlay>
        </div>
      </div>
    </Grid>
  ),
}

export const Icon: Story = {
  render: () => (
    <Grid gap="small" className="uk-child-width-1-2@m">
      <div>
        <div className="uk-inline uk-light">
          <img src="https://getuikit.com/docs/images/dark.jpg" width="600" height="400" alt="" />
          <div className="uk-position-center">
            <OverlayIcon />
          </div>
        </div>
      </div>
      <div>
        <div className="uk-inline uk-dark">
          <img src="https://getuikit.com/docs/images/photo.jpg" width="600" height="400" alt="" />
          <div className="uk-overlay-default uk-position-cover">
            <div className="uk-position-center">
              <OverlayIcon />
            </div>
          </div>
        </div>
      </div>
    </Grid>
  ),
}
