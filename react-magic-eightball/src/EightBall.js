import React, { useState } from "react";
import answers from "./answer.js"

import "./EightBall.css"



// Accepts an array of objects and returns answers and sets colors
const EightBall = (props) => {
    // define states: default,  and current color & msg
    const [defaultColor, setdefaultColor] = useState("black")
    const [defaultMsg, setdefaultMsg] = useState("Think of a Question")

    // Create random function:
    const randomMsg = () => {
        return answers[Math.floor(Math.random() * answers.length)]
         
    }

    // Create event functions:
    const handleClick = () => {
        let randObj = randomMsg()
        setdefaultColor(randObj.color)
        setdefaultMsg(randObj.msg)

    }

    const reset = () => {
        setdefaultColor("black")
        setdefaultMsg("Think of a Question")
    }




    return (
        <div className="EightBall">
            <div className="EightBall-ball" style={{backgroundColor: defaultColor}} onClick={handleClick}>
                <h3 className="EightBall-question" style={{color: "white"}}>{defaultMsg}</h3>
            </div>
            <button onClick={reset}>Restart</button>

            {/* {answers.map(item => (
                <>
                <p>{item.color}</p>
                <p>{item.msg}</p>
                </>
            ))} */}
        </div>
    )
}

export default EightBall;