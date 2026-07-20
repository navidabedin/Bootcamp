  console.log("Hello, World!");
  console.log(typeof "Welcome to the JavaScript file!");
  console.log("This is a sample JavaScript code.");
  console.log(typeof 42);

  const My_variable = {sentence: "This is a variable."};

  console.log(My_variable.sentence.length);

    My_variable.sentence = "This is a new value for the variable.";
    console.log(My_variable.sentence);


console.log(My_variable.sentence.toUpperCase());

console.log(My_variable.sentence.lastIndexOf("ue"));

console.log(My_variable.sentence.slice(20, 23));

console.log(isNaN("Hello"));

let radius = 5;
let area = Math.PI * Math.pow(radius, 2);

console.log(area.toFixed(2)); // "78.54"

/* console.log(Math.floor(Math.random() * 10 + 1));
console.log(Math.floor(Math.random() * 10 + 1));
console.log(Math.floor(Math.random() * 10 + 1));
console.log(Math.floor(Math.random() * 10 + 1));
console.log(Math.floor(Math.random() * 10 + 1));


console.log("NAVID".charAt(Math.floor(Math.random() * 4 + 1)));
console.log("NAVID".charAt(Math.floor(Math.random() * 4 + 1)));
console.log("NAVID".charAt(Math.floor(Math.random() * 4 + 1)));
console.log("NAVID".charAt(Math.floor(Math.random() * 4 + 1)));
console.log("NAVID".charAt(Math.floor(Math.random() * 4 + 1)));
console.log("NAVID".charAt(Math.floor(Math.random() * 4 + 1)));
console.log("NAVID".charAt(Math.floor(Math.random() * 4 + 1))); */


let chicken = false;
let pesto = false;
let reply;

if (chicken && pesto) {
  reply = "Both chicken and pesto are available.";
} else if (chicken || pesto) {
  reply = "Either chicken or pesto is available.";
} else {
  reply = "Neither chicken nor pesto is available.";
}

console.log(reply);






switch (Math.floor(Math.random() * 5 + 1)) {
      case 1:
        console.log("You rolled a one.");
        break;
      case 2:
        console.log("You rolled a two.");
        break;    
      case 3:
        console.log("You rolled a three.");
        break;
      case 4:
        console.log("You rolled a four.");
        break;
      case 5:
        console.log("You rolled a five.");
        break;
                default:
                  console.log("You rolled a number outside the range of 1 to 5.");
}







let navid = 26;
let amir = 27;
let randomValue = Math.floor(Math.random() * 30 + 1);

switch (true) {
  case randomValue === navid:
    console.log("Navid is 26 years old.");
    break;

  case randomValue === amir:
    console.log("Amir is 27 years old.");
    break;

  case randomValue > amir:
    console.log("not Amir");
    break;

  case randomValue < navid:
    console.log("not Navid");
    break;
}

console.log(randomValue);

//condition ? if true : if false

let soup= "chicken soup";
let iscustomerbanned;

let soupaccess = iscustomerbanned

? "Sorry, you are banned from ordering soup."
: soup
? `Here is your ${soup}.`
: "Sorry, we are out of soup.";

console.log(soupaccess);




let palyer1 = "paper";
let player2 = "scissors";

let winner = (palyer1 === player2) ? "It's a tie!" :
  (palyer1 === "rock" && player2 === "scissors") ||
  (palyer1 === "paper" && player2 === "rock") ||
  (palyer1 === "scissors" && player2 === "paper")

  ? "Player 1 wins!"
  : "Player 2 wins!";

  console.log(winner);


/* alert("Welcome to the JavaScript file!");

confirm("ok==>true \ncancel==>false"); */

/* let userInput = prompt("Please enter your name:"); */

/* console.log(userInput ?? "no name entered"); */

/* if (userInput) {
  console.log(`Hello, ${userInput.trim()}!`);
  console.log(userInput.trim().length);
} 
else {
  console.log("Hello, guest!");
} */



/*  let mynumber = 0;
while (mynumber < 3) {
  console.log(`The number is ${mynumber}`);
  mynumber++;
}  */



/* for (let i = 2; i <= 6; i++) {
  console.log(i);
} */


  let name = "navidabedin";
  let counter = 0;
  let myletter;

  while (counter <= 10) {

    myletter = name[counter];
    console.log(myletter);
    if (counter === 1) {
      counter += 2;
      continue;
    }
                                      /* if (myletter === "v") {
                                        break;
                                      } */
    counter++;
  }
   

  //built-in function
  console.log(
  "Navid".toLowerCase(),
  "Navid".toUpperCase(),
  "Navid".charAt(2)
  );


  function sum(num1, num2) {
    return num1 * num2;
  }

  console.log(sum(5, 2));


  function inputemail(email) {
    /* (email) => */

    if (email.includes("@")) {
      return email.slice(0, email.indexOf("@"));
    } else {
      return "Invalid email address.";
    }
  }

  console.log(inputemail("kamranabedin@example.com"));



  //array --- push, unshift, [pop, shift], indexOf, lastIndexOf, includes, slice, splice(delete & replace), (join & split) , concat

  let myarray = ["apple", "tomato", "potato", "banana", "cherry"];

  myarray.splice(2, 1, "orange", "grape");

  console.log(myarray);




