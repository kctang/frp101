import {EMPTY, interval, Observable, of, zip} from 'rxjs'
import {
  concatMap, delay, filter,
  map, reduce, take,
  takeWhile,
  tap
} from 'rxjs/operators'

const print = msg => console.log(`> ${msg}`)
const printDebug = msg => console.debug(`> ${msg}`)

export async function main() {
  // TODO: uncomment specific lines to run demo

  // asyncDemo.execSync()
  // asyncDemo.execSyncWithCallback()
  // asyncDemo.execAsyncWithCallback()
  // asyncDemo.execAsyncWithPromise()
  asyncDemo.execAsyncWithObservable2()

  // dataFlowDemo.functionChaining()
  // dataFlowDemo.pipeableOperator()

  // stock.run()
}

const asyncDemo = {
  execSync: () => {
    const doAddFn = function(v1, v2) {
      return v1 + v2
    }
    const doAdd = (v1, v2) => v1 + v2

    const result = doAdd(2, 3)
    print(result) // 5
    print('done')
  },

  execSyncWithCallback: () => {
    const doAddWithCb = (v1, v2, cb) => {
      cb(v1 + v2)
    }

    doAddWithCb(2, 3, result => {
      print(result)
    })
    print('done')
  },

  execAsyncWithCallback: () => {
    const doAddWithCb = (v1, v2, cb) => {
      // simulate: do something in server for 1 second
      setTimeout(() => {
        cb(v1 + v2)
      }, 1000)
    }

    doAddWithCb(2, 3, result => {
      print(result)
    })
    print('done')
  },

  execAsyncWithPromise: () => {
    const doAddWithPromise = (v1, v2) => new Promise(resolve => {
      setTimeout(() => {
        resolve(v1 + v2)
      }, 500)
    })

    doAddWithPromise(2, 3).then(result => {
      print(result)
    })
    print('done')
  },

  execAsyncWithObservable: () => {
    const doAddMultiplyDivide = (input: number[]) => new Observable(o => {
      setTimeout(() => o.next(input[0] + input[1]), 100)
      setTimeout(() => o.next(input[0] * input[1]), 200)
      setTimeout(() => {
        o.next(input[0] / input[1])
        o.complete()
      }, 300)
    })

    doAddMultiplyDivide([2, 3]).subscribe(
      result => print(result),
      e => console.error(e),
      () => print('really done')
    )
    print('done')
  },

  execAsyncWithObservable2: () => {
    // - emit multi-value
    const doAddPair$ = (input: number[]) => {
      return new Observable<number>(o => {
        setTimeout(() => {
          o.next(input[0] + input[1]) // next value - add
          // o.complete()
        }, 500)                     // time - 500ms

        setTimeout(() => {
          o.next(input[0] - input[1]) // next value - minus
          o.next(input[0] * input[1]) // next value - multiply
          o.complete()                     // no more values
        }, 1000)                    // time - 1s
      })
    }

    doAddPair$([2, 3]).subscribe(
      result => print(result),
      e => console.error(e),
      () => print('really done')
    )
    print('done')
  }
}

const dataFlowDemo = {
  functionChaining: () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const result = data.map(val => val * 7)
      .filter(val => val % 2 === 0)
      .reduce((total, current) => total + current, 0)

    print(result)
  },

  pipeableOperator: () => {
    const data$ = interval(100).pipe(
      map(no => no + 1),
      take(10)
    ).subscribe(
      val => console.log(val)
    )

    /*
        data$.pipe(
          map(val => val * 7),
          filter(val => val % 2 === 0),
          reduce((total, current) => total + current, 0)
        ).subscribe(
          val => print(`Subscription got val [${val}]`),
          e => console.error(e),
          () => print('Subscription done')
        )
    */
  }
}

type Quote = {
  ticker: string
  price: number
  buyScore?: number
  sellScore?: number
}

const stock = {
  run: () => {
    const appState = {
      buyCount: 0,
      sellCount: 0
    }

    stock.ticker$.pipe(
      concatMap(quote => zip(
        stock.analyseBuyScore$(quote),
        stock.analyseSellScore$(quote)
      ).pipe(
        map(([buyScore, sellScore]) => ({...quote, buyScore, sellScore}))
      )),
      concatMap((quote: Quote) => {
        if (quote.buyScore! > 70) {
          return stock.buyMore$(quote).pipe(tap(() => appState.buyCount += 1))
        } else if (quote.sellScore! > 70) {
          return stock.sellAll$(quote).pipe(tap(() => appState.sellCount += 1))
        } else {
          return EMPTY
        }
      }),
      takeWhile(() => appState.sellCount < 5 && appState.buyCount < 5)
    ).subscribe(
      val => {
        print(`--- ${val}`)
      },
      e => console.error(e),
      () => {
        print(JSON.stringify(appState, null, 2))
        print('done!')
      }
    )
  },

  // observable that returns stock prices every x seconds
  ticker$: interval(1000).pipe(
    concatMap(() => of(...[
      {ticker: 'APPL', price: 220},
      {ticker: 'BABA', price: 130},
      {ticker: 'TSLA', price: 200}
    ]))
  ),

  buyMore$: (quote: Quote) => of(`Buying [${quote.ticker}]`).pipe(
    // simulate a 10ms REST API call..
    delay(10)
  ),

  sellAll$: (quote: Quote) => of(`Selling [${quote.ticker}]`).pipe(
    // simulate a 10ms REST API call..
    delay(10)
  ),

  analyseBuyScore$: (quote: Quote) => new Observable<number>(o => {
    printDebug(`Analysing stock [${quote.ticker}] to buy...`)
    setTimeout(() => {
      const score = Math.round(Math.random() * 99) + 1
      printDebug(`Buy score [${score}] for stock [${quote.ticker}] analyzed`)
      o.next(score)
      o.complete()
    }, 10)
  }),

  analyseSellScore$: (quote: Quote) => new Observable<number>(o => {
    printDebug(`Analysing stock [${quote.ticker}] to sell...`)
    setTimeout(() => {
      const score = Math.round(Math.random() * 99) + 1
      printDebug(`Sell score [${score}] for stock [${quote.ticker}] analyzed`)
      o.next(score)
      o.complete()
    }, 10)
  })
}
