import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Buscar from './components/Buscar';
import Home from './components/Home';
import DogDetail from "./components/DogDetail";
import { CrearRaza } from './components/CrearRaza';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component = { Home }/>
        <Route exact path='/buscar' component = { Buscar }/>
        <Route exact path= '/dog-detail/:id' component= {DogDetail}/>
        <Route exact path= "/crearraza" component= {CrearRaza}/>
      </Router>
    </div>
  );
}

export default App;
