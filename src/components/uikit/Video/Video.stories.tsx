import type { Meta, StoryObj } from '@storybook/react'
import { Video } from './Video'
import { Grid } from '../Grid/Grid'
import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'

const meta: Meta<typeof Video> = {
  title: 'UIkit/Video',
  component: Video,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Video>

const videoUrl = 'https://yootheme.com/site/images/media/yootheme-pro.mp4'

export const Basic: Story = {
  render: () => (
    <Video
      src={videoUrl}
      width="1920"
      height="1080"
      playsInline
      loop
      muted
    />
  ),
}

export const Autoplay: Story = {
  render: () => (
    <Grid gap="medium" className="uk-child-width-1-2@m">
      <div>
        <h4>Inview</h4>
        <Video
          autoplay="inview"
          src={videoUrl}
          width="1920"
          height="1080"
          playsInline
          loop
          muted
        />
      </div>
      <div>
        <h4>Hover</h4>
        <Video
          autoplay="hover"
          src={videoUrl}
          width="1920"
          height="1080"
          playsInline
          loop
          muted
        />
      </div>
    </Grid>
  ),
}

export const LazyLoading: Story = {
  render: () => (
    <Video
      preload="none"
      src={videoUrl}
      width="1920"
      height="1080"
      playsInline
      loop
      muted
    />
  ),
}

export const OnClickLoading: Story = {
  render: () => (
    <Video
      autoplay={false}
      preload="none"
      poster="https://getuikit.com/docs/images/photo.jpg"
      src={videoUrl}
      width="1920"
      height="1080"
      controls
    />
  ),
}

export const PlaceholderImage: Story = {
  render: () => (
    <div className="uk-inline uk-light">
      <Video
        src={videoUrl}
        width="1920"
        height="1080"
        controls
        preload="none"
        hidden
      />
      <a href="#" uk-toggle="target: ! > *">
        <img src="https://getuikit.com/docs/images/photo.jpg" width="1800" height="1200" alt="" />
        <Icon icon="youtube" ratio={3} className="uk-position-center" />
      </a>
    </div>
  ),
}
