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
  return IMPLEMENT_THIS;
}

/*
Requirements: 
+ First map with id function or I-Combinator 
Example: 
let list123 = cons(1, cons(2, cons(3, null)));
let idList = map((v) => v, list123);
expect(head(list123)).to.equal(head(idList));
expect(head(rest(list123))).to.equal(head(rest(idList)));
expect(head(rest(rest(list123)))).to.equal(head(rest(rest(idList))));

Then map with inc function
Example:
let list123 = cons(1, cons(2, cons(3, null)));
const inc = (n) => n + 1;
let newList = map(inc, list123);
const predicate = (before, after) => before === after - 1;
expect(predicate(head(list123), head(newList))).is.true;
expect(predicate(head(rest(list123)), head(rest(newList))));
expect(predicate(head(rest(rest(list123))), head(rest(rest(newList)))));
expect(rest(rest(rest(newList)))).is.equal(null);
*/
