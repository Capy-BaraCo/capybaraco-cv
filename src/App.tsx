import './styles/app.css'
import Landing from './components/Landing'
import Terminal from './components/Terminal'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <Landing />
      <div id="terminal">
        <Terminal />
      </div>
      <Footer />
    </div>
  )
}
