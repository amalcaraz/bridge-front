import logo from './resources/logo.svg';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <section className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Table />
    </section>
  );
}

export default App;
