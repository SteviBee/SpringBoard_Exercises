import React from 'react';
import VendingMachine from "./VendingMachine"
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Lays from "./Lays"
import Twix from "./Twix"
import Coke from "./Coke"
import './App.css';

function App() {
  return (
    <div className="App">
       hello app
      <BrowserRouter>
        <nav className="NavBar">
            <NavLink exact to="/">
                Home
            </NavLink>
            <NavLink exact to="/lays">
                Lays
            </NavLink>
            <NavLink exact to="/twix">
                Twix
            </NavLink>
            <NavLink exact to="/Coke">
                Coke
            </NavLink>
        </nav>
        
        <Route exact path="/">
            <VendingMachine/>
        </Route>
        <Route exact path="/lays">
            <Lays/>
        </Route>
        <Route exact path="/twix">
            <Twix/>
        </Route>
        <Route exact path="/Coke">
            <Coke/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
