import type { Preview } from '@storybook/react'
import uikit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '../src/styles/main.scss'

uikit.use(Icons)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview