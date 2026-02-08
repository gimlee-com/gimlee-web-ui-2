import type { Meta, StoryObj } from '@storybook/react';
import { Routes, Route } from 'react-router-dom';
import UserSpacePage from './UserSpacePage';

const meta: Meta<typeof UserSpacePage> = {
  title: 'Pages/UserSpacePage',
  component: UserSpacePage,
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserSpacePage>;

export const Default: Story = {};
