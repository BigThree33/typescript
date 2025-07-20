/*
  3312 - Parameters
  -------
  by midorizemi (@midorizemi) #easy #infer #tuple #built-in

  ### Question

  Implement the built-in Parameters<T> generic without using it.

  For example:

  ```ts
  const foo = (arg1: string, arg2: number): void => {}

  type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
  ```

  > View on GitHub: https://tsch.js.org/3312
*/

/* _____________ Your Code Here _____________ */

type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3312/answer
  > View solutions: https://tsch.js.org/3312/solutions
  > More Challenges: https://tsch.js.org
*/

/*
1. T extends (...args: any[]) => any
这句是用来判断 T 是否为函数类型。

(...args: any[]) => any 表示任意参数、任意返回值的函数类型。
如果 T 能赋值给这个类型，说明 T 是一个函数。
2. T extends (...args: infer A) => any
这句是在条件类型中做类型推断，用 infer 关键字来推断函数参数的类型。

infer A 会把参数列表的类型（元组）赋值给 A。
如果 T 是函数类型，就能推断出参数类型元组 A。
总结：

第一句是判断是不是函数类型。
第二句是在判断的同时，把参数类型元组提取出来赋值给 A，方便后续使用。
*/