// functional component 
// Create an App component that renders at least three tweets.
const App = () => (
    <div>
        <Tweet username="coolguy" name="bob" date="1/2/21" message="what a day to be alive"/>
        <Tweet username="coolguy2" name="bob2" date="1/23/21" message="what a morning to be alive"/>
        <Tweet username="coolguy3" name="bob3" date="1/22/21" message="what a night to be alive"/>
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))