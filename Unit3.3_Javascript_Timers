function countDown(num){
    // Counts down from num until the num is equal to zero
    let counter = num;
    let id = setInterval(function(){
        counter--;
        if (counter === 0) {
            console.log("DONE!")
            return clearInterval(id)
        } else {
            return console.log(counter)
        };
    }, 1000);
}

function randomGame(){
    // Counts the number of times a random number is less than 0.75
    let counter = 0;
    let randomNum = Math.random();
    let id = setInterval(function(){
        counter++;
        if (randomNum > 0.75) {
            console.log(counter);
            return clearInterval(id);
        } else {
            randomNum = Math.random();
        }
    }, 1000)
}
