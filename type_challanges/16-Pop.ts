/*
  16 - Pop
  -------
  by Anthony Fu (@antfu) #medium #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  Implement a generic `Pop<T>` that takes an Array `T` and returns an Array without it's last element.

  For example

  ```ts
  type arr1 = ['a', 'b', 'c', 'd']
  type arr2 = [3, 2, 1]

  type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2> // expected to be [3, 2]
  ```

  **Extra**: Similarly, can you implement `Shift`, `Push` and `Unshift` as well?

  > View on GitHub: https://tsch.js.org/16
*/

/* _____________ Your Code Here _____________ */

type Pop<T extends any[]> = T extends [...infer A, any] ? A : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16/answer
  > View solutions: https://tsch.js.org/16/solutions
  > More Challenges: https://tsch.js.org
*/

/* 
原来，还是可以使用模式匹配来实现 Pop 的功能。

这里记录有效的模式✅ ：
- type Valid1<T extends any[]> = T extends [...infer Rest, any] ? Rest : never
- type Valid2<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never  
- type Valid3<T extends any[]> = T extends [...infer Rest, any, any] ? Rest : never
- type Valid4<T extends any[]> = T extends [any, ...infer Rest, any] ? Rest : never

无效的模式❌：
- type Invalid1<T extends any[]> = T extends [...infer A, any, ...infer B] ? [A, B] : never
- type Invalid2<T extends any[]> = T extends [...infer A, ...infer B] ? [A, B] : never
*/