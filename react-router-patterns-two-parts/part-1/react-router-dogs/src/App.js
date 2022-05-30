import React from 'react';
import Nav from "./Nav";
import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom';

import DukePic from "./duke.jpg"
import PerryPic from "./perry.jpg"
import TubbyPic from "./tubby.jpg"
import WhiskeyPic from "./whiskey.jpg"


import './App.css';

function App({dogs}) {

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes props={dogs}/>
      </BrowserRouter>
    </div>
  );
}

App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: WhiskeyPic,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: DukePic,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: PerryPic,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: TubbyPic,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
}


export default App;
