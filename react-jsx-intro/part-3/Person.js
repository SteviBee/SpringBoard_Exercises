const Person = (props) => {
    // Conditional rendering - I will put the logic above the return:
    let msg;
    
    if (props.age > 18) {
        msg = "please go vote!";
    } else {
        msg = "you must be 18";
    }

    // Checking for char length > 8
    if (props.name.length > 8) {
        props.name.substring(0,6)
        
    }

    return ( 
    <div>   
        <p>Learn some information about this person:</p> 
        <h3>{msg}</h3> 
        <p>name {props.name}</p>  
        <p>age {props.age}</p>
        
        {props.hobbies.map(h => <li>{h}</li>)}  
    

    </div>
    )

};