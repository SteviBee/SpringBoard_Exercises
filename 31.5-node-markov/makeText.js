/** Command-line tool to generate Markov text. */
const fs = require("fs");
const { MarkovMachine } = require("./markov")
const axios = require('axios');

// $ node makeText.js file eggs.txt
let path = process.argv[3]
let cmd = process.argv[2]

// invoked 
function makeFileMM(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log("Error: No file named", path, "Error:", err)
            process.kill(1)
        }

        let fileMM = new MarkovMachine(data)
        console.log(fileMM.makeText(numWords = 100))
    })
    
}
  
// Handle web url path to create new machine then return text from it
async function makeUrlMM(path) {
    
    try {
        let resp = await axios.get(path);
        let urlMM = new MarkovMachine(resp.data)
        console.log(urlMM.makeText(numWords = 100))        

    } catch (error) {
        console.log("error! -", error)
    }

}




// Call correct function and handle bad cmd - if file run file if url run url 
if (cmd.includes("file")) {
    makeFileMM(path)
} else if (cmd.includes("url")) {
    makeUrlMM(path)
} else {
    console.log("Unknown Command, Please try 'file' or 'url' Cmd: ", cmd)
    process.kill(1)
}