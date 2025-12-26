import type { Preview } from '@storybook/react'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import '../src/styles/main.scss'

UIkit.use(Icons)

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