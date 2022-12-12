import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component = { Home }/>
      </Router>
    </div>
  );
}

export default App;
