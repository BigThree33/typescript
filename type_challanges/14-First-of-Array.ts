/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array

  ### Question

  Implement a generic `First<T>` that takes an Array `T` and returns its first element's type.

  For example:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */

type First<T extends any[]> =  T['length'] extends 0 ? never : T[0]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14/answer
  > View solutions: https://tsch.js.org/14/solutions
  > More Challenges: https://tsch.js.org
*/


/*
两个关键点：
如何获取数组的第一个元素类型？
如何处理空数组的情况？

1.条件类型 + 模式匹配
    type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never
    
    infer可以推断多个位置的类型
    // 测试1
        type FirstTwo<T extends any[]> = T extends [infer A, infer B, ...any[]] ? [A, B] : never
        type Test1 = FirstTwo<[string, number, boolean]>  // [string, number]
        type Test2 = FirstTwo<['hello', 42, true, 'world']>  // ['hello', 42]
        type Test3 = FirstTwo<[1]>  // never (因为只有一个元素，匹配失败)
        type Test4 = FirstTwo<[]>   // never (空数组，匹配失败)
    // 测试2 获取除了第一个属性之外的所有属性
        type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : []
        type Result = Tail<[1, 2, 3, 4]>  // [2, 3, 4]

2.使用索引访问
    type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

3.使用 readonly 数组判断    
    type First<T extends any[]> = T extends readonly [any, ...any[]] ? T[0] : never

*/
