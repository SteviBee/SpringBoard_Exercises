import React, { useState } from "react";

const NewBoxForm = ({ addItem }) => {
    // Set initial values to blank so they are displayed in the form
    const INITIAL_STATE = {
      width: '100',
      height: '100',
      bgColor: 'black'
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    // Handle form changing
    const handleChange = (e) => {
        // Grab the data from event before sending to state
        const { name, value } = e.target;
        // Change state when values in input fields change
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    // Handle form submition by sending data back up to parent component 
    const handleSubmit = (e) => {
      e.preventDefault();
      addItem({ ...formData });
      setFormData(INITIAL_STATE)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="width">Width:</label>
        <input
          id="width"
          type="text"
          name="width"
          value={formData.width}
          onChange={handleChange}
        />
        <label htmlFor="height">Height: </label>
        <input
          id="height"
          type="text"
          name="height"
          min="1"
          max="10"
          value={formData.height}
          onChange={handleChange}
        />
        <label htmlFor="bgColor">bgColor: </label>
        <input
          id="bgColor"
          type="text"
          name="bgColor"
          min="1"
          max="10"
          value={formData.bgColor}
          onChange={handleChange}
        />
        <button>Add Box</button>
      </form>
    )
  
  }
  
  export default NewBoxForm;
  
  
  