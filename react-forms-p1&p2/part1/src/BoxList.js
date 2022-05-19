import React, { useState } from "react";
import NewBoxForm from "./NewBoxForm";
import Box from "./Box";
import { v4 as uuid } from "uuid";

const BoxList = () => {
    // Set state initally to an empty array, state is an array of objs in the list
    const [items, setItems] = useState([])

    // Create Remove function:
    const removeBox = evt => {
        // Shift Opt F = to auto space
        let answer = items.filter(box => box.id !== evt.target.parentElement.id)
        setItems(answer)

    }

    // Create Rendering function: return new array with all the item parameters
    const renderItems = () => {
        return (        
            <div className="BoxList-Boxes">
                {items.map(item => (
                    <Box key={item.id} id={item.id} width={item.width} height={item.height} bgColor={item.bgColor} removeBox={removeBox}></Box>
               
                ))}
            </div>      
        )
    }


    /** Add new item object to boxlist. */
    const addItem = item => {
        let newItem = { ...item, id: uuid() };
        setItems(items => [...items, newItem]);
    };

    // Return everything
    return (
        <div className="BoxList">
            <NewBoxForm addItem={addItem}/>
            {renderItems()}

        </div>
    )

}


export default BoxList;