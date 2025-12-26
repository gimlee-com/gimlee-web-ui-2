import type { Meta, StoryObj } from '@storybook/react'
import { Sticky } from './Sticky'
import { Card, CardBody, CardTitle } from '../Card/Card'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof Sticky> = {
  title: 'UIkit/Sticky',
  component: Sticky,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Sticky>

const TallContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="uk-height-large uk-background-muted uk-padding uk-overflow-auto">
    <div className="uk-height-large uk-position-relative">
      <Grid gap="small">
        <div className="uk-width-1-2@s">
          <p>Scroll this area to see the sticky behavior.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula
            nisl vel nisl fermentum, non commodo dui molestie. Donec sed tortor
            hendrerit, commodo ipsum et, tempor nisl.
          </p>
          <p>
            Mauris non urna id odio pretium rhoncus. Sed vestibulum cursus enim,
            pharetra tincidunt felis condimentum vitae. Sed dictum ligula nec ante
            congue, a sollicitudin arcu tempor.
          </p>
          <p>
            Etiam porta massa non mauris cursus, nec dictum arcu fermentum. Sed in
            dictum ex, nec fermentum velit.
          </p>
        </div>
        <div className="uk-width-1-2@s">{children}</div>
      </Grid>
    </div>
  </div>
)

export const Default: Story = {
  render: () => (
    <TallContainer>
      <Sticky>
        <Card>
          <CardBody>
            <CardTitle>Sticky Card</CardTitle>
            <p>Sticks to the top as you scroll this container.</p>
          </CardBody>
        </Card>
      </Sticky>
    </TallContainer>
  ),
}

export const WithOffset: Story = {
  render: () => (
    <TallContainer>
      <Sticky offset={80}>
        <Card>
          <CardBody>
            <CardTitle>Offset 80px</CardTitle>
            <p>Leaves 80px from the top before sticking.</p>
          </CardBody>
        </Card>
      </Sticky>
    </TallContainer>
  ),
}

export const ShowOnUp: Story = {
  render: () => (
    <TallContainer>
      <Sticky showOnUp animation="uk-animation-slide-top" offset={40}>
        <Card>
          <CardBody>
            <CardTitle>Show on Up</CardTitle>
            <p>Hides on scroll down, shows when scrolling up.</p>
          </CardBody>
        </Card>
      </Sticky>
    </TallContainer>
  ),
}

export const OverflowFlip: Story = {
  render: () => (
    <TallContainer>
      <Sticky overflowFlip end="100%">
        <Card>
          <CardBody>
            <CardTitle>Overflow Flip</CardTitle>
            <p>Flips if content is taller than viewport.</p>
          </CardBody>
        </Card>
      </Sticky>
    </TallContainer>
  ),
}