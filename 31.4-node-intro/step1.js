const fs = require("fs");

if (process.argv[2]) {

    let path = process.argv[2]
    
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log("Error: No file named", path, "Error:", err)
            process.kill(1)
        } 
        console.log(data)
    })

}
