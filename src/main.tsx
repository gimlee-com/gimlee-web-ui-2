import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import './styles/main.scss'
import './index.css'
import App from './App.tsx'

// eslint-disable-next-line react-hooks/rules-of-hooks
UIkit.use(Icons)

createRoot(document.getElementById('root')!).render(
// ... existing code ...
  <StrictMode>
    <App />
  </StrictMode>,
)
