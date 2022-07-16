// add whatever parameters you deem necessary
/***
 * output:  true / false
 * fn - check if entire char is somewhwer in words
 * will prob need to move indexes slightly up 
 */

function isSubsequence(char, words) {
    // create indexes at start and start + 1 for words
    let startWords = 0
    let charStart = 0

    if (!char) {
        return true;
    }
    // loop over words to see if char is in there
    while (startWords < words.length) {
        console.log("all the stuff", charStart, startWords, char[charStart], words[startWords]);
        if (char[charStart] === words[startWords]) {            
            charStart += 1
        } 
        
        // If we move character index all the way to end then we found it!
        if (charStart === char.length) {
            return true
        }
        startWords += 1
        // If first letter matches then go to next letter for both
    }
    return false

}


module.exports = isSubsequence