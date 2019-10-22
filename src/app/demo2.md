# Explore - Functional Reactive Programming (101)

    
## Ideal Pre-req
    - collection/iterator
    - simple async (callback, promise)

You have no control over time but you can write concise 
sequence of functions to manage what to do when things happen.

const data = [1,2,3]
const data = of([1,2,3])

data.map(x=> print(x))


Agenda:
    - Reactive stock ticker, analysis, buy/sell demo app
    - Functional Programming
        - Data flow, transformation, fn as first class citizen
    - Async Programming
        - Callback can be sync/async
        - Promise
    - Reactive with RxJS & Observable
        - Observable signature
            - Same thing, why?
                - solves multi- value over time
        - RxJS
            - Observables with pipe-able operators
        - You control data and time.
            - [1,2,3] to [a,b,c]
            - [1,2,3] to [6]
            - [1,2,3] to [1,2,2,3,3,3]
            - [1,2,3] to [1,x,2,x,x,3]

Two big words:
    - Functional. Programing paradigm that borrows concept from math functions.
    - Reactive. Programming paradigm that process events over time.
    
    - Together, they enable:
        - 
Demo App:
    - stock ticker generate quotes whenever price chane
    - ask broker should i buy?
    - ask broker should i sell?
    - perform buy/sell transaction
    - update application state
    
```
    stock.ticker$().pipe(
      concatMap(quote => zip(
        stock.analyseBuyScore$(quote),
        stock.analyseSellScore$(quote)
      ).pipe(map(([buyScore, sellScore]) => ({...quote, buyScore, sellScore})))),
      concatMap((quote: Quote) => {
        if (quote.buyScore! > 70) {
          return stock.buyMore$(quote).pipe(tap(() => appState.buyCount += 1))
        } else if (quote.sellScore! > 70) {
          return stock.sellAll$(quote).pipe(tap(() => appState.sellCount += 1))
        } else {
          return EMPTY
        }
      })
    ).subscribe()
```
- Programs that process events over time.
- Uses functional programming concepts.
- Makes complex event handling over time, manageable.
- Easy to understand...once you are familiar.

---

Mainly, two things: 

1. Functional Programming
2. Async Programming (time)

---

Functional Programming

- think about data flow and transformation instead of data mutation
- rely on function chaining
- treats function as first class citizen
    - x, y, z
    - function composition

--      

Reactive Programming
 
is an "asynchronous programming style".
            - reacting to events over time
            - events represented as data streams

## Functional Programming Style

### Data Flow & Transformation

```typescript
// multiply each number and add them up
const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// not-functional
// imperative. we write the step by step
let total = 0
for(let c=0; c < vals.length; c++) {
    const timesThree = vals[c] * 3
    if(timesThree % 2 === 0) {
        total += timesThree // mutate total
    }
}
console.log(total)

// functional
const total = vals
    .map(val => val*3) // declarative. given val, multiply by 3
    .filter(val=> val%2 ===0)
    .reduce((total,val) => total+val, 0)
console.log(total)
```

### Functions as First Class Citizen

need good example..

```typescript

class MyClass {
    doSomething(myClass: MyClass) {
        // create object from a function
        const anotherClass = new MyClass()
    
        // return object from function
        return anotherClass
    }

}

// 1a. assign object as variable
const myObj = new MyClass()

// 2a. pass object as argument
myObj.doSomething(new MyClass())


const myNameFn = () => 'bob'
const printFn(nameFn => {})


```

#### Why?

???

## Async Programming Style

### Synchronous Execution
```typescript
// code executed line by line
const doAdd = (v1, v2) => v1 + v2
const result = doAdd(2, 3)
console.log(result) // 5
console.log('done')
```

### Synchronous Execution with Callback Function
```typescript
function doAddwithCb (v1, v2, cb) {
  cb(v1 + v2)
}

doAddwithCb(2, 3, result => {
    console.log(result)
})
console.log('done')
```

### Asynchronous Execution with Callback Function
```typescript
function doAddwithCb (v1, v2, cb) {
  // simulate: do something in server for 1 second
  setTimeout(() => {
    cb(v1 + v2)
  }, 1000)
}

doAddwithCb(2, 3, result => {
    console.log(result)
})
console.log('done')
```

### Asynchronous Execution with Promise
```typescript
function doAddwithPromise (v1, v2) {
  return new Promise(resolve => v1 + v2)
}

doAddwithPromise(2, 3).then(result => {
  console.log(result) // 5
})
console.log('done')
```

### Asynchronous Execution with Observable
```typescript
const doAddPairOfNumbers = new Observable(o => {
  o.next(({v1, v2}) => v1 + v1)
  o.complete()
})

[{2,3}].doAddPairOfNumbers.subscribe(
    result => console.log(result),
    e => console.error(e),
    () => console.log('done')
)
```
