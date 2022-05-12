import { remove, choice } from "./helpers";
import fruits from "./foods"


let randFruit = choice(fruits)
console.log("I’d like one RANDOMFRUIT, please", randFruit)
console.log("Here you go: RANDOMFRUIT, randFruit")
console.log("Delicious! May I have another?", randFruit)
console.log("removed", randFruit, "now fruits is: ", remove(fruits, randFruit))