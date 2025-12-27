import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import uikit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import './styles/main.scss'
import './index.css'
import App from './App.tsx'

uikit.use(Icons)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
