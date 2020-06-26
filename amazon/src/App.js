import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import uploadProduct from './Components/uploadProduct'
import 'bootstrap/dist/css/bootstrap.min.css';
import searchProducts from './Components/searchProducts'

function App() {
  return (
    <Router>
      <NavBar/>
      <Route path="/" exact component={Home}/>
      <Route path ="/uploadProduct" component={uploadProduct}/>
      <Route path ={"/products/searchResults"} component ={searchProducts}/>
    </Router>
  );
}

export default App;
