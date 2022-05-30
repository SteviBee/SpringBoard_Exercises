import React from 'react';
import { useParams } from "react-router-dom";



function DogDetails({props}) {
    const { name } = useParams();
    const myDog = props.filter(dog => dog.name === name)
    console.log(myDog)
    return (
        <>
            <h1>Hello World name is: {name}</h1>
            <p> My age is: {myDog[0].age}</p>
            <b> Some facts about me are:</b>
            <p> {myDog[0].facts[0]}</p>
            <p> {myDog[0].facts[1]}</p>
            <p> {myDog[0].facts[2]}</p>
          
      

        </>
    );
}

export default DogDetails;
