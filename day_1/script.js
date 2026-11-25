/* function showMyMessage() {
  let a = 10;
  var b = 20;
  const c = 30;
  console.log(a + b + c);
  console.log("Hello, this is my first message");

  let myArray = [1, 2, 3, 4, 5];

// 1. pop() - removes the last element (5)
let lastItem = myArray.pop();
console.log("Removed with pop:", lastItem); // 5
console.log("Array after pop:", myArray);   // [1, 2, 3, 4]

// 2. shift() - removes the first element (1)
let firstItem = myArray.shift();
console.log("Removed with shift:", firstItem); // 1
console.log("Array after shift:", myArray);    // [2, 3, 4]

  const person = {
    name: "John",
    age: 30, // <-- Added missing comma here
    isStudent: true,
    college: "XYZ University",
    address: {
      street: "123 Main St",
      city: "Anytown",
      country: "USA"
    }
  };
  

  console.log(person); // Prints the object to the console
}
  */

function showMyMessage() {


    const myArray = [1, 2, 3, 4, 5];

// 1. pop() - removes the last element (5)
let lastItem = myArray.pop();
console.log("Removed with pop:", lastItem); // 5
console.log("Array after pop:", myArray);   // [1, 2, 3, 4]

// 2. shift() - removes the first element (1)
let firstItem = myArray.shift();
console.log("Removed with shift:", firstItem); // 1
console.log("Array after shift:", myArray);    // [2, 3, 4]


function add(a,b) {
    return a + b;
}
let a=10;
let b=20;
let result = add(a,b);
console.log("The sum is: " + result);



function add(name){
    console.log("Hello " + name );
}
add("AADHIDHYA");

const multiply = (x, y) => {
    return x * y;
};

console.log(multiply(5, 3)); // Output: 15

function greet(name,callback) {
    console.log("Hello " + name);
    callback();
}
function sayGoodbye() {
    console.log("Goodbye!");
}
greet("AADHIDHYA", sayGoodbye);

console.log("Task 1");
setTimeout(() => {
    console.log("Task 2");
}, 1000);
console.log("Task 3");

}

/*
Data      Type                                                        	Description	Example

String   	Text wrapped in single, double, or backtick quotes	            "Hello", 'VS Code'
Number  	Both integers and decimal (floating-point) numbers	            42, 3.14, -10
Boolean 	Logical true or false values	true, false
Undefined	A variable that has been declared but not assigned a value	let x; (value is undefined)
Null	    An intentional absence of any value	let y = null;
BigInt  	Very large integers beyond the safe Number limit	12345678901234567890n
Symbol	    A unique, anonymous identifier (often used for object keys)	Symbol("id")

let x = 10;
var y = 20;
const z = 30;

data types in javascript
1. primitives data types
    1. number
    eg: let age = 25;
    2. string
    eg: let name = "John";
    3. boolean
    eg: let isStudent = true;
    4. null
    eg: let emptyValue = null;
    5. undefined
    eg: let notDefined;
    6. symbol
    eg: let uniqueId = Symbol('id');
    7. bigint
    eg: let largeNumber = 1234567890123456789012345678901234567890n;
2. non-primitives data types
    1. object
    2. array
    3. function
*/


