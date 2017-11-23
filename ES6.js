




/*
 let and const
 let is the same as variable in C. Scorp is block ({}) not omly function
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
    
// 
