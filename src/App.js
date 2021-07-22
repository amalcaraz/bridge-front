import { BrowserRouter as Router } from "react-router-dom"
import logo from './resources/logo.svg'
import './App.css'
import Routes from './components/Routes'
import config from './core/config'

function App() {
  return (
    <section className="App">
      <Router basename={config.baseUrl}>
        <header>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <Routes />
        </main>
      </Router>
    </section>
  )
}

export default App
