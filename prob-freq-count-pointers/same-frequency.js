// add whatever parameters you deem necessary

function Freq(num) {
    let str = num.toString()
   
    let frequencies = new Map()
    for (let key of str) {
       
        let valueCount = frequencies.get(key) || 0
        frequencies.set(key, valueCount + 1)
    }
    return frequencies

}

function sameFrequency(num1, num2) {
    // create the mapped numbers and frequency
    n1 = Freq(num1)
    n2 = Freq(num2)
    
    if (num1 === num2) {
        return true
    }

    for (let key of n1.keys()) {
        
        if (!n2.has(key)) {
            return false
        }
        if (n1.get(key) !== n2.get(key)) {
            return false
        }
    }
    return true
}

module.exports = sameFrequency
