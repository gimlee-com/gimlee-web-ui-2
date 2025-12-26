import type { Meta, StoryObj } from '@storybook/react'
import { Slidenav, SlidenavContainer } from './Slidenav'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof Slidenav> = {
  title: 'UIkit/Slidenav',
  component: Slidenav,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slidenav>

export const Basic: Story = {
  render: () => (
    <Grid gap="small">
      <div>
        <Slidenav type="previous" href="#" />
      </div>
      <div>
        <Slidenav type="next" href="#" />
      </div>
    </Grid>
  ),
}

export const Large: Story = {
  render: () => (
    <Grid gap="small">
      <div>
        <Slidenav type="previous" large href="#" />
      </div>
      <div>
        <Slidenav type="next" large href="#" />
      </div>
    </Grid>
  ),
}

export const Container: Story = {
  render: () => (
    <SlidenavContainer>
      <Slidenav type="previous" href="#" />
      <Slidenav type="next" href="#" />
    </SlidenavContainer>
  ),
}

export const Overlay: Story = {
  render: () => (
    <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex={-1}>
      <img
        src="https://getuikit.com/docs/images/photo.jpg"
        width="1800"
        height="1200"
        alt=""
      />
      <Slidenav
        type="previous"
        large
        className="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
      />
      <Slidenav
        type="next"
        large
        className="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
      />
    </div>
  ),
}
