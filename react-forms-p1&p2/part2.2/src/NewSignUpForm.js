import React, { useState } from "react";

const NewSignUpForm = ({ addItem }) => {
    // set inital sate so display blank
    const INITIAL_STATE = {
        name: " "
    }
    const [formData, setFormData] = useState(INITIAL_STATE)

    // Handle Form Change
    const handleChange = (e) => {
        // Gather the data
        const {name, value} = e.target
        // change local formData state 
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))

    }

    // Submit form data to state above this component 
    const handleSubmit = (e) => {
        e.preventDefault();

        // get all data and invoke function to send to upper component
        //  then set back to default
        addItem({...formData})
        setFormData(INITIAL_STATE)

    }

    return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">User: </label>
          <input
            id="user"
            type="text"
            name="user"
            value={formData.name}
            onChange={handleChange}
          />
  
          <button>Add User</button>
        </form>
      )


}

export default NewSignUpForm