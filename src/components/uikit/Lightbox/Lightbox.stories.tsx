import type { Meta, StoryObj } from '@storybook/react'
import { Lightbox, LightboxItem } from './Lightbox'

const meta: Meta<typeof Lightbox> = {
  title: 'UIkit/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Lightbox>

const IMAGES = {
  photo: 'https://getuikit.com/docs/images/photo.jpg',
  dark: 'https://getuikit.com/docs/images/dark.jpg',
  light: 'https://getuikit.com/docs/images/light.jpg',
}

export const Usage: Story = {
  render: () => (
    <Lightbox>
      <LightboxItem className="uk-button uk-button-default" href={IMAGES.photo}>
        Open Lightbox
      </LightboxItem>
    </Lightbox>
  ),
}

export const AltAttribute: Story = {
  name: 'Alt attribute',
  render: () => (
    <Lightbox>
      <LightboxItem className="uk-button uk-button-default" href={IMAGES.photo} alt="Image">
        Open Lightbox
      </LightboxItem>
    </Lightbox>
  ),
}

export const Caption: Story = {
  render: () => (
    <Lightbox>
      <LightboxItem className="uk-button uk-button-default" href={IMAGES.photo} caption="Caption">
        Open Lightbox
      </LightboxItem>
    </Lightbox>
  ),
}

export const Animations: Story = {
  render: () => (
    <div>
      <div className="uk-h3">Slide</div>
      <Lightbox animation="slide" className="uk-child-width-1-3@m" uk-grid="">
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.photo} caption="Caption 1">
            <img src={IMAGES.photo} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.dark} caption="Caption 2">
            <img src={IMAGES.dark} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.light} caption="Caption 3">
            <img src={IMAGES.light} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
      </Lightbox>

      <div className="uk-h3 uk-margin-large-top">Fade</div>
      <Lightbox animation="fade" className="uk-child-width-1-3@m" uk-grid="">
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.photo} caption="Caption 1">
            <img src={IMAGES.photo} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.dark} caption="Caption 2">
            <img src={IMAGES.dark} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.light} caption="Caption 3">
            <img src={IMAGES.light} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
      </Lightbox>

      <div className="uk-h3 uk-margin-large-top">Scale</div>
      <Lightbox animation="scale" className="uk-child-width-1-3@m" uk-grid="">
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.photo} caption="Caption 1">
            <img src={IMAGES.photo} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.dark} caption="Caption 2">
            <img src={IMAGES.dark} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.light} caption="Caption 3">
            <img src={IMAGES.light} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
      </Lightbox>
    </div>
  ),
}

export const Navigations: Story = {
  render: () => (
    <div>
      <div className="uk-h3">Thumbnav</div>
      <Lightbox nav="thumbnav" slidenav={false} className="uk-child-width-1-3@m" uk-grid="">
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.photo} caption="Caption 1">
            <img src={IMAGES.photo} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.dark} caption="Caption 2">
            <img src={IMAGES.dark} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.light} caption="Caption 3">
            <img src={IMAGES.light} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
      </Lightbox>

      <div className="uk-h3 uk-margin-large-top">Dotnav</div>
      <Lightbox nav="dotnav" slidenav={false} className="uk-child-width-1-3@m" uk-grid="">
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.photo} caption="Caption 1">
            <img src={IMAGES.photo} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.dark} caption="Caption 2">
            <img src={IMAGES.dark} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem className="uk-inline" href={IMAGES.light} caption="Caption 3">
            <img src={IMAGES.light} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
      </Lightbox>
    </div>
  ),
}

export const Counter: Story = {
  render: () => (
    <Lightbox counter className="uk-child-width-1-3@m" uk-grid="">
      <div>
        <LightboxItem className="uk-inline" href={IMAGES.photo} caption="Caption 1">
          <img src={IMAGES.photo} width="1800" height="1200" alt="" />
        </LightboxItem>
      </div>
      <div>
        <LightboxItem className="uk-inline" href={IMAGES.dark} caption="Caption 2">
          <img src={IMAGES.dark} width="1800" height="1200" alt="" />
        </LightboxItem>
      </div>
      <div>
        <LightboxItem className="uk-inline" href={IMAGES.light} caption="Caption 3">
          <img src={IMAGES.light} width="1800" height="1200" alt="" />
        </LightboxItem>
      </div>
    </Lightbox>
  ),
}

