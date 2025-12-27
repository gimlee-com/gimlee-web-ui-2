import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../Grid/Grid.tsx'
import { Button } from '../Button/Button.tsx'
import { Icon } from '../Icon/Icon.tsx'
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
  FormLabel,
  FormControls,
  FormError,
  FormCustom,
  FormIcon,
  FormInputContainer,
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

export const LayoutStacked: Story = {
  name: 'Layout Stacked',
  render: () => (
    <Form layout="stacked">
      <div className="uk-margin">
        <FormLabel htmlFor="form-stacked-text">Text</FormLabel>
        <FormControls>
          <Input id="form-stacked-text" type="text" placeholder="Some text..." />
        </FormControls>
      </div>
      <div className="uk-margin">
        <FormLabel htmlFor="form-stacked-select">Select</FormLabel>
        <FormControls>
          <Select id="form-stacked-select">
            <option>Option 01</option>
            <option>Option 02</option>
          </Select>
        </FormControls>
      </div>
    </Form>
  ),
}

export const LayoutHorizontal: Story = {
  name: 'Layout Horizontal',
  render: () => (
    <Form layout="horizontal" className="uk-margin-large">
      <div className="uk-margin">
        <FormLabel htmlFor="form-horizontal-text">Text</FormLabel>
        <FormControls>
          <Input
            id="form-horizontal-text"
            type="text"
            placeholder="Some text..."
          />
        </FormControls>
      </div>
      <div className="uk-margin">
        <FormLabel htmlFor="form-horizontal-select">Select</FormLabel>
        <FormControls>
          <Select id="form-horizontal-select">
            <option>Option 01</option>
            <option>Option 02</option>
          </Select>
        </FormControls>
      </div>
    </Form>
  ),
}

export const Icons: Story = {
  render: () => (
    <Form>
      <div className="uk-margin">
        <FormInputContainer>
          <FormIcon icon="user" />
          <Input type="text" aria-label="Not clickable icon" />
        </FormInputContainer>
      </div>
      <div className="uk-margin">
        <FormInputContainer>
          <FormIcon flip icon="link" tag="a" href="#" />
          <Input type="text" aria-label="Clickable icon" />
        </FormInputContainer>
      </div>
    </Form>
  ),
}

export const CustomControls: Story = {
  name: 'Custom Controls',
  render: () => (
    <Form>
      <div className="uk-margin">
        <FormCustom>
          <input type="file" aria-label="Custom controls" />
          <Button type="button" tabIndex={-1}>
            Select
          </Button>
        </FormCustom>
      </div>
      <div className="uk-margin">
        <FormCustom target={true}>
          <Select aria-label="Custom controls">
            <option value="1">Option 01</option>
            <option value="2">Option 02</option>
            <option value="3">Option 03</option>
          </Select>
          <span></span>
        </FormCustom>
      </div>
    </Form>
  ),
}

export const Validation: Story = {
  render: () => (
    <Form layout="stacked">
      <div className="uk-margin">
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControls>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            defaultValue="invalid-email"
            status="danger"
          />
          <FormError>Please enter a valid email address.</FormError>
        </FormControls>
      </div>

      <div className="uk-margin">
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormControls>
          <Input
            id="password"
            type="password"
            defaultValue="12345"
            status="danger"
          />
          <FormError>Password is too short.</FormError>
        </FormControls>
      </div>

      <div className="uk-margin">
        <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
        <FormControls>
          <Input
            id="confirm-password"
            type="password"
            defaultValue="54321"
            status="danger"
          />
          <FormError>Passwords do not match.</FormError>
        </FormControls>
      </div>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  ),
}
