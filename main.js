/**
 * Surname     | Firstname | Contribution % | Any issues?
 * =====================================================
// Person 1... | Nail          | 33.3%
// Person 2... | Thanh          | 33.3%
// Person 3... | Arian    | 33.3%
 * 
 *
 * Please do not hesitate to contact your tutors if there are
 * issues that you cannot resolve within the group.
 *
 * Complete the worksheet by entering code in the places marked below...
 *
 * For full instructions and tests open the file worksheetChecklist.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file, save it, compile it, and reload the
 * browser window to run the test.
 */


// Stub value to indicate an implementation
const IMPLEMENT_THIS: any = undefined;

/*****************************************************************
 * Exercise 1
 */

function addStuff(a: number, b: number) {
  return a + b;
}
function numberToString(input: String) {
  return JSON.stringify(input);
}

/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: unknown) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"

// What's the type of arg0 and arg1?
function curry(f: Function) {
  return function (x: number) {
    return function (y: number) {
      return f(x, y);
    };
  };
}

/*****************************************************************
 * Exercise 2: implement the map function for the cons list below
 */


/**
 * A ConsList is either a function created by cons, or empty (null)
 */
type ConsList<T> = Cons<T> | null;

/**
 * The return type of the cons function, is itself a function
 * which can be given a selector function to pull out either the head or rest
 */
type Cons<T> = (selector: Selector<T>) => T | ConsList<T>;

/**
 * a selector will return either the head or rest
 */
type Selector<T> = (head: T, rest: ConsList<T>) => T | ConsList<T>;

/**
 * cons "constructs" a list node, if no second argument is specified it is the last node in the list
 */
function cons<T>(head: T, rest: ConsList<T>): Cons<T> {
  return (selector: Selector<T>) => selector(head, rest);
}

/**
 * head selector, returns the first element in the list
 * @param list is a Cons (note, not an empty ConsList)
 */
function head<T>(list: Cons<T>): T {
  if (!list) throw new TypeError("list is null");
  return <T>list((head, rest?) => head);
}

/**
 * rest selector, everything but the head
 * @param list is a Cons (note, not an empty ConsList)
 */
function rest<T>(list: Cons<T>): ConsList<T> {
  if (!list) throw new TypeError("list is null");
  return <Cons<T>>list((head, rest?) => rest);
}

/**
 * Use this as an example for other functions!
 * @param f Function to use for each element
 * @param list Cons list
 */
function forEach<T>(f: (_: T) => void, list: ConsList<T>): void {
  if (list) {
    f(head(list));
    forEach(f, rest(list));
  }
}

/**
 * Implement this function! Also, complete this documentation (see forEach).
 */
function map<T, V>(f: (_: T) => V, l: ConsList<T>): ConsList<V> {
  if(l){
    return <ConsList<V>> (
      cons<V>( f(head(l)),
      map(f,rest(l)))
    )
  }
  return null;
}

/*****************************************************************
 * Exercise 3
 */

// Example use of reduce
function countLetters(stringArray: string[]): number {
  const list = fromArray(stringArray);
  return reduce((len: number, s: string) => len + s.length, 0, list);
}

function fromArray<T>(arr: T[]): ConsList<T>{
  if(arr.length !== 0){
    return <ConsList<T>> (
      cons<T>(arr[0], fromArray(arr.slice(1)))
    )
  }
  return null;
}

function reduce<T,V>(f: (accumulator: V, t: T) => V, inital: V ,list: ConsList<T>): V{
  if(list){
    const temp = f(inital, head(list))
    return reduce(f, temp, rest(list));
  }
  return inital;
}

let list123 = cons(1, cons(2, cons(3, cons(9, null))));
console.log(reduce(
  (x, y) => {
    //console.log(x, y);
    return y-x;
  },
  0,
  list123
));

function reduceRight<T,V>(f: (accumulator: V, t: T) => V, inital: V ,list: ConsList<T>): V{
  let temp = reverse(list);
  return reduce(f, inital, temp);
}

function filter<T>(f: (_: T) => T,list: ConsList<T>): Cons<T>{
  if(list){
      if(f(head(list))){
          return cons<T>(head(list), filter(f, rest(list)));
      }else{
          return filter(f, rest(list));
      }
  }
  return null;
}

function concat<T>(list1: ConsList<T>, list2: ConsList<T>): ConsList<T>{
  if(list1){
    return cons<T>(head(list1), concat(rest(list1), list2));
  }
  return list2;
}

function reverse<T>(list: ConsList<T>): ConsList<T>{
  const arr = convertListToArray(list);
  return fromArray(arr.reverse()); 
}

function convertListToArray<T>(node: ConsList<T>): T[] {
  let curNode = node;
  const values: T[] = [];
  while (curNode !== null) {
    values.push(head<T>(curNode));
    curNode = rest<T>(curNode);
  }
  return values;
}

/*****************************************************************
 * Exercise 4
 * 
 * Tip: Use the functions in exercise 3!
 */

/**
 * A linked list backed by a ConsList
 */
class List<T> {
  private readonly head: ConsList<T>;

  constructor(list: T[] | ConsList<T>) {
    if (list instanceof Array) {
      // IMPLEMENT THIS. What goes here ??
      this.head = fromArray(list);
    } else {
      // nullish coalescing operator
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
      this.head = list ?? null;
    }
  }

