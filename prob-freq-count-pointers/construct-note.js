/**Write a function called constructNote, which accepts two strings, 
 * a message and some letters. The function should 
 * return true if the message can be built with the letters that you are given; 
 * otherwise, it should return false.

Assume that there are only lowercase letters and no space or special characters in both the message and the letters. */

// Frequency Tracker:
function ltrFreq(str) {
    let frequencies = new Map()
    for (let key of str) {
        let valueCount = frequencies.get(key) || 0
        frequencies.set(key, valueCount + 1)
    }
    return frequencies

}

// add whatever parameters you deem necessary
function constructNote(msg, ltrs) {
    if (msg === "") {
        return true
    }
    if (ltrs === "") {
        return false
    }
    // frequency tracker set - get get broken down into frequency 
    let msgFreq = ltrFreq(msg)
    let ltrsFreq = ltrFreq(ltrs)
  
    // find if each letter is in the msg
    for (let key of msgFreq.keys()) {      
       
        
        if (!ltrsFreq.has(key)) {
            return false
        }     

        // check if msg frequecny value is great than the ltrs bank therefore we can't make word
        if (msgFreq.get(key) > ltrsFreq.get(key)) {
            return false
        }
    }

    // OUTPUT: return true if msg can be built from ltrs
    return true


}

module.exports = constructNote