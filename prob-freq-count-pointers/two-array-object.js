// add whatever parameters you deem necessary
/**
 * INPUT: two arrays - 1st = keys, 2nd = values 
 * OUTPUT: object combining the two
 * EDGE CASES: 
 * - not enough values then set keys to NULL,  
 * - not enough keys then ignore
 */


function twoArrayObject(keysArray, valsArray) {
    let keysIndex = 0
    let valsIndex = 0
    let answer = {}

    while ((keysArray.length > keysIndex || valsArray.length > valsIndex) > 0) {

        let k = keysArray[keysIndex]
        let v = valsArray[valsIndex]
        if (keysArray.length === keysIndex) {
            return answer
        } else if (valsArray.length === valsIndex) {
            answer[k] = null
        } else {
            answer[k] = v
        }
        keysIndex++
        valsIndex++
    }
    return answer
}


module.exports = twoArrayObject