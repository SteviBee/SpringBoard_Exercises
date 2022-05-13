import React from 'react';
import "./Pokecard.css"

function Pokecard({name, id, type, base_experience}) {
    let imageFull = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return ( 
    <div className="Pokecard">    
        
        <h3 className="Pokecard-title">{name}</h3> 
        <img className="Pokecard-img"src={imageFull} alt=""></img>
        <p className="Pokecard-type">Type: {type}</p>
        <p className="Pokecard-exp">EXP: {base_experience}</p>
 

    </div>
    )

};

export default Pokecard