import React from 'react';
import { Link } from "react-router-dom";


function Coke() {
  return (
    <div className="Coke">
        <p>Coke!!!</p>
        <p>Go back <Link to="/">Home</Link></p>
      
    </div>
  );
}

export default Coke;