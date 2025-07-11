/*
  2 - Get Return Type
  -------
  by Anthony Fu (@antfu) #medium #infer #built-in

  ### Question

  Implement the built-in `ReturnType<T>` generic without using it.

  For example

  ```ts
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }

  type a = MyReturnType<typeof fn> // should be "1 | 2"
  ```

  > View on GitHub: https://tsch.js.org/2
*/

/* _____________ Your Code Here _____________ */

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
]

type ComplexObject = {
  a: [12, 'foo']
  bar: 'hello'
  prev(): number
}

const fn = (v: boolean) => v ? 1 : 2
const fn1 = (v: boolean, w: any) => v ? 1 : 2

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2/answer
  > View solutions: https://tsch.js.org/2/solutions
  > More Challenges: https://tsch.js.org
*/

/*
用之前的Last of Array来比较
Last: T extends [...any[], infer P] ? P : never
MyReturnType: T extends (...args: any[]) => infer R ? R : any
这两者所继承的类型不同，(...args: any[]) => infer R代表是否是一个函数类型，并自动推断 R 的类型
而[...any[], infer P]代表是否是一个数组类型，并自动推断最后一个元素的类型。
*/