import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import { v4 as uuid } from "uuid";

const TodoList = () => {
    // Set state initally to an empty array, state is an array of objs in the list
    const [items, setItems] = useState([])

    // Create Remove function:
    const removeTodo = evt => {
        // Shift Opt F = to auto space
        let answer = items.filter(item => item.id !== evt.target.parentElement.id)
        // Answer key pretty slick: double arrow function
        // setTodos(todos => todos.filter(todo => todo.id !== id));
        setItems(answer)
    }

    // Create Rendering function: return new array with all the item parameters
    const renderItems = () => {
        return (        
            <div className="TodoList-Todos">
                {items.map(item => (
                    <Todo 
                    key={item.id} 
                    id={item.id} 
                    todo={item.todo} 
                    removeTodo={removeTodo} 
                    update={update}>
                    </Todo>
                ))}
            </div>      
        )
    }
    // update the state obj with a todo that is updated with the new text IF the Ids match
    const update = (id, updatedTask) => {
        setItems(todos =>            
        todos.map(todo => 
            todo.id === id ? { ...todo, todo: updatedTask } : todo
            )
        );
    };

    /** Add new item object to boxlist. */
    const addItem = item => {
        // Creat newItem object with old obejects PLUS ID PLUS the key:value pairs from prior
        let newItem = { ...item, id: uuid() };
        setItems(items => [...items, newItem]);
    };

    // Return everything
    return (
        <div className="TodoList">
            <NewTodoForm addItem={addItem}/>
            {renderItems()}

        </div>
    )

}


export default TodoList;