import React from 'react';
import { Link } from "react-router-dom";






function DogList({ props }) {

    return (
        <>
            <h1>Hello DOG LIST</h1>
                          
            <ul>
                {props.map(dog => (
                    <li key={dog.name}>
                        <Link to={`/dogs/${dog.name}`}>
                        <img src={dog.src} alt={dog.name} style={{width:"100px"}}></img>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default DogList;
