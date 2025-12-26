import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'UIkit/Effects/Slideshow Parallax',
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <div
      className="uk-position-relative uk-visible-toggle uk-light"
      tabIndex={-1}
      uk-slideshow="animation: push"
    >
      <ul className="uk-slideshow-items">
        <li>
          <img
            src="https://getuikit.com/docs/images/photo.jpg"
            alt=""
            uk-cover=""
          />
          <div className="uk-position-center uk-position-small uk-text-center">
            <h2 uk-slideshow-parallax="x: 100,-100">Heading</h2>
            <p uk-slideshow-parallax="x: 200,-200">Lorem ipsum dolor sit amet.</p>
          </div>
        </li>
        <li>
          <img
            src="https://getuikit.com/docs/images/dark.jpg"
            alt=""
            uk-cover=""
          />
          <div className="uk-position-center uk-position-small uk-text-center">
            <h2 uk-slideshow-parallax="x: 100,-100">Heading</h2>
            <p uk-slideshow-parallax="x: 200,-200">Lorem ipsum dolor sit amet.</p>
          </div>
        </li>
      </ul>

      <a
        className="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-previous=""
        uk-slideshow-item="previous"
      ></a>
      <a
        className="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-next=""
        uk-slideshow-item="next"
      ></a>
    </div>
  ),
  name: 'Slideshow Parallax',
}