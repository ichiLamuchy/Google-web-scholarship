/*some random notes:

when constructor's prototype was made if it is called without new, without call(), without apply(), and without a context object
That means the value of this inside the function is the global object and NOT the constructor object

arrow functions are only expressions
there's no such thing as an arrow function declaration

Symbol - unique identifier, most often used to uniquery identify properties within an object

 iterable protocol
 for...of 
 
 Map & Set interable
 WeakSet & WeakMap - don't prevent garbage collection
 Map - object, Set - array
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
          
   Set ---------------------------------------------------------------------------------
  
           const games = new Set();
           console.log(games); //Set {}

           const games = new Set([1, 3, 5, 6, 1]);
           console.log(games) // Set {1, 3, 5, 6}  
           When Set is created, any duplication of the entry will be removed

           games.add ('mario')      // add      return Set - no error if you add duplication, just behave as it should
           games.delete (.mario)    // delete   return boolian no error when you try to delete non-existing element, but you see result on return
           games.clear()            // delete all
           game.size                // number of items, the same as length (but Set has no index)
           months.has('September')  // check existance of the el return boolian
           .values()                // method to return the values in a Set, return value is a SetIterator object.
                    The .keys() method will behave the exact same way as the .values() method 
                    by returning the values of a Set within a new Iterator Object. 
                    The .keys() method is an alias for the .values() method for similarity with maps

           Sets are built-in iterables
                    You can use the Set’s default iterator to step through each item in a Set, one by one.
                    You can use the new for...of loop to loop through each item in a Set.
                    
           Using the SetIterator
                   Because the .values() method returns a new iterator object (called SetIterator), 
                   you can store that iterator object in a variable and loop through each item in the Set using .next().
                   const iterator = months.values();
                            iterator.next();
                            Object {value: 'January', done: false}
           for...of loop
   
   WeakSet -------------------------------------------------------------------------------------------
           WeakSet can be picked by gavage collector when you make obj = null;
           not interable
           only object
           do not have .clear method
           if you try to add which is not object, it throws error
           The way you make WeakSet is the same as Set
                   const student1 = { name: 'James', age: 26, gender: 'male' };
                   const student2 = { name: 'Julia', age: 27, gender: 'female' };
                   const student3 = { name: 'Richard', age: 31, gender: 'male' };

                   const roster = new WeakSet([student1, student2, student3]);
                   console.log(roster);
           
   Map ----------------------------------------------------------------------------------------------     
          const employees = new Map();
          use set method  (1st arg - key, 2nd arg is value)
          If you .set() a key-value pair to a Map that already uses the same key, 
          you won’t receive an error, 
          but the key-value pair will overwrite what currently exists in the Map. 
                  
                  const employees = new Map();

                  employees.set('james.parkes@udacity.com', { 
                      firstName: 'James',
                      lastName: 'Parkes',
                      role: 'Content Developer' 
                  });
                  employees.set('julia@udacity.com', {
                      firstName: 'Julia',
                      lastName: 'Van Cleve',
                      role: 'Content Developer'
                  });
          .clear() to remove all
          .delete() a key-value that is not in a Map, you won’t receive an error, 
          and the Map will remain unchanged.return boolian
          .has() method to check if a key-value pair exists in your Map by passing it a key.
          .get()retrieve values from a Map, by passing a key to the .get() method
          
          
          
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
