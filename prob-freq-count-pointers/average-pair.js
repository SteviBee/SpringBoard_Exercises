
// INPUT: sorted array of numbers and average number.
// OUTPUT: true / false if pair of numbers to make average
// add whatever parameters you deem necessary
function averagePair(array, avg) {
    let left = 0
    let right = array.length - 1
    if (array.length === 0) {
        return false
    }

    while (left < right) {
        
        let testAvg = (array[right] + array[left]) / 2
        if (testAvg === avg) {
            return true
        } else if (testAvg < avg) {
            left ++
        } else  {            
            right --
        }
    }
    return false
}

module.exports = averagePair