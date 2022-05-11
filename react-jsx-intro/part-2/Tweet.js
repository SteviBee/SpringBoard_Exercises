const Tweet = (props) => {
    return ( <div> 
            <p>username {props.username}</p> 
            <p>name {props.name}</p> 
            <p>date (integer) {props.date}</p>  
            <p>message {props.message}</p> 

        </div>
    )

};