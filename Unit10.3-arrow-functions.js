// 1
const double = arr => arr.map((val) => (val * 2))
// 2
// Replace ALL functions with arrow functions:

// function squareAndFindEvens(numbers){
//   var squares = numbers.map(function(num){
//     return num ** 2;
//   });
//   var evens = squares.filter(function(square){
//     return square % 2 === 0;
//   });
//   return evens;
// }

const squareAndFindEvens = nums => {

    const squared = nums.map((val) => {
        return val ** 2
    })

    const evens = squared.filter((squared) => {
        return squared % 2 === 0;
    })

    return evens;

}