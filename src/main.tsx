import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element with id "root" not found. Unable to mount the app.')
}

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