//object
//key-value pairs in curly braces
const myobj ={name:"Navid"}

console.log(myobj);
console.log(myobj.name);

const myobj2 = {
  name: "Navid",
  age: 26,
  education: "Bachelor's degree",
  hobbies: ["reading", "traveling", "coding"],
  action: function() {
    return `This is ${this.hobbies[2]} Time.`;
    // this.hobbies[2] refers to the third element in the hobbies array of the myobj2 object.
  }
}

console.log(myobj2.hobbies[1]);
console.log(myobj2.action());




const vehicle = {
  wheels: 4,
  engine: function () {
    return "Vrroooom!";
  }
};

const truck = Object.create(vehicle); // Create a new object truck that inherits from vehicle(prototype chain)

truck.doors = 2;

console.log(truck);
console.log(truck.wheels);
console.log(truck.engine());


//2

const myobj3 = {
  name: "Navid",
  age: 26,
  location: "Iran",
  weight: 90,
  height: 185,
}


for (let key in myobj3) {
  console.log(`${key}: ${myobj3[key]}`);
}






class Pizza {
  constructor(Psize, Pcrust, Ptoppings) {
    this.size = Psize;
    this.crust = Pcrust;
    this.toppings = Ptoppings;
  }

  getcrust() {
    return this.crust;
  }
  setcrust(newCrust) {
    this.crust = newCrust;
  }

  bake() {
    console.log(`Baking a ${this.size} pizza with ${this.crust} crust and ${this.toppings.join(", ")} toppings.`);
  }

}

const myPizza = new Pizza("large", "thin", ["pepperoni", "mushrooms", "green peppers"]);
myPizza.bake();













class CoffeeBlend {
  constructor(type, weightKg, roastLevel = "medium") {
    this.type = type;
    this.weightKg = weightKg;
    this.roastLevel = roastLevel;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    const validTypes = ["100robusta", "100arabica", "70-30"];
    if (!validTypes.includes(value.toLowerCase())) {
      throw new Error("نوع قهوه نامعتبر است.");
    }
    this._type = value.toLowerCase();
  }

  get weightKg() {
    return this._weightKg;
  }

  set weightKg(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("وزن نامعتبر است.");
    }
    this._weightKg = value;
  }

  get roastLevel() {
    return this._roastLevel;
  }

  set roastLevel(value) {
    const validRoasts = ["light", "medium", "dark"];
    if (!validRoasts.includes(value.toLowerCase())) {
      throw new Error("رست نامعتبر است.");
    }
    this._roastLevel = value.toLowerCase();
  }

  getComposition() {
    const map = {
      "100robusta": { robusta: 100, arabica: 0, pricePerKg: 300000 },
      "100arabica": { robusta: 0, arabica: 100, pricePerKg: 500000 },
      "70-30": { robusta: 70, arabica: 30, pricePerKg: 380000 }
    };

    return map[this.type];
  }

  calculateTotalPrice() {
    return this.weightKg * this.getComposition().pricePerKg;
  }

  getSummary() {
    const data = this.getComposition();

    return `
type: ${this.type}
roast level: ${this.roastLevel}
weight: ${this.weightKg} kg
robusta: ${data.robusta}%
arabica: ${data.arabica}%
price per kg: ${data.pricePerKg}
total price: ${this.calculateTotalPrice()}
    `;
  }
}

const coffee1 = new CoffeeBlend("100robusta", 10, "dark");
console.log(coffee1.getSummary());

const coffee2 = new CoffeeBlend("100arabica", 15, "medium");
console.log(coffee2.getSummary());

const coffee3 = new CoffeeBlend("70-30", 20, "light");
console.log(coffee3.getSummary());




// JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is often used to transmit data between a server and a web application as text.

const myObject = {
  name: "Navid",
  hobbies: ["reading", "swimming","coding"],
  city: "Tehran",
  hello: function() {
    console.log("Hello, World!");
  }
};


mysendjson = JSON.stringify(myObject); // Convert the JavaScript object to a JSON string
console.log(mysendjson);

myrecievedjson = JSON.parse(mysendjson); // Convert the JSON string back to a JavaScript object
console.log(myrecievedjson);
console.log(myrecievedjson.hobbies[2]);



/* let age=25;
if (age >=18)  {
  console.log("You are qualified")
} */



//error handling

/* const makeError = () => {
  try {
    const name = "Navid";
    name = "Amir"; // This will throw an error because 'name' is a constant
  } catch (error) {
    console.log("An error occurred:", error.message);
    console.error("Stack trace:", error.stack);
  }
}
  makeError();
 */


  //DOM (Document Object Model) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.

  //DOM manipulation

/* const view1 = document.getElementById("view1");
console.log(view1);

const view2 = document.querySelector("#view2");
console.log(view2);

const views = document.getElementsByClassName("view");
console.log(views);
 */





