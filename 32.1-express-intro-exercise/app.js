const express = require("express");
const ExpressError = require("./expressError");
const path = require('path');
const router = express.Router();

const app = express();


// Routes -------------------------------
app.get("/", function (req, res, next) {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get("/mean", function (req, res, next) {
    try {
        // Convert to int
        let nums = req.query.nums
        let splitNums = nums.split(",")
        numArr = []
        for (let i = 0; i < splitNums.length; i++) {
            let singleString = parseInt(splitNums[i])
            numArr.push(singleString)
        }
    

        // Throw Errors
        if (nums.length === 0) throw new ExpressError("No inputs", 400)
        if (numArr.includes(NaN)) throw new ExpressError("Non-number detected, please use only numbers", 400)
        for (let i = 0; i < numArr.length; i++) {
            if (!typeof numArr[i] === 'number') {
                throw new ExpressError(f`${numArr[i]}is not a number`, 404)
            }
        }

        // Handle math
        // https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
        const average = (array) => array.reduce((a, b) => a + b) / array.length;
   
        let ans = average(numArr)

        return res.json({ response: {
            operation: "mean",
            value: ans
        } })
      } catch (e) {
        next(e)
      }
    })

app.get("/median", function (req, res, next) {
    try {
        // Convert to int
        let nums = req.query.nums
        let splitNums = nums.split(",")
        numArr = []
        for (let i = 0; i < splitNums.length; i++) {
            let singleString = parseInt(splitNums[i])
            numArr.push(singleString)
        }


        // Throw Errors
        if (nums.length === 0) throw new ExpressError("No inputs", 400)
        if (numArr.includes(NaN)) throw new ExpressError("Non-number detected, please use only numbers", 400)
        for (let i = 0; i < numArr.length; i++) {
            if (!typeof numArr[i] === 'number') {
                throw new ExpressError(f`${numArr[i]}is not a number`, 404)
            }
        }

        // Handle math - https://stackoverflow.com/questions/45309447/calculating-median-javascript
        function median(numbers) {
            const sorted = numbers.slice().sort((a, b) => a - b);
            const middle = Math.floor(sorted.length / 2);
        
            if (sorted.length % 2 === 0) {
                return (sorted[middle - 1] + sorted[middle]) / 2;
            }
        
            return sorted[middle];
        }
    
        let ans = median(numArr)

        return res.json({ response: {
            operation: "mode",
            value: ans
        } })
      } catch (e) {
        next(e)
      }
    })

app.get("/mode", function (req, res, next) {
    try {
        // Convert to int
        let nums = req.query.nums
        let splitNums = nums.split(",")
        numArr = []
        for (let i = 0; i < splitNums.length; i++) {
            let singleString = parseInt(splitNums[i])
            numArr.push(singleString)
        }
        console.log(numArr)

        // Throw Errors
        if (nums.length === 0) throw new ExpressError("No inputs", 400)
        if (numArr.includes(NaN)) throw new ExpressError("Non-number detected, please use only numbers", 400)
        for (let i = 0; i < numArr.length; i++) {
            if (!typeof numArr[i] === 'number') {
                throw new ExpressError(f`${numArr[i]}is not a number`, 404)
            }
        }

        // Handle math - https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
        let mode = a => 
        Object.values(
          a.reduce((count, e) => {
            if (!(e in count)) {
              count[e] = [0, e];
            }
            
            count[e][0]++;
            return count;
          }, {})
        ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];

        console.log("ANSDEWR", mode(numArr))      
        let ans = mode(numArr)

        return res.json({ response: {
            operation: "mode",
            value: ans
        } })
      } catch (e) {
        next(e)
      }
    })




app.use('/', router);
// Error Handling: -------------------------------

// 404 handler to be called if no route matches, then pass to global error handler
app.use((req, res, next) => {
    const e = new ExpressError("Page not found :(", 404)
    next(e)
})


app.use("/", router)
// Global Error handler
app.use((err, req, res, next) => {
    let status = err.status || 500;
    let msg = err.msg;

    // Set status and alert user:
    return res.status(status).json({
        error: {msg, status}
    });
});

// App listen to bind server to port and hits callback
app.listen(3000, () => {
    console.log("Server running on port 3000")
  });
