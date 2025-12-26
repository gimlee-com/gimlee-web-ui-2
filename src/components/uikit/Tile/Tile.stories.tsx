import type { Meta, StoryObj } from '@storybook/react'
import { Tile } from './Tile'
import { Grid } from '../Grid/Grid'
import { Card, CardBody } from '../Card/Card'
import { Panel } from '../Panel/Panel'

const meta: Meta<typeof Tile> = {
  title: 'UIkit/Tile',
  component: Tile,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tile>

export const Basic: Story = {
  render: () => (
    <Grid gap="collapse" className="uk-child-width-1-2@s uk-text-center">
      <div>
        <Tile variant="default">
          <p className="uk-h4">Default</p>
        </Tile>
      </div>
      <div>
        <Tile variant="muted">
          <p className="uk-h4">Muted</p>
        </Tile>
      </div>
      <div>
        <Tile variant="primary">
          <p className="uk-h4">Primary</p>
        </Tile>
      </div>
      <div>
        <Tile variant="secondary">
          <p className="uk-h4">Secondary</p>
        </Tile>
      </div>
    </Grid>
  ),
}

export const PreserveColor: Story = {
  render: () => (
    <Grid gap="collapse" match className="uk-child-width-1-2@s uk-text-center">
      <div>
        <Tile variant="primary" preserveColor>
          <Panel className="uk-light uk-margin-medium">
            <h3>Tile Primary with card</h3>
          </Panel>
          <Card variant="default">
            <CardBody>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </CardBody>
          </Card>
        </Tile>
      </div>
      <div>
        <Tile variant="secondary" preserveColor>
          <Panel className="uk-light uk-margin-medium">
            <h3>Tile Secondary with card</h3>
          </Panel>
          <Card variant="default">
            <CardBody>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </CardBody>
          </Card>
        </Tile>
      </div>
    </Grid>
  ),
}

export const Padding: Story = {
  render: () => (
    <Grid gap="small" className="uk-child-width-1-3@s uk-text-center">
      <div>
        <Tile variant="muted" padding="remove">
          <p className="uk-h4">Remove</p>
        </Tile>
      </div>
      <div>
        <Tile variant="primary" padding="small">
          <p className="uk-h4">Small</p>
        </Tile>
      </div>
      <div>
        <Tile variant="secondary" padding="large">
          <p className="uk-h4">Large</p>
        </Tile>
      </div>
    </Grid>
  ),
}
