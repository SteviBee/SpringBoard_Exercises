


function guessingGame(guess) {
    let _secertNum = Math.floor(Math.random() * 100)
    let guesses = 0
    let gameOver = false
    
    return function innerFn(guess) {
        guesses++
        if (_secertNum === guess && gameOver === false) {
            gameOver = true
            return `You win! You found ${guess} in ${guesses} guesses.`
            
        } else if (_secertNum < guess) {
            return `${guess} is too high!`
        } else if (_secertNum > guess) {
            return `${guess} is too low!`
        } else {
            return "The game is over, you already won!"
        }
    }

}

module.exports = { guessingGame };
