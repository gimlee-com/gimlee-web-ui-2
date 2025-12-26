import type { Meta, StoryObj } from '@storybook/react'
import { List, ListItem } from './List'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof List> = {
  title: 'UIkit/List',
  component: List,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof List>

export const Basic: Story = {
  render: () => (
    <List>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
  ),
}

export const StyleModifiers: Story = {
  render: () => (
    <Grid gap="small" className="uk-child-width-expand@s">
      <div>
        <h4>Disc</h4>
        <List variant="disc">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
      <div>
        <h4>Circle</h4>
        <List variant="circle">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
      <div>
        <h4>Square</h4>
        <List variant="square">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
      <div>
        <h4>Decimal</h4>
        <List variant="decimal">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
      <div>
        <h4>Hyphen</h4>
        <List variant="hyphen">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
    </Grid>
  ),
}

export const ColorModifiers: Story = {
  render: () => (
    <Grid gap="small" className="uk-child-width-expand@s">
      <div>
        <h4>Muted</h4>
        <List variant="disc" color="muted">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
      <div>
        <h4>Emphasis</h4>
        <List variant="disc" color="emphasis">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
      <div>
        <h4>Primary</h4>
        <List variant="disc" color="primary">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
      <div>
        <h4>Secondary</h4>
        <List variant="disc" color="secondary">
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
    </Grid>
  ),
}

export const Bullet: Story = {
  render: () => (
    <List variant="bullet">
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
  ),
}

export const Divider: Story = {
  render: () => (
    <List divider>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
  ),
}

export const Striped: Story = {
  render: () => (
    <List striped>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
  ),
}

export const Size: Story = {
  render: () => (
    <Grid gap="small" className="uk-child-width-expand@s">
      <div>
        <h4>Large</h4>
        <List size="large" divider>
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
      <div>
        <h4>Collapse</h4>
        <List size="collapse" divider>
          <ListItem>List item 1</ListItem>
          <ListItem>List item 2</ListItem>
          <ListItem>List item 3</ListItem>
        </List>
      </div>
    </Grid>
  ),
}
