import type { Meta, StoryObj } from '@storybook/react'
import { Slidenav } from '../../../components/uikit/Slidenav/Slidenav'
import {
  Slideshow,
  SlideshowItem,
  SlideshowItems,
} from '../../../components/uikit/Slideshow/Slideshow'

const meta: Meta = {
  title: 'UIkit/Effects/Slideshow Parallax',
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <Slideshow
      className="uk-position-relative uk-visible-toggle uk-light"
      tabIndex={-1}
      animation="push"
    >
      <SlideshowItems>
        <SlideshowItem>
          <img
            src="https://getuikit.com/docs/images/photo.jpg"
            alt=""
            uk-cover=""
          />
          <div className="uk-position-center uk-position-small uk-text-center">
            <h2 uk-slideshow-parallax="x: 100,-100">Heading</h2>
            <p uk-slideshow-parallax="x: 200,-200">Lorem ipsum dolor sit amet.</p>
          </div>
        </SlideshowItem>
        <SlideshowItem>
          <img
            src="https://getuikit.com/docs/images/dark.jpg"
            alt=""
            uk-cover=""
          />
          <div className="uk-position-center uk-position-small uk-text-center">
            <h2 uk-slideshow-parallax="x: 100,-100">Heading</h2>
            <p uk-slideshow-parallax="x: 200,-200">Lorem ipsum dolor sit amet.</p>
          </div>
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
  name: 'Slideshow Parallax',
}