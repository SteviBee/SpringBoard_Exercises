const fs = require("fs");
// todo - istall axios 
// const axios = require('axios');
const exec = require("child_process").exec

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
        let resp = await axios.get(path);
        console.log("Webcat ------ ", resp.data)
    } catch (error) {
        console.log("error! -", error)
    }

}

// node step3.js --out new.txt one.txt
// PART 3 ----------------------
function handleOutput(text, output) {
    if (out){

        fs.writeFile(output, text, "utf8",function (err) {
            if (err) {
                console.log("Error: No file named", path, "Error:", err)
                process.kill(1)
            } 
            console.log(data)
        })
        
    } else {
        console.log("successfully wrote", output, "to: ", text)
    }
}

function catNewFile(path) {
    
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log("Error: No file named", path, "Error:", err)
            process.kill(1)
        } 
        handleOutput(data, out)
    })

}

async function newFile() {
    let newFileName = process.argv[3]
    let content = process.argv[4]

    // If it is a new file to write to
    if (newFileName.includes(".txt")) {
        // Get file contents
        let resp = fs.readFile(content, "utf8", (err, data) => {
            if (err) {
                console.log("Error: No file named", path, "Error:", err)
                process.kill(1)
            } 
            return data
        })

// echo ${resp} > ${newFileName}
    //     exec(f`cat ${one.txt}`, function (err, stdout, stderr) {
    //         if (err) {
    //             console.log("error!", err)
                
    //         }
    //         console.log("stdout", stdout)
    //         console.log("stderr", stderr)
            
    //     })        
    // }

    // let resp = await axios.get(path);

    // exec(f`echo ${resp} > ${newFileName}`, function (err, stdout, stderr) {
    //     if (err) {
    //         console.log("error!", err)
            
    //     }
    //     console.log("stdout", stdout)
    //     console.log("stderr", stderr)
        
    // })
    
}}


if (path.includes("--out")) {
    newFile(path)
} else if (path.includes(".txt")) {
    cat(path)
} else {
    webCat(path)
}
