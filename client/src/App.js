import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import CharacterSelect from './pages/CharacterSelect'
import Game from './pages/Game'

function App() {
  return (
    <Router>
    <div className="App">
    <Route exact path="/" component={Login} />
    <Route exact path="/SignUp" component={SignUp} />
    <Route exact path="/CharacterSelect" component={CharacterSelect} />
    <Route exact path="/Game" component={Game} />
    </div>
    </Router>
  );
}

export default App;
