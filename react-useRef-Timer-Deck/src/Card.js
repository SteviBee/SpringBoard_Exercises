import React, { useState } from "react";
// import axios from "axios";

const Card = ({data, handleDraw}) => {
    // creating hid / unhid for button
    const [startButton, setStartButton] = useState(false)
    function toggle(evt) {
        setStartButton(isHidden => !isHidden)
    }

    return (
        // <div>Card are real! {data.map(i => <p>i</p>)}</div>
        <div>Card are real! 
            <img src={data} alt="card1_of_52"></img>
            <button onClick={handleDraw}>Click Me for next card</button>
            <img src={data} alt="card1_of_52"></img>
            <div onClick={toggle}>
                {startButton ? "Cool" : "show timer   "}Start Timer</div>
        </div>
    )

    
}


export default Card;