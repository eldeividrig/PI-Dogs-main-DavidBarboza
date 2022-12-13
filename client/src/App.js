import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Buscar from './components/Buscar';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component = { Home }/>
        <Route exact path='/buscar' component = { Buscar }/>
      </Router>
    </div>
  );
}

export default App;
