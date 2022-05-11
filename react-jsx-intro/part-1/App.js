// functional component 
const App = () => (
    <div>
        <FirstComponent/>
        <NamedComponent name="cool-guy" />
    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))