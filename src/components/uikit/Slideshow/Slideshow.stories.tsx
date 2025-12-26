import type { Meta, StoryObj } from '@storybook/react'
import { Slideshow, SlideshowItems, SlideshowItem } from './Slideshow'
import { Slidenav } from '../Slidenav/Slidenav'

const meta: Meta<typeof Slideshow> = {
  title: 'UIkit/Slideshow',
  component: Slideshow,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slideshow>

export const Basic: Story = {
  render: (args) => (
    <Slideshow
      className="uk-position-relative uk-visible-toggle uk-light"
      tabIndex={-1}
      {...args}
    >
      <SlideshowItems>
        <SlideshowItem>
          <img
            src="https://getuikit.com/docs/images/photo.jpg"
            alt=""
            uk-cover=""
          />
        </SlideshowItem>
        <SlideshowItem>
          <img
            src="https://getuikit.com/docs/images/dark.jpg"
            alt=""
            uk-cover=""
          />
        </SlideshowItem>
        <SlideshowItem>
          <img
            src="https://getuikit.com/docs/images/light.jpg"
            alt=""
            uk-cover=""
          />
        </SlideshowItem>
      </SlideshowItems>

      <Slidenav
        type="previous"
        className="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
        uk-slideshow-item="previous"
      />
      <Slidenav
        type="next"
        className="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
        uk-slideshow-item="next"
      />
    </Slideshow>
  ),
}

export const Animations: Story = {
  args: {
    animation: 'fade',
  },
  render: (args) => (
    <Slideshow
      className="uk-position-relative uk-visible-toggle uk-light"
      tabIndex={-1}
      {...args}
    >
      <SlideshowItems>
        <SlideshowItem>
          <img
            src="https://getuikit.com/docs/images/photo.jpg"
            alt=""
            uk-cover=""
          />
        </SlideshowItem>
        <SlideshowItem>
          <img
            src="https://getuikit.com/docs/images/dark.jpg"
            alt=""
            uk-cover=""
          />
        </SlideshowItem>
        <SlideshowItem>
          <img
            src="https://getuikit.com/docs/images/light.jpg"
            alt=""
            uk-cover=""
          />
        </SlideshowItem>
      </SlideshowItems>

      <Slidenav
        type="previous"
        className="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
        uk-slideshow-item="previous"
      />
      <Slidenav
        type="next"
        className="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
        uk-slideshow-item="next"
      />
    </Slideshow>
  ),
}
