/*
Functional Reactive Programming
  - functional programming style is...
    - a way of thinking
    - data flow and transformation
    - functions as a first class citizen
      - can be a variable
      - can be passed as an argument
      - can be created from a function
      - can be returned from a function
    - side-effects and mutations
    - avoids changing value assigned to variable
      - pure vs impure functional programming languages
        - haskell. pure. functional programming
        - javascript. inpure. functional style


  - reactive programming is a kind of async programming...
    - callback
      - sync/async
      - what's async
        - read/write file from disk
        - connect to server (i.e. make REST API call)
        - get GPS coordinate
        - waiting for webpage to finish loading

    - promise
      - a more fluent style.
      - promise to xxx, then yyy catch zzz
      - chainable
    - async/await
      - sync code still easier to read...
      - just syntax sugar on promise, nothing else.
    - observable
      - concept
        - resolves multiple values, over time
        - cancelable
        - lazy
      - say again
        - it provides a powerful programming abstraction to think about...
          - handling things that happen over time
      - promises resolve 1 data
      - observable resolves multiple data, over time
      - examples of multi-value data streams:
        - mouse movements
        - number of emails
        - number of likes for a fb posting
        - supply chain for creating sandwiches
          - supplier provides tomatoes, meat, buns
          - once you receive  2 buns, 1 tomato, 1 mean, make a burger
          - whenever...
      - observe events happening over time a period of time and taking appropriate actions



- Functional Style
  - declarative, what
  - prefers transform instead of mutate
  - fluent, chaining, pure, no side effects
  - pass function to function
  - return function from function
  - function composition instead of inheritance

- Reactive programming is
  - ...a form of asynchronous programming paradigm
  - about data streams
  - transforms

sync & async javascript
  async because not everything happens in sequence

  callback functions
    - function passed as a parameter to another function
    - called at a certain lifecycle of the function's execution, usually at the end
        setTimeout(doSomethinFn, 10)
        jquery.ajax({
          beforeSend: () => {
            console.log('prepare data before making call')
          },
          success: data => {
            console.log('got some data')
          },
          error: error => {
            console.log('got error')
          }
        })
    - types
       - sync callback
       - async callback



Lazy lists

Callbacks
Promises
async/await
Observables with RxJS


*/

import {from, interval, merge, Observable, Observer, of, zip} from 'rxjs'
import {combineAll, concatMap, filter, map, mapTo, take, tap} from 'rxjs/operators'

const randomPercentForTrue = percent => {
  const actualPercent = Math.round(Math.random() * 99) + 1
  return actualPercent < percent
}
const print = val => console.log(val)
type User = { name: string, age: number }
const testData: User[] = [
  {name: 'Jerri Casperson', age: 59},
  {name: 'Hermina Sandoval', age: 17},
  {name: 'Elin Rotondo', age: 92},
  {name: 'Lavone Peat', age: 68},
  {name: 'Laurel Osman', age: 58},
  {name: 'Maxwell Burg', age: 37},
  {name: 'Kyoko Colclough', age: 29},
  {name: 'Dolores Stowell', age: 91},
  {name: 'Claudia Dipaola', age: 72},
  {name: 'Adella Calhoun', age: 90},
  {name: 'Jonelle Gormley', age: 43},
  {name: 'Dallas Mcgaugh', age: 14},
  {name: 'Ann Huckleberry', age: 98},
  {name: 'Sunni Caverly', age: 86},
  {name: 'Sherwood Way', age: 55},
  {name: 'Carol Pardee', age: 71},
  {name: 'Bryanna Lux', age: 41},
  {name: 'Kizzy Tarlton', age: 10},
  {name: 'Mahalia Carillo', age: 39},
  {name: 'Pamila Mcintyre', age: 74}
]
const testData2: User[] = [
  {name: 'Jerri Casperson', age: 59},
  {name: 'Hermina Sandoval', age: 17},
  {name: 'Elin Rotondo', age: 92},
  {name: 'Lavone Peat', age: 68},
  {name: 'Laurel Osman', age: 58},
  {name: 'Maxwell Burg', age: 37},
  {name: 'Kyoko Colclough', age: 29},
  {name: 'Dolores Stowell', age: 91},
  {name: 'Claudia Dipaola', age: 72}
]

