import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import DogList from "./DogList"
import DogDetails from "./DogDetails"


import './App.css';

function Routes({props}) {
    
    return (
        <Switch>
            <Route exact path="/dogs"><DogList props={props}/></Route>
            <Route exact path="/dogs/:name"><DogDetails props={props}/></Route>
            <Redirect to="/dogs" />
        </Switch>
    );
}

export default Routes;
