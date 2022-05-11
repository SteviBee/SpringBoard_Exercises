// functional component 
// Create an App component that renders at least three tweets.
const App = () => (
    <div>
        <Person age={5} name="Bob" hobbies={["soccer", "golf", "running"]}/>
        <Person age={19} name="Joe" hobbies={["soccer", "golf", "running"]}/>
        <Person age={30} name="Chara" hobbies={["soccer", "golf", "running"]}/>

    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))