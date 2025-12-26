import type { Meta, StoryObj } from '@storybook/react'
import { Panel } from '../../components/uikit/Panel/Panel'

const meta: Meta = {
  title: 'UIkit/Utility/Position',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export default meta
type Story = StoryObj

const PHOTO = 'https://getuikit.com/docs/images/photo.jpg'

export const Usage: Story = {
  render: () => (
    <Panel className="uk-padding">
      <div className="uk-inline">
        <img src={PHOTO} width="1800" height="1200" alt="" />
        <div className="uk-position-top uk-overlay uk-overlay-default uk-text-center">Top</div>
        <div className="uk-position-bottom uk-overlay uk-overlay-default uk-text-center">Bottom</div>
        <div className="uk-position-left uk-overlay uk-overlay-default uk-flex uk-flex-middle">Left</div>
        <div className="uk-position-right uk-overlay uk-overlay-default uk-flex uk-flex-middle">Right</div>
      </div>
    </Panel>
  ),
}

export const XYDirections: Story = {
  name: 'X and Y directions',
  render: () => (
    <Panel className="uk-padding">
      <div className="uk-inline">
        <img src={PHOTO} width="1800" height="1200" alt="" />
        <div className="uk-position-top-left uk-overlay uk-overlay-default">Top Left</div>
        <div className="uk-position-top-center uk-overlay uk-overlay-default">Top Center</div>
        <div className="uk-position-top-right uk-overlay uk-overlay-default">Top Right</div>
        <div className="uk-position-center-left uk-overlay uk-overlay-default">Center Left</div>
        <div className="uk-position-center uk-overlay uk-overlay-default">Center</div>
        <div className="uk-position-center-right uk-overlay uk-overlay-default">Center Right</div>
        <div className="uk-position-bottom-left uk-overlay uk-overlay-default">Bottom Left</div>
        <div className="uk-position-bottom-center uk-overlay uk-overlay-default">Bottom Center</div>
        <div className="uk-position-bottom-right uk-overlay uk-overlay-default">Bottom Right</div>
      </div>
    </Panel>
  ),
}

export const Center: Story = {
  render: () => (
    <Panel className="uk-padding">
      <div className="uk-inline">
        <img src={PHOTO} width="1800" height="1200" alt="" />
        <div className="uk-position-center-horizontal uk-overlay uk-overlay-default">Horizontal</div>
        <div className="uk-position-center-vertical uk-overlay uk-overlay-default">Vertical</div>
      </div>
    </Panel>
  ),
}

export const Cover: Story = {
  render: () => (
    <Panel className="uk-padding">
      <div className="uk-inline">
        <img src={PHOTO} width="1800" height="1200" alt="" />
        <div className="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">Cover</div>
      </div>
    </Panel>
  ),
}

export const Outside: Story = {
  render: () => (
    <Panel className="uk-padding uk-text-center">
      <div className="uk-inline-block uk-width-large">
        <img src={PHOTO} width="1800" height="1200" alt="" />
        <div className="uk-position-center-left-out uk-overlay uk-overlay-primary uk-visible@s">Out</div>
        <div className="uk-position-center-right-out uk-overlay uk-overlay-primary uk-visible@s">Out</div>
      </div>
    </Panel>
  ),
}

export const Modifiers: Story = {
  render: () => (
    <Panel className="uk-padding">
      <div className="uk-h3">Small</div>
      <div className="uk-inline uk-margin">
        <img src={PHOTO} width="1800" height="1200" alt="" />
        <div className="uk-position-small uk-position-top-left uk-overlay uk-overlay-default">Top Left</div>
        <div className="uk-position-small uk-position-bottom-right uk-overlay uk-overlay-default">Bottom Right</div>
      </div>

      <div className="uk-h3">Medium</div>
      <div className="uk-inline uk-margin">
        <img src={PHOTO} width="1800" height="1200" alt="" />
        <div className="uk-position-medium uk-position-top-left uk-overlay uk-overlay-default">Top Left</div>
        <div className="uk-position-medium uk-position-bottom-right uk-overlay uk-overlay-default">Bottom Right</div>
      </div>

      <div className="uk-h3">Large</div>
      <div className="uk-inline uk-margin">
        <img src={PHOTO} width="1800" height="1200" alt="" />
        <div className="uk-position-large uk-position-top-left uk-overlay uk-overlay-default">Top Left</div>
        <div className="uk-position-large uk-position-bottom-right uk-overlay uk-overlay-default">Bottom Right</div>
      </div>
    </Panel>
  ),
}

export const Utility: Story = {
  render: () => (
    <Panel className="uk-padding">
       <div className="uk-position-relative uk-background-muted uk-height-small uk-padding">
         Relative
         <div className="uk-position-absolute uk-position-bottom-right uk-background-primary uk-light uk-padding-small">
           Absolute
         </div>
       </div>
    </Panel>
  ),
}
