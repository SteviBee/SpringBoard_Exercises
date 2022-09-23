import React, {useState} from "react";


const Todo = ({ id, todo, removeTodo, update }) => {
    // Two states, one for editing a task, one for completed
    const [editTodo, setEditTodo] = useState(todo)
    // Start as false so hidden?
    const [isEditing, setIsEditing] = useState(false)

    // creating a toggleEdit to show when wanting to update edit state
    // Starts as false goes to true when editing then back to false
    const toggleEdit = () => {
        setIsEditing(edit => !edit)
    }

    // Sync any change to state
    const handleChange = evt => {
        setEditTodo(evt.target.value);
      };


    // Send id and editTodo back up to parent 
    const handleUpdate = evt => {
        evt.preventDefault();
        update(id, editTodo);
        setIsEditing(false);
      };

    // If isEditing state is true then render this "editing" html:
    if (isEditing) {
        return (
          <div>
            <form onSubmit={handleUpdate}>
              <input type="text" value={editTodo} onChange={handleChange} />
              <button>Update!</button>
            </form>
          </div>
        );
      }


    return (
        <div className="Todo" id={id}> {todo}
            <button onClick={removeTodo}>X</button>
            <button onClick={toggleEdit}>Edit</button>
        </div>
    )
}

export default Todo;