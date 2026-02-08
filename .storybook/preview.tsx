import React from 'react';
import type { Preview } from '@storybook/react';
import uikit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../src/styles/main.scss';

import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ThemeProvider } from '../src/context/ThemeContext';
import { AuthProvider } from '../src/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

uikit.use(Icons);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <AuthProvider>
              <MemoryRouter>
                <div id="navbar-focused-content"></div>
                <Story />
              </MemoryRouter>
            </AuthProvider>
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    ),
  ],
};

export default preview;
