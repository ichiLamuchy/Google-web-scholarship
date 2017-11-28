/*some random notes:

when constructor's prototype was made if it is called without new, without call(), without apply(), and without a context object
That means the value of this inside the function is the global object and NOT the constructor object


*/



//arrow functions are only expressions
//there's no such thing as an arrow function declaration




/*
 let and const
 let is the same as variable in C. Scorp is block ({}) not only function
 let can be reassigned, but can’t be redeclared in the same scope
 const can't be reassigned in the same scope, but can’t be redeclared in the same scope
 
 Template Literals
 Denoted with backticks ( `` ) with ${expression}  
 no need \n just print as you write
 
*/


// Destructuring

      // Destructuring values from an array
          const point = [10, 25, -34];
          const [x, y, z] = point;

      // get only colore
         const things = ['red', 'basketball', 'paperclip', 'green', 'computer', 'earth', 'udacity', 'blue', 'dogs'];
          const [one, , , two, , , ,three] = things;

          const colors = `List of Colors
          1. ${one}
          2. ${two}
          3. ${three}`;
          console.log(colors);
      
      // Object literal shorthand
          let type = 'quartz';
          let color = 'rose';
          let carat = 21.29;

          let gemstone = {
            type,
            color,
            carat,
            calculateWorth() { ... }
          };
      
// for of loop
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (const digit of digits)
    
/*
functions:
  basic:
    => called the arrow function. left seide ois the parameter, right side is return
    if oter than 1 parameter presnted, you use ()
       () => console.log('Hello Udacity Student!');
       
       const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
       orderIceCream('chocolate', 'waffle');
       
   If there's no parameter to the function, you just use a pair of empty parentheses. 
   Alternatively, some developers choose to use an underscore as their single parameter. 
   The underscore never gets used, so it's undefined inside the function, but it's a common technique
    
    
    */
    const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
      name => name.toUpperCase()
    );
           
           
    /*
    The concise body syntax
         has no curly braces surrounding the function body
         and automatically returns the expression.
         
    If you need more than just a single line of code, then you can use the "block body syntax".
*/
              const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
                name = name.toUpperCase();
                return `${name} has ${name.length} characters in their name`;
              });

/*
Important things to keep in mind with the block syntax:
        it uses curly braces to wrap the function body & need return

    */

/* 
this
        With regular functions, 
                the value of this is set based on how the function is called. 
        With arrow functions,
                the value of this is based on the function's surrounding context. 
                In other words, the value of this inside an arrow function is the same as the value of this outside the function.
*/


// Default function parameters

function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

//Combine Defaults and destructuring arrays

function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid

createGrid(); // throws an error

function createGrid([width = 5, height = 5] = []) { 
  return `Generating a grid of ${width} by ${height}`;
}
           

//Array defaults vs. object defaults
function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
//With this function setup, 
//if you want to use the default number of scoops but change the toppings, 
//you'd have to call your function a little...oddly:

createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);

//+++++++++++++++++++++++++++++++Unless you've got a strong reason to use array defaults with array destructuring, we recommend going with object defaults with object destructuring!
