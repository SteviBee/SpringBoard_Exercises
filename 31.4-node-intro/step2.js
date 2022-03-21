const fs = require("fs");
// todo - istall axios 
const axios = require('axios');

let path = process.argv[2]

function cat(path) {
    
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log("Error: No file named", path, "Error:", err)
            process.kill(1)
        } 
        console.log(data)
    })

}


// Note async / await to ensure resposne from web call
async function webCat(path) {
    
    try {
        let resp = await axios.get(path)
        console.log("Webcat ------ ", resp.data)
    } catch (error) {
        console.log("error! -", error)
    }

}

if (path.includes(".txt")) {
    cat(path)
} else {
    webCat(path)
}
