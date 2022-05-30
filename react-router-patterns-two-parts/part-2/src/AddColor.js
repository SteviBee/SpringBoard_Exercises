import React, {useState} from "react";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';



function AddColor({addColor}) {
    
    const [newColor, setNewColor] = useState("");
    const history = useHistory();

    const handleChange = (evt) => {
        setNewColor(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        addColor(newColor)
        history.push("/color")
    }

  return (
    <div>
        <h1>Adding color</h1>
        <form onSubmit={handleSubmit}> 
            <input
                type="text"
                name="name"
                value={newColor}
                onChange={handleChange}>
            </input>
            <button>Submit</button>
        </form>
        <li><Link to="/colors">Go back</Link></li>
    </div>
  );
}

export default AddColor;