import type { Meta, StoryObj } from '@storybook/react';
import { Markdown } from './Markdown';

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown',
  component: Markdown,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    content: '# Hello World\n\nThis is **markdown** content.',
    className: 'uk-width-large',
  },
};

export const ExternalLink: Story = {
  args: {
    content: 'Check out [Google](https://google.com).',
    className: 'uk-width-large',
  },
};

export const ProhibitedImage: Story = {
  args: {
    content: '![External Image](https://example.com/image.png)',
    className: 'uk-width-large',
  },
};

export const AllowedImage: Story = {
  args: {
    content: '![Internal Image](/currencies/pirate-primary.svg)',
    className: 'uk-width-large',
  },
};

export const Complex: Story = {
  args: {
    content: `
# Heading 1
## Heading 2
### Heading 3

- List item 1
- List item 2
  - Subitem

1. Ordered item
2. Ordered item

| Table | Header |
|-------|--------|
| Cell  | Cell   |

> This is a blockquote.

**Bold text** and *italic text*.
`,
    className: 'uk-width-large',
  },
};
