import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './Components/Home'
import NavBar from './Components/NavBar'

function App() {
  return (
    <Router>
      <NavBar/>
      <Route path="/" exact component={Home}/>
    </Router>
  );
}

export default App;
