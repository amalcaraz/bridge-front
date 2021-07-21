import { BrowserRouter as Router } from "react-router-dom"
import logo from './resources/logo.svg'
import './App.css'
import Routes from './components/Routes'

function App() {
  return (
    <section className="App">
      <Router basename="/">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes />
      </Router>
    </section>
  )
}

export default App
