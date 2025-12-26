import type { Meta, StoryObj } from '@storybook/react'
import { Slider, SliderItems, SliderItem, SliderContainer, SliderNav } from './Slider'
import { Slidenav } from '../Slidenav/Slidenav'
import { Card, CardBody, CardTitle, CardMedia } from '../Card/Card'
import { Panel } from '../Panel/Panel'

const meta: Meta<typeof Slider> = {
  title: 'UIkit/Slider',
  component: Slider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slider>

const sliderImages = [
  'https://getuikit.com/docs/images/slider1.jpg',
  'https://getuikit.com/docs/images/slider2.jpg',
  'https://getuikit.com/docs/images/slider3.jpg',
  'https://getuikit.com/docs/images/slider4.jpg',
  'https://getuikit.com/docs/images/slider5.jpg',
]

export const Basic: Story = {
  render: () => (
    <Slider className="uk-position-relative uk-visible-toggle uk-light" tabIndex={-1}>
      <SliderItems className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m">
        {sliderImages.map((src, i) => (
          <SliderItem key={i}>
            <img src={src} width="400" height="600" alt="" />
            <div className="uk-position-center uk-panel"><h1>{i + 1}</h1></div>
          </SliderItem>
        ))}
      </SliderItems>
      <Slidenav type="previous" className="uk-position-center-left uk-position-small uk-hidden-hover" uk-slider-item="previous" />
      <Slidenav type="next" className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slider-item="next" />
    </Slider>
  ),
}

export const Center: Story = {
  render: () => (
    <Slider center className="uk-position-relative uk-visible-toggle uk-light" tabIndex={-1}>
      <SliderItems className="uk-grid">
        {sliderImages.map((src, i) => (
          <SliderItem key={i} className="uk-width-3-4">
            <Panel>
              <img src={src} width="600" height="400" alt="" />
              <div className="uk-position-center uk-panel"><h1>{i + 1}</h1></div>
            </Panel>
          </SliderItem>
        ))}
      </SliderItems>
      <Slidenav type="previous" className="uk-position-center-left uk-position-small uk-hidden-hover" uk-slider-item="previous" />
      <Slidenav type="next" className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slider-item="next" />
    </Slider>
  ),
}

export const WithGap: Story = {
  render: () => (
    <Slider className="uk-position-relative uk-visible-toggle uk-light" tabIndex={-1}>
      <SliderItems className="uk-child-width-1-2 uk-child-width-1-3@m uk-grid">
        {sliderImages.map((src, i) => (
          <SliderItem key={i}>
            <Panel>
              <img src={src} width="400" height="600" alt="" />
              <div className="uk-position-center uk-panel"><h1>{i + 1}</h1></div>
            </Panel>
          </SliderItem>
        ))}
      </SliderItems>
      <Slidenav type="previous" className="uk-position-center-left uk-position-small uk-hidden-hover" uk-slider-item="previous" />
      <Slidenav type="next" className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slider-item="next" />
    </Slider>
  ),
}

export const WithNav: Story = {
  render: () => (
    <Slider>
      <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex={-1}>
        <SliderItems className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m">
          {sliderImages.map((src, i) => (
            <SliderItem key={i}>
              <img src={src} width="400" height="600" alt="" />
              <div className="uk-position-center uk-panel"><h1>{i + 1}</h1></div>
            </SliderItem>
          ))}
        </SliderItems>
        <Slidenav type="previous" className="uk-position-center-left uk-position-small uk-hidden-hover" uk-slider-item="previous" />
        <Slidenav type="next" className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slider-item="next" />
      </div>
      <SliderNav className="uk-dotnav uk-flex-center uk-margin" />
    </Slider>
  ),
}

export const Cards: Story = {
  render: () => (
    <SliderContainer offset>
      <Slider className="uk-position-relative uk-visible-toggle uk-light" tabIndex={-1}>
        <SliderItems className="uk-child-width-1-2@s uk-grid">
          {[1, 2, 3, 4, 5].map((n) => (
            <SliderItem key={n}>
              <Card variant="default">
                <CardMedia position="top">
                  <img src={`https://getuikit.com/docs/images/slider${n}.jpg`} width="1800" height="1200" alt="" />
                </CardMedia>
                <CardBody>
                  <CardTitle>Headline {n}</CardTitle>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                </CardBody>
              </Card>
            </SliderItem>
          ))}
        </SliderItems>
        <Slidenav type="previous" className="uk-position-center-left uk-position-small uk-hidden-hover" uk-slider-item="previous" />
        <Slidenav type="next" className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slider-item="next" />
        <SliderNav className="uk-dotnav uk-flex-center uk-margin" />
      </Slider>
    </SliderContainer>
  ),
}
