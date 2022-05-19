import React from "react";


const Box = ({ id, width, height, bgColor, removeBox }) => {
    return (
        <div className="Box" id={id} style={{backgroundColor: bgColor, width: width + "px", height: height + "px"}}>
            <button onClick={removeBox}>X</button>
        </div>
    )
}

export default Box;