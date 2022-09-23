import React, { useState } from "react";

const NewTodoForm = ({ addItem }) => {
    // Set initial values to blank so they are displayed in the form
    const INITIAL_STATE = {
      todo: ''
    }


    const [formData, setFormData] = useState(INITIAL_STATE);

    // Handle form changing
    const handleChange = (e) => {
        // Grab the data from event before sending to state
        const { name, value } = e.target;
        // Change local state when values in input fields change there re-render
        // With new formData! onChange add name: value to formdata object
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    // Handle form submition by sending data back up to parent component. Handles
    // Multiple input html Elements if needed
    const handleSubmit = (e) => {
      e.preventDefault();
      addItem({ ...formData });
      setFormData(INITIAL_STATE)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Todo: </label>
        <input
          id="todo"
          type="text"
          name="todo"
          value={formData.todo}
          onChange={handleChange}
        />

        <button>Add Todo</button>
      </form>
    )
  
  }
  
  export default NewTodoForm;
  
  
  