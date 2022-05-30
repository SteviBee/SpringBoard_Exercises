import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useHistory} from 'react-router-dom';

//Ansnwer key - Took these props - {hex, color, history}
function ColorDetail() {
    const { color } = useParams()

    // MENTOR - having trouble checking for if value was real and to redirect
    // Thought about handling a state in the routes above
    // if (!hex) {
    //     history.push("/colors");
    //   }


    return (
        <div>
            <h1 style={{backgroundColor: `${color}`}}>{color}</h1>
            <li><Link to="/colors">Go back</Link></li>
        </div>
    );
}

export default ColorDetail;