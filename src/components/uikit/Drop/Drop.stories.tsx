import type { Meta, StoryObj } from '@storybook/react'
import { Drop, DropParentIcon } from './Drop'
import { Button } from '../Button/Button'
import { Card, CardBody } from '../Card/Card'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof Drop> = {
  title: 'UIkit/Drop',
  component: Drop,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Drop>

export const Basic: Story = {
  render: () => (
    <div className="uk-inline">
      <Button type="button">Hover, Click</Button>
      <Drop>
        <Card variant="default" className="uk-card-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </Card>
      </Drop>
    </div>
  ),
}

export const Mode: Story = {
  render: () => (
    <Grid gap="small">
      <div>
        <div className="uk-inline">
          <Button type="button">Hover</Button>
          <Drop mode="hover">
            <Card variant="default" className="uk-card-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </Card>
          </Drop>
        </div>
      </div>
      <div>
        <div className="uk-inline">
          <Button type="button">Click</Button>
          <Drop mode="click">
            <Card variant="default" className="uk-card-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </Card>
          </Drop>
        </div>
      </div>
    </Grid>
  ),
}

export const ParentIcon: Story = {
  render: () => (
    <div className="uk-inline">
      <Button type="button">Parent <DropParentIcon /></Button>
      <Drop mode="click">
        <Card variant="default" className="uk-card-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </Card>
      </Drop>
    </div>
  ),
}

export const Position: Story = {
  render: () => (
    <Grid gap="small">
      <div>
        <div className="uk-inline">
          <Button type="button">Top Right</Button>
          <Drop pos="top-right">
            <Card variant="default" className="uk-card-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Card>
          </Drop>
        </div>
      </div>
      <div>
        <div className="uk-inline">
          <Button type="button">Bottom Center</Button>
          <Drop pos="bottom-center">
            <Card variant="default" className="uk-card-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Card>
          </Drop>
        </div>
      </div>
      <div>
        <div className="uk-inline">
          <Button type="button">Right Top</Button>
          <Drop pos="right-top">
            <Card variant="default" className="uk-card-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Card>
          </Drop>
        </div>
      </div>
    </Grid>
  ),
}

export const Animation: Story = {
  render: () => (
    <div className="uk-inline">
      <Button type="button">Animation</Button>
      <Drop animation="slide-top" animateOut duration={700}>
        <Card variant="default" className="uk-card-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Card>
      </Drop>
    </div>
  ),
}
