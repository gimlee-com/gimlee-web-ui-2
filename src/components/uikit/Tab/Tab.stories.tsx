import type { Meta, StoryObj } from '@storybook/react'
import { Tab, TabItem } from './Tab'

const meta: Meta<typeof Tab> = {
  title: 'UIkit/Tab',
  component: Tab,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tab>

export const Basic: Story = {
  render: (args) => (
    <Tab {...args}>
      <TabItem active>
        <a href="#">Left</a>
      </TabItem>
      <TabItem>
        <a href="#">Item</a>
      </TabItem>
      <TabItem>
        <a href="#">Item</a>
      </TabItem>
      <TabItem disabled>
        <a>Disabled</a>
      </TabItem>
    </Tab>
  ),
}

export const Bottom: Story = {
  args: {
    className: 'uk-tab-bottom',
  },
  render: (args) => (
    <Tab {...args}>
      <TabItem active>
        <a href="#">Left</a>
      </TabItem>
      <TabItem>
        <a href="#">Item</a>
      </TabItem>
      <TabItem>
        <a href="#">Item</a>
      </TabItem>
    </Tab>
  ),
}

export const LeftRight: Story = {
  name: 'Left/Right',
  render: (args) => (
    <div className="uk-child-width-1-2@s" uk-grid="">
      <div>
        <Tab className="uk-tab-left" {...args}>
          <TabItem active>
            <a href="#">Left</a>
          </TabItem>
          <TabItem>
            <a href="#">Item</a>
          </TabItem>
          <TabItem>
            <a href="#">Item</a>
          </TabItem>
        </Tab>
      </div>
      <div>
        <Tab className="uk-tab-right" {...args}>
          <TabItem active>
            <a href="#">Right</a>
          </TabItem>
          <TabItem>
            <a href="#">Item</a>
          </TabItem>
          <TabItem>
            <a href="#">Item</a>
          </TabItem>
        </Tab>
      </div>
    </div>
  ),
}

export const Alignment: Story = {
  render: (args) => (
    <div uk-margin="">
      <Tab className="uk-flex-center" {...args}>
        <TabItem active>
          <a href="#">Center</a>
        </TabItem>
        <TabItem>
          <a href="#">Item</a>
        </TabItem>
        <TabItem>
          <a href="#">Item</a>
        </TabItem>
      </Tab>
      <Tab className="uk-flex-right" {...args}>
        <TabItem active>
          <a href="#">Right</a>
        </TabItem>
        <TabItem>
          <a href="#">Item</a>
        </TabItem>
        <TabItem>
          <a href="#">Item</a>
        </TabItem>
      </Tab>
      <Tab className="uk-child-width-expand" {...args}>
        <TabItem active>
          <a href="#">Justify</a>
        </TabItem>
        <TabItem>
          <a href="#">Item</a>
        </TabItem>
        <TabItem>
          <a href="#">Item</a>
        </TabItem>
        <TabItem>
          <a href="#">Item</a>
        </TabItem>
      </Tab>
    </div>
  ),
}
