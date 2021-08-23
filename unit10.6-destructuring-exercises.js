// obj destructuring 1:
/* What does the following code return/print?

let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

console.log(numPlanets); // ?
console.log(yearNeptuneDiscovered); // ? */

// ANSWER - 8, 1846

// 2 
// ANSWER - {yearNeptuneDiscover: 1846, yearMarsDiscoverd: 1659}

// 3
// ANSWER - 3a = Alejando, purple (it overrides the green default that was set in the function parameters)
// 3b - melissa, green
// 3c - undefined, green

// Array 1
// ANSWER - "Maya", "Marisa", "Chi"

// Array 2
// ANSWER -   "Raindrops on roses",
//   "whiskers on kittens",
//   [ "Bright copper kettles",
//   "warm woolen mittens",
//   "Brown paper packages tied up with strings"
// ]

// Array 3
// ANSWER - [10, 30, 20]

// Vars to Object props:
var obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };
  
const { a, b } = obj.numbers

// Array Swap:
var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;

[arr[0],arr[1]] = [arr[1],arr[0]]

// raceResults();
// Regular
function raceResults(array) {
    return {first, second, third, ...rest};
}

// Oneline:
const raceResultsOneLine = (array) => ({first, second, third, ...rest})