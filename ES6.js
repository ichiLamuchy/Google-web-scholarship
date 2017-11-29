/*some random notes:

when constructor's prototype was made if it is called without new, without call(), without apply(), and without a context object
That means the value of this inside the function is the global object and NOT the constructor object

arrow functions are only expressions
there's no such thing as an arrow function declaration

Symbol - unique identifier, most often used to uniquery identify properties within an object

 iterable protocol
 for...of 
*/





/*
 let and const ------------------------------------------------------------------
         let is the same as variable in C. Scorp is block ({}) not only function
         let can be reassigned, but can’t be redeclared in the same scope
         const can't be reassigned in the same scope, but can’t be redeclared in the same scope
 
 Template Literals ---------------------------------------------------------------
         Denoted with backticks ( `` ) with ${expression}  
         no need \n just print as you write
         
 Class ----------------------------------------------------------------------------
         JS uses function to create objects and links objects together by prototype inheritance.
         This class is just a fake - under neath it it's just regular function and prototype inheritance.
         using class, constructor then add method (as prototype) within the class
         parameter of constructer will be the parameter of the class
         the type of "class" is function
         static method can be included, it's accessed directly on the class
         extends keyword to set itself as a "subclass"
                  To get from the "subclass" to the parent class, the super keyword is used.
                  For constructor method, super is used as a function. (super (primitive1, primitive2))
                  In method, super is used as an object.   (super.methodName())
                  super must be called before this (obviously)
                  
   Symbols -----------------------------------------------------------------------------------------
          Symbol() with an optional string as its description
                  const sym1 = Symbol('apple');
                  console.log(sym1);   // Symbol(aple)
                  
   Iterator Protocol with Symbol ------------------------------------------------------    
          In order for an object to be iterable, it must implement the iterable interface
          iterator method, which is available via the constant [Symbol.iterator]
                  zero argument & return an interator object
          An object becomes an iterator when it implements the .next()
                  zero argument & return value (next value) and done (true - the end)
          
          An interable must be an object with a function iterator whose key is Symbol.iterator.
                  const iterable = {
                        [Symbol.iterator](): iterator
                  }
          An iterator must be an object with a function named next
                  const iterator = {
                         next() {
                         value: any,
                         done: boolean
                         }
                  }
          const iterator = array[Symbol.iterator]() // interatoe which allow us to interate
          brilliant explanation at https://medium.freecodecamp.org/demystifying-es6-iterables-iterators-4bdd0b084082
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
functions:--------------------------------------------------------------------------------------------
  basic:
        => called the arrow function. left side is the parameter, right side is return
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

If you need more than just a single line of code, then you can use the "block body syntax"
block syntax need to return!!!.
*/
              const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
                name = name.toUpperCase();
                return `${name} has ${name.length} characters in their name`;
              });

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

// Class (example) - basic ---------------------------------------------------------------
        
       class Plane {
         constructor(numEngines) {             // initializing new object - constructor
           this.numEngines = numEngines;
           this.enginesActive = false;
         }

          static badWeather(planes) {          // use like Plane.badWeather([plane1, plane2, plane3]);
            for (plane of planes) {
              plane.enginesActive = false;
            }
          }

         startEngines() {                       // inherit method - prototype
           console.log('starting engines…');
           this.enginesActive = true;
         }
       }
       
       var richardPlane = new Plane (1);
       richardPlane.startEngines ();
       
       var jamesPlane = new Plane (4);
       jamesPlane.startEngines ();
       
// Class (example) - extends class ------------------------------------------------------------------

        class Tree {
          constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
            this.size = size;
            this.leaves = leaves;
            this.leafColor = null;
          }

          changeSeason(season) {
            this.leafColor = this.leaves[season];
            if (season === 'spring') {
              this.size += 1;
            }
          }
        }

        class Maple extends Tree {
          constructor(syrupQty = 15, size, leaves) {
            super(size, leaves);
            this.syrupQty = syrupQty;
          }

          changeSeason(season) {
            super.changeSeason(season);
            if (season === 'spring') {
              this.syrupQty += 1;
            }
          }

          gatherSyrup() {
            this.syrupQty -= 3;
          }
        }

        const myMaple = new Maple(15, 5);
        myMaple.changeSeason('fall');
        myMaple.gatherSyrup();
        myMaple.changeSeason('spring');

//Symbol interator (example) ----------------------------------------------------

        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const arrayIterator = digits[Symbol.iterator]();

        console.log(arrayIterator.next());
        console.log(arrayIterator.next());
        console.log(arrayIterator.next());
        // returns 
        // Object {value: 0, done: false}
        // Object {value: 1, done: false}
        // Object {value: 2, done: false}

// Your own Symbol interator *****************************************************

        const iterable = {
            data: ['foo','bar'],
            next() {
                return {
                    done: this.data.length === 0,
                    value: this.data.pop()
                }
            },
            [Symbol.iterator]() {
                // Return the iterable itself.
                return this
            }
        }

//+++++++++++++++++++++++++++++++Unless you've got a strong reason to use array defaults with array destructuring, we recommend going with object defaults with object destructuring!
