import type { Meta, StoryObj } from '@storybook/react'
import { Cover, CoverContainer } from './Cover'

const meta: Meta<typeof Cover> = {
  title: 'UIkit/Cover',
  component: Cover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Cover>

export const Basic: Story = {
  render: () => (
    <CoverContainer className="uk-height-medium">
      <Cover src="https://getuikit.com/docs/images/dark.jpg" alt="Example image" />
    </CoverContainer>
  ),
}

export const Video: Story = {
  render: () => (
    <CoverContainer className="uk-height-medium">
      <Cover
        tag="video"
        src="https://yootheme.com/site/images/media/yootheme-pro.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </CoverContainer>
  ),
}

export const Iframe: Story = {
  render: () => (
    <CoverContainer className="uk-height-medium">
      <Cover
        tag="iframe"
        src="https://www.youtube-nocookie.com/embed/c2pz2mlSfXA?playsinline=1&rel=0&controls=0&loop=1"
        width={1920}
        height={1080}
        allowFullScreen
      />
    </CoverContainer>
  ),
}

export const ResponsiveHeight: Story = {
  render: () => (
    <CoverContainer>
      <canvas width="400" height="200" />
      <Cover src="https://getuikit.com/docs/images/dark.jpg" alt="Example image" />
    </CoverContainer>
  ),
}
