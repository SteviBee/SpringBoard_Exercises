import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ColorDetail from "./ColorDetail";
import AddColor from "./AddColor";
import Colors from "./Colors";


function Routes() {
    const initialColors = {
        colors: ["red", "blue", "green"]
    };
    const [colors, updateColors] = useState(initialColors);
    console.log("colorsdfdsff", colors)

    // Creaing a function in the route that handles all the state transiotn
    // we pass the function down therefore it is invoked when we call it in the 
    // Child function
    function handleAdd(newColorObj) {
        let oldArr = (pc => ({
            ...pc, ...newColorObj
        }))

        console.log("old arry", oldArr(newColorObj))
        let answer = (prevColors => ({ ...prevColors, ...newColorObj }))
        console.log("answer", answer(newColorObj))
        
        updateColors(prevColors => ({ colors: [ newColorObj, ...prevColors.colors,] }));
        
      } 

    // Create function to render all the colors: MENTOR 
    // function renderCurrColor(props){
    //     const {color} = props.match.params;
    //     const hex = colors[color]
    //     console.log("color", hex, color, colors)
    //     console.log("preops", props)
    //     return <ColorDetail {...props} hex={hex} color={color} />
    // }


  return (
    <div>
        <Switch>
            <Route exact path="/colors"><Colors colors={colors}/></Route>
            <Route exact path="/colors/new"><AddColor addColor={handleAdd}/></Route>
            <Route path="/colors/:color"><ColorDetail /></Route>
            <Redirect to="/colors" />
            <Redirect to="/" />
        </Switch>
    </div>
  );
}



export default Routes;