import React, { useState } from "react";
import NewSignUpForm from "./NewSignUpForm";
import User from "./User";
import { v4 as uuid } from "uuid";

const SignUp = () => {
    // set state to be empty to capture
    const [items, setItems] = useState([])

    // Create remove function - LATER
    // filter items based on id and parent id then recall state to update it all
    const removeFunction = evt => {
        let answer = items.filter(item => item.id !== evt.target.parentElement.id)
        setItems(answer)
    }
    // Update function - LATER
    const updateFunction = (id, updatedTask) => {
        setItems(todos =>            
        todos.map(todo => 
            todo.id === id ? { ...todo, todo: updatedTask } : todo
            )
        );
    };
    // prop to pass to form
    const addItem = item => {
        // Creat newItem object with old obejects PLUS ID PLUS the key:value pairs from prior
        let newItem = { ...item, id: uuid() };
        setItems(items => [...items, newItem]);
    };

    // Render
    return (
        <div>
            <NewSignUpForm addItem={addItem}></NewSignUpForm>
            {items.map(item => (
                <User
                name={item.name}
                id={item.id}
                remove={removeFunction}
                update={updateFunction}>
                </User>
            ))}    
        </div>
    )




}

export default SignUp;