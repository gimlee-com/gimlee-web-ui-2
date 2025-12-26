import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'UIkit/Flex',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}
export default meta
type Story = StoryObj

export const Usage: Story = {
  render: () => (
    <div className="uk-flex uk-padding">
      <div className="uk-card uk-card-default uk-card-body">Item 1</div>
      <div className="uk-card uk-card-default uk-card-body uk-margin-left">Item 2</div>
      <div className="uk-card uk-card-default uk-card-body uk-margin-left">Item 3</div>
    </div>
  ),
}

export const HorizontalAlignment: Story = {
  name: 'Horizontal Alignment',
  render: () => (
    <div className="uk-padding" uk-margin="">
      <h4>Center</h4>
      <div className="uk-flex uk-flex-center">
        <div className="uk-card uk-card-default uk-card-body">Item 1</div>
        <div className="uk-card uk-card-default uk-card-body uk-margin-left">Item 2</div>
        <div className="uk-card uk-card-default uk-card-body uk-margin-left">Item 3</div>
      </div>
      <h4>Between</h4>
      <div className="uk-flex uk-flex-between">
        <div className="uk-card uk-card-default uk-card-body">Item 1</div>
        <div className="uk-card uk-card-default uk-card-body">Item 2</div>
        <div className="uk-card uk-card-default uk-card-body">Item 3</div>
      </div>
    </div>
  ),
}

export const VerticalAlignment: Story = {
  name: 'Vertical Alignment',
  render: () => (
    <div className="uk-flex uk-flex-middle uk-text-center uk-padding">
      <div className="uk-card uk-card-default uk-card-body">Item 1</div>
      <div className="uk-card uk-card-default uk-card-body uk-margin-left">
        Item 2<br />...
      </div>
      <div className="uk-card uk-card-default uk-card-body uk-margin-left">
        Item 3<br />...<br />...
      </div>
    </div>
  ),
}

export const Direction: Story = {
  render: () => (
    <div className="uk-flex uk-flex-column uk-width-1-3 uk-padding">
      <div className="uk-card uk-card-default uk-card-body">Item 1</div>
      <div className="uk-card uk-card-default uk-card-body uk-margin-top">Item 2</div>
      <div className="uk-card uk-card-default uk-card-body uk-margin-top">Item 3</div>
    </div>
  ),
}

export const Wrap: Story = {
  render: () => (
    <div className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-background-muted uk-height-medium uk-padding">
      <div className="uk-width-1-3 uk-card uk-card-default uk-card-body uk-card-small">Item 1</div>
      <div className="uk-width-1-2 uk-card uk-card-default uk-card-body uk-card-small uk-margin-left">Item 2</div>
      <div className="uk-width-1-3 uk-card uk-card-default uk-card-body uk-card-small">Item 3</div>
      <div className="uk-width-1-3 uk-card uk-card-default uk-card-body uk-card-small uk-margin-left">Item 4</div>
      <div className="uk-width-1-2 uk-card uk-card-default uk-card-body uk-card-small">Item 5</div>
      <div className="uk-width-1-3 uk-card uk-card-default uk-card-body uk-card-small uk-margin-left">Item 6</div>
    </div>
  ),
}
