// 1 Same keys and values
function createInstructor(firstName, lastName){
    return {
        firstName,
        lastName
    }
  }

// 2 Computed Property
let favoriteNumber = 42;

let instructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite!"
};

// 3 Object Methods
var instructor = {
    firstName: "Colt",
    sayHi(){
      return "Hi!";
    },
    sayBye(){
      return this.firstName + " says bye!";
    }
  }

// 4 
function createAnimal(type, noiseFunc, noise){
    return {
        type, 
        [noiseFunc](){
            return noise;
        }    
    }
}