// 1
function filterOutOuts(...nums) {

    return nums.filter((args) => {
      return (args % 2 === 0)
    })
  };
// ANSWER - const filterOutOdds = (...args) => args.filter(v => v % 2 === 0)

// 2

function findMin(...args) {
    const min = args.reduce(function (acc, next){
      return acc < next ? acc : next;
    })
    return min;
  }

//   ANSWER - const findMin = (...arg) => Math.min(...arg)
// 3 - Merge objects
function mergeObject(obj1, obj2) {
    return ({...obj1, ...obj2})
}

// One liner - const mergeObject = (obj1, obj2) => ({...obj1, ...obj2})

// SLICE AND DICE - Ensure to return NEW OBJ or ARRAY not modifiying the inputs

const removeRandom = (item) => {
    let randomIndex = (Math.floor(Math.random()*item.length))
    
    let finalAnswer = [...item.slice(0,randomIndex), ...item.slice(randomIndex +1)]
    return finalAnswer
    
    }

// extend
const extend = (array1, array2) => [...array1, ...array2];

// AddKeyVal
const addKeyVal = (obj, key, value) => {
    let newObj = {...obj}  
    newObj[key] = value;
    return newObj    
  }

//   removeKey
const removeKey = (obj, key) => {
    let newObj = {...obj}
    delete newObj(key);
    return newObj;
}

// combine
const combine = (obj1, obj2) => ({...obj1, ...obj2});

// update
const update = (obj, key, val) => {
    const newObj = { ... obj }
    newObj[key] = val;
    return newObj;
}

