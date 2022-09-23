import React from 'react';
import TodoList from './TodoList';
import SignUp from './Signup'
import './App.css';

// TEST - 9/21/22 - Add a sign up list and then display it on the page
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div className="App">
      <h1>Testing React stuff</h1>
      <Welcome name="Stephen"></Welcome>
      <TodoList />
      <SignUp></SignUp>
    </div>
  );
}

export default App;