export const ContentSources: Story = {
  name: 'Content sources',
  render: () => (
    <Lightbox className="uk-margin" uk-margin="">
      <LightboxItem className="uk-button uk-button-default" href={IMAGES.photo} caption="Image">
        Image
      </LightboxItem>
      <LightboxItem
        className="uk-button uk-button-default"
        href="https://yootheme.com/site/images/media/yootheme-pro.mp4"
        caption="Video"
      >
        Video
      </LightboxItem>
      <LightboxItem
        className="uk-button uk-button-default"
        href="https://www.youtube.com/watch?v=c2pz2mlSfXA"
        caption="YouTube"
      >
        YouTube
      </LightboxItem>
      <LightboxItem
        className="uk-button uk-button-default"
        href="https://vimeo.com/1084537"
        caption="Vimeo"
      >
        Vimeo
      </LightboxItem>
      <LightboxItem
        className="uk-button uk-button-default"
        href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4740.819266853735!2d9.99008871708242!3d53.550454675412404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3f9d24afe84a0263!2sRathaus!5e0!3m2!1sde!2sde!4v1499675200938"
        caption="Google Maps"
        type="iframe"
      >
        Google Maps
      </LightboxItem>
    </Lightbox>
  ),
}

export const DelayControls: Story = {
  name: 'Delay controls',
  render: () => (
    <Lightbox delayControls={0}>
      <LightboxItem className="uk-button uk-button-default" href={IMAGES.photo} caption="Caption">
        Open Lightbox
      </LightboxItem>
    </Lightbox>
  ),
}

export const BgClose: Story = {
  name: 'BG close',
  render: () => (
    <Lightbox bgClose={false}>
      <LightboxItem className="uk-button uk-button-default" href={IMAGES.photo} caption="Caption">
        Open Lightbox
      </LightboxItem>
    </Lightbox>
  ),
}

export const CustomTemplate: Story = {
  name: 'Custom template',
  render: () => (
    <>
      <template
        id="js-lightbox-template"
        dangerouslySetInnerHTML={{
          __html: `
            <div class="uk-lightbox uk-overflow-hidden">
                <div class="uk-lightbox-items"></div>
                <div class="uk-position-top-right uk-position-small uk-transition-fade" uk-inverse>
                    <button class="uk-lightbox-close uk-close-large" type="button" uk-close></button>
                </div>
                <div class="uk-position-bottom uk-position-medium uk-text-center uk-transition-fade" uk-inverse>
                    <div class="uk-grid-small uk-width-auto uk-flex-inline uk-flex-middle" uk-grid>
                        <div><a class="uk-lightbox-slidenav" href uk-slidenav-previous uk-lightbox-item="previous"></a></div>
                        <div><div class="uk-lightbox-counter"></div></div>
                        <div><a class="uk-lightbox-slidenav" href uk-slidenav-next uk-lightbox-item="next"></a></div>
                    </div>
                </div>
            </div>
          `,
        }}
      />

      <Lightbox
        template="#js-lightbox-template"
        counter
        className="uk-child-width-1-3@m"
        uk-grid=""
      >
        <div>
          <LightboxItem
            className="uk-inline"
            href={IMAGES.photo}
            caption="Caption 1"
          >
            <img src={IMAGES.photo} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem
            className="uk-inline"
            href={IMAGES.dark}
            caption="Caption 2"
          >
            <img src={IMAGES.dark} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
        <div>
          <LightboxItem
            className="uk-inline"
            href={IMAGES.light}
            caption="Caption 3"
          >
            <img src={IMAGES.light} width="1800" height="1200" alt="" />
          </LightboxItem>
        </div>
      </Lightbox>
    </>
  ),
}
