import React from 'react';
import { Link } from "react-router-dom";


function Lays() {
  return (
    <div className="Lays">
        <p>Lays!!!</p>
        <p>Go back <Link to="/">Home</Link></p>
      
    </div>
  );
}

export default Lays;