/**
 * Surname     | Firstname | Contribution % | Any issues?
 * =====================================================
 * Person 1... |           | 25%            |
 * Person 2... |           | 25%            |
 * Person 3... |           | 25%            |
 * Person 4... |           | 25%            |
 *
 * Please do not hesitate to contact your tutors if there are
 * issues that you cannot resolve within the group.
 *
 * Complete Worksheet 4 by entering code in the places marked below...
 *
 * For full instructions and tests open the file worksheetChecklist.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file (main.ts), save it, build it, and reload the
 * browser window to run the test.
 */

/**
 * Replace references to IMPLEMENT_THIS with your code!
 */
 const IMPLEMENT_THIS: any = undefined;

 /**
  *  Exercise 1 - General Purpose infinite sequence function
  */
 
 interface LazySequence<T> {
   value: T;
   next(): LazySequence<T>;
 }
 
 // Implement the function:
 function initSequence<T>(transform: (value: T) => T): (initialValue: T) => LazySequence<T> {
   const tail = (initialValue: T) => {
     return {
       value: initialValue,
       next: () => tail(transform(initialValue))
     }
   }
   return tail;
 }

// const yourNaturals = initSequence((v) => v + 1);
// let gen2 = yourNaturals(0);
// let val1 = 0;
// for (let i = 0; i < 10; i++) {
//   val1 += 1;
//   gen2 = gen2.next();
//   console.log(gen2);
// }
 
 /**
  *  Exercise 2 - map, filter, take, reduce
  */
 
 function map<T, V>(func: (v: T) => V, seq: LazySequence<T>): LazySequence<V> {
   if(!seq){
    return IMPLEMENT_THIS;
   }
   return{
    value: func(seq.value),
    next: () => map(func, seq.next())
  }
 }
 
 function filter<T>(func: (v: T) => boolean, seq: LazySequence<T>): LazySequence<T> {
    if(!seq){
      return IMPLEMENT_THIS;
    }
    return func(seq.value) ? {value: seq.value, next: () => filter(func, seq.next())} : filter(func, seq.next());

 }
 
 /**
  * Creates a sequence of finite length (terminated by undefined) from a longer or infinite sequence.
  * Take returns a sequence that contains the specified number of elements of the sequence, and then 'undefined'.
  * That is, the next attribute of the last element in the returned sequence, will be a function that returns 'undefined'.
  *
  * @param n number of elements to return before returning undefined
  * @param seq the sequence
  */
 function take<T>(n: number, seq: LazySequence<T>): LazySequence<T> | undefined {
   if (n <= 0) {
     return undefined;
   }
 
   return {
     value: seq.value,
     /**
      * We have to cast the type here due to the limitations of the TypeScript type system.
      * If you have to type cast something, make sure to justify it in the comments.
      */
     next: () => take(n - 1, seq.next()) as LazySequence<T>,
   };
 }
 
 /**
  * reduce a finite sequence to a value using the specified aggregation function
  * @param func aggregation function
  * @param seq either a sequence or undefined if we have reached the end of the sequence
  * @param start starting value of the reduction past as first parameter to first call of func
  */
 function reduce<T, V>(func: (_: V, x: T) => V, seq: LazySequence<T> | undefined, start: V): V {
  if(!seq){
   return start;
  }
  const temp = func(start, seq.value)
  return reduce(func, seq.next(), temp)
 }
 
 function reduceRight<T, V>(f: (_: V, x: T) => V, seq: LazySequence<T> | undefined, start: V): V {
  if(!seq){
    return start;
  }
  if(seq.next()){
    return f(reduceRight(f, seq.next(), start), seq.value)
  }else{
    const temp = f(start, seq.value)
    return reduceRight(f, seq.next(), temp);
  }
 } 
 /**
  *  Exercise 3 - Reduce Practice
  */
 
 function maxNumber(lazyList: LazySequence<number>): number {
   // ******** YOUR CODE HERE ********
   // Use __only__ reduce on the
   // lazyList passed in. The lazyList
   // will terminate so don't use `take`
   // inside this function body.
   return maxNumberHelper(lazyList, -1);
 }
 function maxNumberHelper(lazyList: LazySequence<number>, maxNum: number): number {
   if(!lazyList){
     return maxNum;
   }
   return maxNumberHelper(lazyList.next(), lazyList.value > maxNum ? lazyList.value : maxNum);
  } 

 function lengthOfSequence(lazyList: LazySequence<any>): number {
   // ******** YOUR CODE HERE ********
   // Again only use reduce and don't
   // use `take` inside this function.
   return lengthOfSequenceHelper(lazyList, 0);
 }

 function lengthOfSequenceHelper(lazyList: LazySequence<any>, len: number): number {
  if(!lazyList){
    return len;
  }
  return lengthOfSequenceHelper(lazyList.next(), len+ 1);
 }
 
 function toArray<T>(seq: LazySequence<T>): T[] {
   // ******** YOUR CODE HERE ********
   // Again only use reduce and don't
   // use `take` inside this function.
   return reduce((ar: Array<T>, current: T) => ar.concat(current), seq, []);
 }
 
 /**
  *  Exercise 4 - Lazy Pi Approximations
  */
function denominator(n: number): number {
  const sign = n % 2 == 0 ? 1 : -1;
  return sign *(2*n - 1);
}

//  function exercise4Solution(seriesLength: number): number {
//    // Your solution using lazy lists.
//    // Use `take` to only take the right amount of the infinite list.
//    return reduce((accumlator: number, n: number): number => accumlator + n,
//     (map(denominator(take(n, initSequence((x: number): number => x + 1)(1))))), 0);
//  }
 
