import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/uikit/Button/Button.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
        <h1>Vite + React</h1>
        <div className="card">
            <Button onClick={() => setCount(count => count + 1)} variant="primary">
                count is {count}
            </Button>
            <div className="uk-margin">
                <Button>Default</Button>
                <Button variant="danger" className="uk-margin-left">
                    Danger
                </Button>
                <Button variant="text" className="uk-margin-left">
                    Text
                </Button>
                <Button size="small" className="uk-margin-left">
                    Small
                </Button>
            </div>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
        <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
