import { useState } from "react";

function useFlip() {
  // call useState, "reserve piece of state"
  const [currentFlipState, setCurrentFlipStateValue] = useState(true);
  const toggleState = () => {
    setCurrentFlipStateValue(oldValue => !oldValue);
  };
  
  // return piece of state AND a function to toggle it
  return [currentFlipState, toggleState];
}

export default useFlip;
