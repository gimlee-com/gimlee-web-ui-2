import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../../components/uikit/Grid/Grid'
import { Section } from '../../components/uikit/Section/Section'
import { Container } from '../../components/uikit/Container/Container'
import { Card, CardBody } from '../../components/uikit/Card/Card'
import {
  Navbar,
  NavbarContainer,
  NavbarLeft,
  NavbarNav,
  NavbarItem,
} from '../../components/uikit/Navbar/Navbar'

const meta: Meta = {
  title: 'UIkit/Inverse',
  parameters: { controls: { hideNoControlsWarning: true } },
}
export default meta
type Story = StoryObj

export const LightAndDark: Story = {
  name: 'Light and dark',
  render: () => (
    <Grid className="uk-child-width-1-2@m" gap="small">
      <div>
        <div className="uk-light uk-background-secondary uk-padding">
          <h3>uk-light</h3>
          <p>Lorem ipsum dolor sit amet.</p>
          <button className="uk-button uk-button-default">Button</button>
        </div>
      </div>
      <div>
        <div className="uk-dark uk-background-muted uk-padding">
          <h3>uk-dark</h3>
          <p>Lorem ipsum dolor sit amet.</p>
          <button className="uk-button uk-button-default">Button</button>
        </div>
      </div>
    </Grid>
  ),
}

export const InverseOnSections: Story = {
  name: 'Inverse on sections',
  render: () => (
    <Grid className="uk-child-width-1-2@m" gap="small">
      <div>
        <Section variant="primary" preserveColor>
          <Container>
            <h3 className="uk-light">Primary section (preserve-color)</h3>
            <p className="uk-light">Cards keep their own colors.</p>
            <Card>
              <CardBody>
                <p>Neutral card inside primary section.</p>
              </CardBody>
            </Card>
          </Container>
        </Section>
      </div>
      <div>
        <Section variant="secondary">
          <Container>
            <h3>Secondary section (auto inverse)</h3>
            <p>Content is auto-inverted for readability.</p>
            <button className="uk-button uk-button-default">Button</button>
          </Container>
        </Section>
      </div>
    </Grid>
  ),
}

export const NavbarInverse: Story = {
  name: 'Navbar inverse over mixed backgrounds',
  render: () => (
    <div className="uk-position-relative">
      <div className="uk-position-top">
        <NavbarContainer transparent>
          <Container>
            <Navbar uk-inverse="">
              <NavbarLeft>
                <NavbarNav>
                  <NavbarItem active>
                    <a href="#">Home</a>
                  </NavbarItem>
                  <NavbarItem>
                    <a href="#">Docs</a>
                  </NavbarItem>
                </NavbarNav>
              </NavbarLeft>
            </Navbar>
          </Container>
        </NavbarContainer>
      </div>
      <Section variant="default">
        <Container>
          <p>Default background below.</p>
        </Container>
      </Section>
      <Section variant="primary">
        <Container>
          <p>Primary background; inverse adapts automatically.</p>
        </Container>
      </Section>
    </div>
  ),
}