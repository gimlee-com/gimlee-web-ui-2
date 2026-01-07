import type { Meta, StoryObj } from '@storybook/react';
import { GeometricAvatar } from './GeometricAvatar';
import { Grid } from '../uikit/Grid/Grid';

const meta: Meta<typeof GeometricAvatar> = {
  title: 'Components/GeometricAvatar',
  component: GeometricAvatar,
  argTypes: {
    size: {
      control: { type: 'range', min: 20, max: 500, step: 10 },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GeometricAvatar>;

export const Default: Story = {
  args: {
    username: 'Gimlee',
    size: 100,
  },
};

export const Gallery: Story = {
  args: {
    size: 80,
  },
  render: (args) => {
    const testUsernames = [
      // Common names
      'Alice', 'Bob', 'Charlie', 'Dana', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy',
      'Mallory', 'Niaj', 'Olivia', 'Peggy', 'Quentin', 'Rupert', 'Sybil', 'Trent', 'Victor', 'Walter',
      // Single letters
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z',
      // Tech/Crypto
      'admin', 'root', 'guest', 'anonymous', 'pirate', 'chain', 'arrr', 'monero', 'xmr', 'firo',
      'bitcoin', 'btc', 'ethereum', 'eth', 'solana', 'polkadot', 'cardano', 'avalanche', 'polygon', 'cosmos',
      // Greek alphabet
      'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa',
      'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon',
      // Numbers/Mixed
      '123User', '99problems', '007', '42answer', '3blindmice', '7heaven', '5ive', '8ball', '2fast', '6ix',
      // Long/Special
      'VeryLongUsernameExampleThatShouldBeTruncatedInUI', 'Short', 'Me', 'Myself', 'AndI', 'User_1', 'User.2', 'User-3', 'User 4', 'FinalUser'
    ];

    return (
      <Grid gap="small" match className="uk-child-width-1-2@s uk-child-width-1-4@m uk-child-width-1-6@l">
        {testUsernames.map((username) => (
          <div key={username} className="uk-flex uk-flex-column uk-flex-middle uk-margin-bottom">
            <GeometricAvatar {...args} username={username} />
            <span className="uk-text-meta uk-margin-small-top uk-text-truncate uk-width-1-1 uk-text-center">
              {username}
            </span>
          </div>
        ))}
      </Grid>
    );
  },
};
