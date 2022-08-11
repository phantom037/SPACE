// Surname     | Firstname | Contribution % | Any issues?
// =====================================================
// Person 1... |           | 25%
// Person 2... |           | 25%
// Person 3... |           | 25%
// Person 4... |           | 25%
//
// complete Worksheet 2 by entering code in the places marked below...
//
// For full instructions and tests open the file worksheetChecklist.html
// in Chrome browser.  Keep it open side-by-side with your editor window.
// You will edit this file (main.js), save it, and reload the
// browser window to run the test.

/**
 * Exercise 1
 */
 let myObj = new Object();
 myObj.aProperty = "Apple";
 myObj.anotherProperty = 14;
 
 //console.log(myObj);
 
 /**
  * Exercise 2
  */
 
  const operationOnTwoNumbers = function(f) {
     return function(x) {
         return function(y) {
             return f(x,y);
         };
     };
 };
 
 //const add = operationOnTwoNumbers((x,y) => x + y)
 //const addNine = add(9)(3)
 //console.log(addNine)
 
 /**
  * Exercise 3
  */
 
 function callEach(array){
     array.forEach(element => {
         element();
     });
 }
 
 //const fn1 = _ => console.log("Hey!");
 //const fn2 = _ => console.log("Cool!");
 //callEach([fn1, fn2]);
 
 /**
  * Exercise 4
  */
 function addN(n, array){
    const add = operationOnTwoNumbers((x,y) => x + y);
     let arr = [];
     array.map(value => {
         arr.push(add(value)(n));
     });
     return arr;
 }
 
 function getEvens(array){
     let arr = [];
     array.filter(value => {
         if(value % 2 === 0){
             arr.push(value);
         }    
     });
     return arr;
 }

 function multiplyArray(array){
     let product = 1;
     array.map(value =>{
        if(value !== 0){
            product *= value;
        }
     });
     return product;
 }
 //const result2 = multiplyArray(10);
 //console.log(result2);
 
 /**
  * Exercise 5
  */
function range(n){
    let i = n - 1;
    if (i >= 0) {
       return range(i).concat(i);
    } else {
       return [];
  }
}
//console.log(range(5));
 
 /**
  * Exercise 6
  */
 function Euler1(){
    return range(1000).filter(item => item % 3 === 0 || item % 5 === 0)
    .reduce((result, item) => { 
        return result + item;
    }, 0);
 }
 const result3 = Euler1;
 console.log(result3);
 
 /**
  * Exercise 7
  */
  function infinite_series_calculator(accumulate){
        return function(predicate){
            return function(transform){
                return function(n){
                    return range(n)
                    .filter(x => predicate(x))
                    .map(x => transform(x))
                    .reduce((acc,x) => accumulate(acc, x))
                }
            }
        }
}

 
 /**
  * Exercise 8
  */
 function calculatePiTerm(n){
    return(4*n**2)/(4*n**2 - 1);
 }

 function skipZero(n){
    return n !== 0;
 }

 function productAccumulate(x,y){
    return x * y;
 }
 
 function calculatePi(n){
    
 }
 /**
  * Exercise 9
  */
 function factorial(n){
    if(n === 0){
        return 1;
    }else{
        return n * factorial(n - 1);
    }
 }

 function calculateETerm(n){
    return 2*(n + 1)/ factorial(2n + 1)
 }

 function sumAccumulate(x, y){
    return x + y;
 }

 function alwaysTrue(){
    return true;
 }
 
 /**
  * Exercise 10
  */
