// Part one:
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return "Beep."
    }

    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}`
    }    
}

let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
myFirstVehicle.honk(); // "Beep."
myFirstVehicle.toString()

// Part Two
class Car extends Vehicle {
    constructor(make, model, year){
        super(make, model, year)
        this.numWheels = 4;
    }
}

let myFirstCar = new Car("Toyota", "Corolla", 2005);
myFirstCar.toString(); // "The vehicle is a Toyota Corolla from 2005."
myFirstCar.honk();     // "Beep."
myFirstCar.numWheels;  // 4

// Part Three
class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year)
        this.numWheels = 2;
    };
    revEngine() {
        return "VROOM!!!";
    }
}

let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);

myFirstMotorcycle.toString();
// "The vehicle is a Honda Nighthawk from 2000."

myFirstMotorcycle.honk();     // "Beep."
myFirstMotorcycle.revEngine(); // "VROOM!!!"
myFirstMotorcycle.numWheels;  // 2

// Part Four
class Garage {
    constructor(capacity) {        
        this.vehicles = []
        this.capacity = capacity
        
        // Validate data - check capacity 
        // console.log(this.vehicles.length)
        // if (this.vehicles.length > capacity) {
        //     throw new Error ("Sorry, we are full")
        // }
    }
    add(veh) {
//       checking capacity 
        console.log(this.vehicles.length)
        if (this.vehicles.length >= this.capacity){
            return "Sorry, we are full!"
        } else if (!(veh instanceof Vehicle)) {
            return "Only vehicles are allowed in here!"
        } else {
//           Add name of obj to array
          this.vehicles.push(veh.constructor.name)
          return "Vehicle added!";
        }
    }
}

let garage = new Garage(2);
garage.vehicles; // []
garage.add(new Car("Hyundai", "Elantra", 2015)); // "Vehicle added!"
garage.vehicles; // [Car]
garage.add("Taco"); // "Only vehicles are allowed in here!"

garage.add(new Motorcycle("Honda", "Nighthawk", 2000));
// "Vehicle added!"
garage.vehicles; // [Car, Motorcycle]

garage.add(new Motorcycle("Honda", "Nighthawk", 2001));
// "Sorry, we're full."