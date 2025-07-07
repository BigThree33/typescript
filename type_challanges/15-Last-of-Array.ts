import { Alike } from './../node_modules/@type-challenges/utils/index.d';
/*
  15 - Last of Array
  -------
  by Anthony Fu (@antfu) #medium #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  Implement a generic `Last<T>` that takes an Array `T` and returns its last element.

  For example

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
  ```

  > View on GitHub: https://tsch.js.org/15
*/

/* _____________ Your Code Here _____________ */

type Last<T extends any[]> = T extends [...any[], infer P] ? P : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/15/answer
  > View solutions: https://tsch.js.org/15/solutions
  > More Challenges: https://tsch.js.org
*/

/*
    写过 First of Array 的同学应该会发现，Last of Array 和 First of Array 的实现方式非常相似。
    只需要将模式匹配的顺序从开头改为结尾即可。
    但也有容易踩坑的点：
        不能直接使用 T[T['length'] - 1] 来获取最后一个元素，因为 TypeScript 的类型系统不支持直接进行数学运算。
*/