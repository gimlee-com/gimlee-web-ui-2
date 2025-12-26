import type { Meta, StoryObj } from '@storybook/react'
import { Panel } from './Panel'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof Panel> = {
  title: 'UIkit/Panel',
  component: Panel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Panel>

export const Basic: Story = {
  render: () => (
    <Grid match className="uk-child-width-1-3@s">
      <div>
        <Panel>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Panel>
      </div>
      <div>
        <Panel>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Panel>
      </div>
      <div>
        <Panel>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Panel>
      </div>
    </Grid>
  ),
}

export const Scrollable: Story = {
  args: {
    scrollable: true,
  },
  render: (args) => (
    <Panel {...args} className="uk-height-small">
      <ul className="uk-list">
        <li>
          <label>
            <input className="uk-checkbox" type="checkbox" /> Category 1
          </label>
        </li>
        <li>
          <label>
            <input className="uk-checkbox" type="checkbox" /> Category 2
          </label>
          <ul>
            <li>
              <label>
                <input className="uk-checkbox" type="checkbox" /> Category 2.1
              </label>
            </li>
            <li>
              <label>
                <input className="uk-checkbox" type="checkbox" /> Category 2.2
              </label>
            </li>
            <li>
              <label>
                <input className="uk-checkbox" type="checkbox" /> Category 2.3
              </label>
              <ul>
                <li>
                  <label>
                    <input className="uk-checkbox" type="checkbox" /> Category
                    2.3.1
                  </label>
                </li>
                <li>
                  <label>
                    <input className="uk-checkbox" type="checkbox" /> Category
                    2.3.2
                  </label>
                </li>
              </ul>
            </li>
            <li>
              <label>
                <input className="uk-checkbox" type="checkbox" /> Category 2.4
              </label>
            </li>
          </ul>
        </li>
        <li>
          <label>
            <input className="uk-checkbox" type="checkbox" /> Category 3
          </label>
        </li>
        <li>
          <label>
            <input className="uk-checkbox" type="checkbox" /> Category 4
          </label>
        </li>
      </ul>
    </Panel>
  ),
}
