import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import uikit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import './styles/main.scss'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.tsx'

uikit.use(Icons)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
