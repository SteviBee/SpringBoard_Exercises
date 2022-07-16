// add whatever parameters you deem necessary
/***input: Array of nums, single num
 * output: number, reps the amount of pairs of ints in the array that sum to equal this num
 * NO DUPLICATEs - therefore if you find one those are out
 * END CASE = if one number is not equal a sum, if they do then move on
 */

function countPairs(array, target) {
    // Set indexes & answer
    // Sort array therefore if sum is less than target move smaller index up else move larger down
    array.sort((a, b) => a - b)
    let answer = 0;
    let start = 0
    let end = array.length - 1
    // loop - and ID pairs - while my start and end are not crosses
    while (start < end) {
        // if start plus end equal sum then move on - MATCH CASE
        if (array[start] + array[end] === target) {
            console.log("MATCH");
            answer++
            start++
            end--
        } else if (array[start] + array[end] < target) {
            // Don't match case and tested all matches for this number!
            console.log("NO MATCH");
            // testIndex = end
            start++
        } else {
            // finally no matches but maybe still some so move test down
            end--
        }

    }

    // return number of counters
    return answer
}


module.exports = countPairs