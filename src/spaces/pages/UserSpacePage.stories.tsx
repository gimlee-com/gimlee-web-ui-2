import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UserSpacePage from './UserSpacePage';

const meta: Meta<typeof UserSpacePage> = {
  title: 'Pages/UserSpacePage',
  component: UserSpacePage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/u/johndoe']}>
        <Routes>
          <Route path="/u/:userName" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserSpacePage>;

export const Default: Story = {};