export async function main() {
  print('im')
  print(im.total_age(testData))
  print(im.age_gt_90(testData))
  print(im.total_age_again(testData))

  print('fp')
  print(fp.total_age(testData))
  print(fp.age_gt_90(testData))

  // simple compose
  const composeTotalAgeFn = (users: User[]) => () => fp.total_age(users)
  // same thing, just longer
  const verboseComposeTotalAgeFn = (users: User[]) => {
    return () => {
      return fp.total_age(users)
    }
  }

  // test data is the state, 'encapsulated' in the composed function.
  const fn = composeTotalAgeFn(testData)

  print(fn())

  await demo.run1()

}

const dataFlowAndTransform = {
  dataFlow: () => {
    const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // imperative
    let total = 0
    for (let c = 0; c < vals.length; c++) {
      const timesTwo = vals[c] * 2
      if (timesTwo % 2 === 0) {
        total += timesTwo // mutates total
      }
    }
    console.log(total)

    // declarative - functional style
    const totalEven = vals.map(val => val * 2)
      .filter(val => val % 2 === 0)
      .reduce((total, current) => total + current, 0)

    console.log(totalEven)
  }
}

const firstClassFunction = {
  beVariable: () => {
    const fn = () => {
      console.log('myFn is a function')
    }

    fn()
  },

  assignedAsParameter: () => {
    const englishFunction = function(name) {
      return `Good morning, ${name}`
    }
    const englishFn = name => `Good morning, ${name}`
    const bahasaFn = name => `Selamat pagi, ${name}`
    const sayHi = (name, langFn) => console.log(langFn(name))

    sayHi('bob', englishFn)
    sayHi('bob', bahasaFn)
  },

  returnedFromFunction: () => {
    const englishFn = name => `Good morning, ${name}`
    const bahasaFn = name => `Selamat pagi, ${name}`

    const sayHi = (name, langFn) => console.log(langFn(name))

    // create & returns function
    const makeEnglishGreeting = function(name) {
      return function() {
        return sayHi(name, englishFn)
      }
    }

    const greetBobFn = makeEnglishGreeting('bob')
    greetBobFn()
  }
}

const sideEffectsMutations = {
  demo1: () => {
    const goodMood = true

    const noSideEffect = val => val * 2

    const withSideEffect = val => {
      if (goodMood) {
        return val * 3
      } else {
        return val * 2
      }
    }
  }
}

const im = {
  total_age: (users: User[]) => {
    // --- imperative sequence (how to...)
    // --- mutation
    let total = 0
    for (let c = 0; c < users.length; c++) {
      total += users[c].age
    }

    return total
  },

  age_gt_90: (users: User[]) => {
    let dataAgeGt90: { name: string, age: number }[] = []

    for (let c = 0; c < users.length; c++) {
      if (users[c].age > 90) {
        dataAgeGt90.push(users[c])
      }
    }

    return dataAgeGt90
  },

  total_age_again: (users: User[]) => {
    let dataAgeGt90 = im.age_gt_90(users)
    let total = 0
    for (let c = 0; c < dataAgeGt90.length; c++) {
      if (dataAgeGt90[c].name.startsWith('S')) {
        total += dataAgeGt90[c].age * 2
      } else {
        total += dataAgeGt90[c].age
      }
    }

    return total
  }
}

const fp = {
  // +++ declarative (what to...)
  // +++ transform (data transforms as it flow through functions...)
  total_age: (users: User[]) => users
  // .filter(person => person.age > 90)
  // .map(person => person.name.startsWith('S') ? person.age * 2 : person.age)
    .reduce((total, person) => total + person.age, 0),

  age_gt_90: (users: User[]) => users.filter(person => person.age > 90),

  name_starts_with_s: () => person => person.name.startsWith('S') ? person.age * 2 : person.age,

  withCompose: () => {
    // const composedFn = compose(fp.total_age, fp.age_gt_90)

  }

}

const demo = {
  loadData: () => 'data loaded synchronously',

  loadDataWithSyncCallback: cb => cb('data loaded asynchronously'),

  loadDataWithAsyncCallback: cb => setTimeout(() => cb('data loaded asynchronously'), 0),

  loadDataWithPromise: () => {
    return new Promise<string>(resolve => resolve('data loaded with Promise'))
  },

  run1: async () => {
    let val = demo.loadData()
    console.log(`1. ${val}`)

    // a callback is a function that is passed as a function parameter
    demo.loadDataWithSyncCallback(val => console.log(`2. ${val}`))

    demo.loadDataWithAsyncCallback(val => console.log(`3. ${val}`))

    demo.loadDataWithPromise().then(val => console.log(`4. ${val}`))
    console.log('5. after promise')

    val = await demo.loadDataWithPromise()
    console.log(`6. via async/await ${val}`)
  },

  run2: () => {
    const names = ['alice', 'bob', 'chong']
  }
}

