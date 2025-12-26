import type { Meta, StoryObj } from '@storybook/react'
import { Panel } from '../../components/uikit/Panel/Panel'

const meta: Meta = {
  title: 'UIkit/Layout/Align',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}
export default meta
type Story = StoryObj

export const Basic: Story = {
  render: () => (
    <Panel className="uk-padding">
      <Panel className="uk-margin">
        <img
          className="uk-align-left uk-margin-remove-adjacent"
          src="https://getuikit.com/docs/images/light.jpg"
          width="225"
          height="150"
          alt="Example image"
        />
        <p>
          <b>uk-align-left</b>. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </Panel>

      <Panel className="uk-margin">
        <img
          className="uk-align-right uk-margin-remove-adjacent"
          src="https://getuikit.com/docs/images/light.jpg"
          width="225"
          height="150"
          alt="Example image"
        />
        <p>
          <b>uk-align-right</b>. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </Panel>

      <Panel className="uk-margin">
        <img
          className="uk-align-center uk-margin-remove-adjacent"
          src="https://getuikit.com/docs/images/light.jpg"
          width="225"
          height="150"
          alt="Example image"
        />
        <p className="uk-text-center">
          <b>uk-align-center</b>. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Panel>
    </Panel>
  ),
}

export const Responsive: Story = {
  render: () => (
    <Panel className="uk-padding">
      <Panel>
        <img
          className="uk-align-center uk-align-right@m uk-margin-remove-adjacent"
          src="https://getuikit.com/docs/images/light.jpg"
          width="225"
          height="150"
          alt="Example image"
        />
        <p>
          <b>uk-align-center uk-align-right@m</b>. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </Panel>
    </Panel>
  ),
}
