import './styles/app.css'
import MatrixBackground from './components/MatrixBackground'
import Landing from './components/Landing'
import Terminal from './components/Terminal'
import RevealOnScroll from './components/RevealOnScroll'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <MatrixBackground />
      <main className="app">
        <Landing />
        <RevealOnScroll id="terminal">
          <Terminal />
        </RevealOnScroll>
        <Footer />
      </main>
    </>
  )
}