const scenario = {
  visitorCountPerType: [1, 2, 3, 4, 5],
  visitors: [
    'teacher',
    'teacher',
    'arts-student',
    'arts-student',
    'teacher',
    'arts-student',
    'science-student',
    'arts-student',
    'science-student',
    'teacher',
    'science-student',
    'teacher',
    'science-student',
    'teacher',
    'science-student',
    'teacher',
    'science-student'
  ],

  schoolOfSync: () => {
    scenario.visitors.map(visitor => {

    })
  }
}

const obs = {
  demo0: () => {
    const tomatoes = [
      {item: 'tomato', quality: true},
      {item: 'tomato', quality: false},
      {item: 'tomato', quality: true},
      {item: 'tomato', quality: true},
      {item: 'tomato', quality: false}
    ]
    const chickens = [
      {item: 'chicken1', quality: true},
      {item: 'chicken2', quality: true},
      {item: 'chicken3', quality: true},
      {item: 'chicken4', quality: true},
      {item: 'chicken5', quality: true}
    ]
    const buns = ['bun', 'bun', 'bun', 'bun', 'bun', 'bun']

    const qualityTomatoes = tomatoes.filter(tomato => tomato.quality)
    const qualityChickens = chickens.filter(i => i.quality)

    const max = [
      qualityTomatoes.length,
      qualityChickens.length
    ].reduce((p, c) => p < c ? p : c, 100)

    const sandwiches = qualityTomatoes.map((tomato, c) => {
      return `${tomato.item} --- ${qualityChickens[c].item}`
    })

    console.log(sandwiches)
  },

  demo1: () => {
    const val$ = of(1, 2, 3, 4, 5)
    val$.subscribe()


    const suppliers = {
      tomato$: interval(500).pipe(
        map(() => ({
          type: 'tomato',
          quality: randomPercentForTrue(50)
        }))
      ),

      chicken$: interval(200).pipe(
        map(() => ({
          type: 'chicken',
          quality: randomPercentForTrue(80)
        }))
      ),

      bun$: interval(700).pipe(
        map(() => ({
          type: 'bun',
          quality: randomPercentForTrue(90)
        }))
      )
    }

    suppliers.tomato$.subscribe(
      val => console.log(val),
      e => console.error(e),
      () => console.log('done!')
    )

    zip(
      suppliers.tomato$.pipe(
        tap(val => console.log(val))
      ),
      suppliers.chicken$,
      suppliers.bun$
    ).pipe(
      tap(item => {
        console.log(item)
      }),
      take(3)
    ).subscribe()

  }
}

/*

# RFP

Reactive functional programming...

immutable variables
function purity
- no side effects

functional programming style
- often compared with OOP
- OOP:
- imperative
- how
- mutate
- side-effect
- pass objects
- hard to compose
- FP:
- declarative
- what
- transform, fluent, chaining
- pure (no side effects)
- pass functions also
- functional composition


- functions as first class citizen
- pass object to function
- create object within function
- return object from function
- ALSO
HoF
- pass function to function
- create function within function
- return function from function
- no side effect
- have to be pure
1. does not change anything
2. does not depend on anything that changes
- pure or style
- style allows mutability

- poly morph is to oop
- what lazy eval is to functional programming
- lazy eval cannot exist without immutability
- must be pure
- run whenever...
- efficiency...can
- can defer execution...
- also..
- function pipelining
- function composition...
- FP good becuz
- code clarity
- fewer error
- easy to parallelize

- Java: https://www.youtube.com/watch?v=15X0qFtBqiQ





    Lazy lists
FRP






Week 1:
Intro
Syntax vs Semantics
Levels of Abstraction
Assembler - the machine level
Von Neumann Architecture
Instruction Execution Cycle
JavaScript and functions
Recursion
Immutable variables
Week 2:
JavaScript, objects and functions
Function purity
Week 3:
Functional Programming
TypeScript
Linked lists and Church-encoding lists with functions
  Week 4:
Lazy lists
FRP
Assignment 1


*/




