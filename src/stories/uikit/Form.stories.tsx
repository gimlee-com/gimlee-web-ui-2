import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../../components/uikit/Grid/Grid'
import { Button } from '../../components/uikit/Button/Button'
import { Icon } from '../../components/uikit/Icon/Icon'

const meta: Meta = {
  title: 'UIkit/Form',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export default meta
type Story = StoryObj

export const Basic: Story = {
  render: () => (
    <form>
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">Legend</legend>
        
        <div className="uk-margin">
          <input className="uk-input" type="text" placeholder="Input" aria-label="Input" />
        </div>

        <div className="uk-margin">
          <select className="uk-select" aria-label="Select">
            <option>Option 01</option>
            <option>Option 02</option>
          </select>
        </div>

        <div className="uk-margin">
          <textarea className="uk-textarea" rows={5} placeholder="Textarea" aria-label="Textarea"></textarea>
        </div>

        <div className="uk-margin">
          <Grid gap="small" className="uk-child-width-auto">
            <label><input className="uk-radio" type="radio" name="radio2" defaultChecked /> A</label>
            <label><input className="uk-radio" type="radio" name="radio2" /> B</label>
          </Grid>
        </div>

        <div className="uk-margin">
          <Grid gap="small" className="uk-child-width-auto">
            <label><input className="uk-checkbox" type="checkbox" defaultChecked /> A</label>
            <label><input className="uk-checkbox" type="checkbox" /> B</label>
          </Grid>
        </div>

        <div className="uk-margin">
          <input className="uk-range" type="range" defaultValue="2" min="0" max="10" step="0.1" aria-label="Range" />
        </div>
      </fieldset>
    </form>
  ),
}

export const States: Story = {
  render: () => (
    <form>
      <div className="uk-margin">
        <input className="uk-input uk-form-danger uk-form-width-medium" type="text" placeholder="form-danger" aria-label="form-danger" defaultValue="form-danger" />
      </div>
      <div className="uk-margin">
        <input className="uk-input uk-form-success uk-form-width-medium" type="text" placeholder="form-success" aria-label="form-success" defaultValue="form-success" />
      </div>
      <div className="uk-margin">
        <input className="uk-input uk-form-width-medium" type="text" placeholder="disabled" aria-label="disabled" defaultValue="disabled" disabled />
      </div>
    </form>
  ),
}

export const LayoutStacked: Story = {
  name: 'Layout Stacked',
  render: () => (
    <form className="uk-form-stacked">
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-stacked-text">Text</label>
        <div className="uk-form-controls">
          <input className="uk-input" id="form-stacked-text" type="text" placeholder="Some text..." />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-stacked-select">Select</label>
        <div className="uk-form-controls">
          <select className="uk-select" id="form-stacked-select">
            <option>Option 01</option>
            <option>Option 02</option>
          </select>
        </div>
      </div>
    </form>
  ),
}

export const LayoutHorizontal: Story = {
  name: 'Layout Horizontal',
  render: () => (
    <form className="uk-form-horizontal uk-margin-large">
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-text">Text</label>
        <div className="uk-form-controls">
          <input className="uk-input" id="form-horizontal-text" type="text" placeholder="Some text..." />
        </div>
      </div>
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-select">Select</label>
        <div className="uk-form-controls">
          <select className="uk-select" id="form-horizontal-select">
            <option>Option 01</option>
            <option>Option 02</option>
          </select>
        </div>
      </div>
    </form>
  ),
}

export const Icons: Story = {
  render: () => (
    <form>
      <div className="uk-margin">
        <div className="uk-inline">
          <span className="uk-form-icon"><Icon icon="user" /></span>
          <input className="uk-input" type="text" aria-label="Not clickable icon" />
        </div>
      </div>
      <div className="uk-margin">
        <div className="uk-inline">
          <a className="uk-form-icon uk-form-icon-flip" href="#"><Icon icon="link" /></a>
          <input className="uk-input" type="text" aria-label="Clickable icon" />
        </div>
      </div>
    </form>
  ),
}

export const CustomControls: Story = {
  name: 'Custom Controls',
  render: () => (
    <form>
      <div className="uk-margin">
        <div uk-form-custom="">
          <input type="file" aria-label="Custom controls" />
          <Button type="button" tabIndex={-1}>Select</Button>
        </div>
      </div>
      <div className="uk-margin">
        <div uk-form-custom="target: true">
          <select aria-label="Custom controls">
            <option value="1">Option 01</option>
            <option value="2">Option 02</option>
            <option value="3">Option 03</option>
          </select>
          <span></span>
        </div>
      </div>
    </form>
  ),
}
