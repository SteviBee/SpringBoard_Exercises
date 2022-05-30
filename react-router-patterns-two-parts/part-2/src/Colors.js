import React, { useState } from "react";
import { Link } from "react-router-dom";

function Colors({colors}) {

    
    const colorLinks = colors.colors.map(colorName => (
        <li key={colorName}>
          <Link to={`/colors/${colorName}`}>The Color is {colorName}</Link>
        </li>
      ));

    return (
        <>
            <button style={{backgroundColor: "lightblue"}}><Link to="/colors/new">Add Color</Link></button>
            {/* <AddColor addColor={addColor}></AddColor> */}
            <ul>                
                {colorLinks}
            </ul>  
        </>
    );
}
// end


export default Colors;
