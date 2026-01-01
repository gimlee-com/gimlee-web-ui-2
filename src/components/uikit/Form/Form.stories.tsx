import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../Grid/Grid.tsx'
import {
  Form,
  Fieldset,
  Legend,
  Input,
  Select,
  TextArea,
  Checkbox,
  Radio,
  Range,
} from './Form.tsx'

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
    <Form>
      <Fieldset>
        <Legend>Legend</Legend>

        <div className="uk-margin">
          <Input type="text" placeholder="Input" aria-label="Input" />
        </div>

        <div className="uk-margin">
          <Select aria-label="Select">
            <option>Option 01</option>
            <option>Option 02</option>
          </Select>
        </div>

        <div className="uk-margin">
          <TextArea rows={5} placeholder="Textarea" aria-label="Textarea" />
        </div>

        <div className="uk-margin">
          <Grid gap="small" className="uk-child-width-auto">
            <label>
              <Radio name="radio2" defaultChecked /> A
            </label>
            <label>
              <Radio name="radio2" /> B
            </label>
          </Grid>
        </div>

        <div className="uk-margin">
          <Grid gap="small" className="uk-child-width-auto">
            <label>
              <Checkbox defaultChecked /> A
            </label>
            <label>
              <Checkbox /> B
            </label>
          </Grid>
        </div>

        <div className="uk-margin">
          <Range
            defaultValue="2"
            min="0"
            max="10"
            step="0.1"
            aria-label="Range"
          />
        </div>
      </Fieldset>
    </Form>
  ),
}

export const States: Story = {
  render: () => (
    <Form>
      <div className="uk-margin">
        <Input
          status="danger"
          className="uk-form-width-medium"
          type="text"
          placeholder="form-danger"
          aria-label="form-danger"
          defaultValue="form-danger"
        />
      </div>
      <div className="uk-margin">
        <Input
          status="success"
          className="uk-form-width-medium"
          type="text"
          placeholder="form-success"
          aria-label="form-success"
          defaultValue="form-success"
        />
      </div>
      <div className="uk-margin">
        <Input
          className="uk-form-width-medium"
          type="text"
          placeholder="disabled"
          aria-label="disabled"
          defaultValue="disabled"
          disabled
        />
      </div>
    </Form>
  ),
}
