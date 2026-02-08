import type { Meta, StoryObj } from '@storybook/react';
import { AdCard } from './AdCard';

const meta: Meta<typeof AdCard> = {
  title: 'Ads/AdCard',
  component: AdCard,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '350px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AdCard>;

export const Default: Story = {
  args: {
    ad: {
      id: '1',
      title: 'Vintage Camera - Nikon FM2 in Excellent Condition',
      price: { amount: 1250, currency: 'PLN' },
      preferredPrice: { amount: 12.5, currency: 'ARRR' },
      mainPhotoPath: '', // Will fallback to placeholder
      location: {
        city: { id: 'warsaw', name: 'Warsaw', district: 'Mokotów', country: 'Poland' }
      },
      createdAt: new Date().toISOString(),
      availableStock: 10,
      status: 'ACTIVE',
    },
  },
};

export const New: Story = {
  args: {
    ad: {
      ...Default.args?.ad,
      id: '2',
      title: 'New Listing: Mechanical Keyboard',
      createdAt: new Date().toISOString(),
    } as any,
  },
};

export const Sold: Story = {
  args: {
    ad: {
      ...Default.args?.ad,
      id: '3',
      status: 'SOLD',
    } as any,
  },
};

export const LowStock: Story = {
  args: {
    ad: {
      ...Default.args?.ad,
      id: '4',
      availableStock: 3,
    } as any,
  },
};

export const OutOfStock: Story = {
  args: {
    ad: {
      ...Default.args?.ad,
      id: '5',
      availableStock: 0,
    } as any,
  },
};

export const LongTitle: Story = {
  args: {
    ad: {
      ...Default.args?.ad,
      id: '6',
      title: 'This is a very long title that should definitely be truncated after two lines of text to ensure the card remains mature and tidy even with long user input',
    } as any,
  },
};
