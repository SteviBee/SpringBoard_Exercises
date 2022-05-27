import React from 'react';
import { Link } from "react-router-dom";


function Twix() {
  return (
    <div className="Twix">
        <p>TWIX!!!</p>
        <p>Go back <Link to="/">Home</Link></p>
      
    </div>
  );
}

export default Twix;