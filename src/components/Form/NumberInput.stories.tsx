import type { Meta, StoryObj } from '@storybook/react'
import { NumberInput } from './NumberInput'
import { Form, Fieldset, Legend } from './Form'
import { useState } from 'react'

const meta: Meta<typeof NumberInput> = {
  title: 'Components/Form/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [undefined, 'success', 'danger'],
    },
    formWidth: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'],
    },
  },
}

export default meta
type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    formWidth: 'small',
  },
  render: (args) => {
    const [value, setValue] = useState(10)
    return (
      <NumberInput 
        {...args} 
        value={value} 
        onValueChange={setValue} 
      />
    )
  }
}

export const States: Story = {
  render: () => (
    <Form className="uk-width-medium">
      <Fieldset>
        <Legend>Number Input States</Legend>
        <div className="uk-margin">
          <label className="uk-form-label">Default</label>
          <div className="uk-form-controls">
            <NumberInput min={0} value={5} formWidth="small" />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Success</label>
          <div className="uk-form-controls">
            <NumberInput min={0} value={5} status="success" formWidth="small" />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Danger</label>
          <div className="uk-form-controls">
            <NumberInput min={0} value={5} status="danger" formWidth="small" />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Disabled</label>
          <div className="uk-form-controls">
            <NumberInput min={0} value={5} disabled formWidth="small" />
          </div>
        </div>
      </Fieldset>
    </Form>
  )
}

export const Widths: Story = {
  render: () => (
    <div className="uk-child-width-1-1 uk-grid-small" uk-grid="">
      <div>
        <label className="uk-form-label">xsmall (120px)</label>
        <NumberInput formWidth="xsmall" value={1} />
      </div>
      <div>
        <label className="uk-form-label">small (160px)</label>
        <NumberInput formWidth="small" value={1} />
      </div>
      <div>
        <label className="uk-form-label">medium (200px)</label>
        <NumberInput formWidth="medium" value={1} />
      </div>
      <div>
        <label className="uk-form-label">large (100%)</label>
        <NumberInput formWidth="large" value={1} />
      </div>
    </div>
  )
}