  /**
   * create an array containing all the elements of this List
   */
  toArray(): T[] {
    // Getting type errors here?
    // Make sure your type annotation for reduce()
    // in Exercise 3 is correct!
    if ([]) throw new TypeError("list is null");
    return reduce((a, t) => [...a, t], <T[]>[], this.head);
  }

  // Add methods here:
  // function mapList<T,V>(f:(_:T) => V, l: List<T>): List<V> {
  //   return l ? <ListNode<V>>{
  //     //data: 
  //     //next:
  //   }
  // }
}

// /*****************************************************************
//  * Exercise 5
//  */
function line(s: string): any[]{
  return [0, s];
}

 function lineToList(line: [number, string]): List<[number, string]>{
  const result = new List<[number, string]>([line]);
  return result;
} 

/*****************************************************************
 * Exercise 6
 */

type BinaryTree<T> = BinaryTreeNode<T> | undefined;

class BinaryTreeNode<T> {
  constructor(
    public readonly data: T,
    public readonly leftChild?: BinaryTree<T>,
    public readonly rightChild?: BinaryTree<T>
  ) {}
}

// example tree:
const myTree = new BinaryTreeNode(
  1,
  new BinaryTreeNode(2, new BinaryTreeNode(3)),
  new BinaryTreeNode(4)
);

// *** uncomment the following code once you have implemented List and nest function (above) ***

// function prettyPrintBinaryTree<T>(node: BinaryTree<T>): List<[number, string]> {
//     if (!node) {
//         return new List<[number, string]>([])
//     }
//     const thisLine = lineToList(line(node.data.toString())),
//           leftLines = prettyPrintBinaryTree(node.leftChild),
//           rightLines = prettyPrintBinaryTree(node.rightChild);
//     return thisLine.concat(nest(1, leftLines.concat(rightLines)))
// }

// const output = prettyPrintBinaryTree(myTree)
//                     .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
//                     .reduce((a,b) => a + '\n' + b, '').trim();
// console.log(output);

// /*****************************************************************
//  * Exercise 7: Implement prettyPrintNaryTree, which takes a NaryTree as input
//  * and returns a list of the type expected by your nest function
//  */

// class NaryTree<T> {
//   constructor(
//     public data: T,
//     public children: List<NaryTree<T>> = new List(undefined)
//   ) {}
// }

// // Example tree for you to print:
// const naryTree = new NaryTree(
//   1,
//   new List([
//     new NaryTree(2),
//     new NaryTree(3, new List([new NaryTree(4)])),
//     new NaryTree(5),
//   ])
// );

// // Implement: function prettyPrintNaryTree(...)
// function prettyPrintNaryTree<T>(node: NaryTree<T>): List<[number, string]> {
//   return IMPLEMENT_THIS;
// }

// // *** uncomment the following code once you have implemented prettyPrintNaryTree (above) ***
// //
// // const outputNaryTree = prettyPrintNaryTree(naryTree)
// //                     .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
// //                     .reduce((a,b) => a + '\n' + b, '').trim();
// // console.log(outputNaryTree);

// /*****************************************************************
//  * Exercise 8 (Supplementary)
//  */

// type jsonTypes =
//   | Array<jsonTypes>
//   | { [key: string]: jsonTypes }
//   | string
//   | boolean
//   | number
//   | null;

// const jsonPrettyToDoc: (json: jsonTypes) => List<[number, string]> = (json) => {
//   if (Array.isArray(json)) {
//     // Handle the Array case.
//   } else if (typeof json === "object" && json !== null) {
//     // Handle the object case.
//     // Hint: use Object.keys(json) to get a list of
//     // keys that the object has.
//   } else if (typeof json === "string") {
//     // Handle string case.
//   } else if (typeof json === "number") {
//     // Handle number
//   } else if (typeof json === "boolean") {
//     // Handle the boolean case
//   } else if (json === null) {
//     // Handle the null case
//   }

//   // Default case to fall back on.
//   return new List<[number, string]>([]);
// };

// // *** uncomment the following code once you are ready to test your implemented jsonPrettyToDoc ***
// // const json = {
// //     unit: "FIT2102",
// //     year: 2021,
// //     semester: "S2",
// //     active: true,
// //     assessments: {"week1": null as null, "week2": "Tutorial 1 Exercise", "week3": "Tutorial 2 Exercise"},
// //     languages: ["Javascript", "Typescript", "Haskell", "Minizinc"]
// // }
// //
// // function lineIndented(aLine: [number, string]): string {
// //     return new Array(aLine[0] + 1).join('    ') + aLine[1];
// // }
// //
// // function appendLine(acc: string, nextLine: string): string {
// //     return nextLine.slice(-1) === "," ? acc + nextLine.trim() :
// //            acc.slice(-1) === ":"      ? acc + " " + nextLine.trim() :
// //            acc + '\n' + nextLine;
// // }
// //
// // console.log(jsonPrettyToDoc(json)
// //               .map(lineIndented)
// //               .reduce(appendLine, '').trim());

// // *** This is what it should look like in the console ***
// //
// // {
// //     unit: FIT2102,
// //     year: 2021,
// //     semester: S2,
// //     active: true,
// //     assessments: {
// //         week1: null,
// //         week2: Tutorial 1 Exercise,
// //         week3: Tutorial 2 Exercise
// //     },
// //     languages: [
// //         Javascript,
// //         Typescript,
// //         Haskell,
// //         Minizinc
// //     ]
// // }

//let x: number = 90.5;




