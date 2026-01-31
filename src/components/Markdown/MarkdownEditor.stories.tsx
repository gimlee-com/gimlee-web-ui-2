import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownEditor } from './MarkdownEditor';

const meta: Meta<typeof MarkdownEditor> = {
  title: 'Components/MarkdownEditor',
  component: MarkdownEditor,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: '',
  },
  decorators: [
    (Story) => (
      <div className="uk-width-large">
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  args: {
    value: '# Hello\nThis is some content.',
  },
  decorators: [
    (Story) => (
      <div className="uk-width-large">
        <Story />
      </div>
    ),
  ],
};

export const Danger: Story = {
  args: {
    value: 'Field with error',
    status: 'danger',
  },
  decorators: [
    (Story) => (
      <div className="uk-width-large">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    value: 'Disabled editor',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="uk-width-large">
        <Story />
      </div>
    ),
  ],
};
