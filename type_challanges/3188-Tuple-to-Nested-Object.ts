/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #medium #object #tuple

  ### Question

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > View on GitHub: https://tsch.js.org/3188
*/

/* _____________ Your Code Here _____________ */

type TupleToNestedObject<T extends readonly any[], U> = 
    T extends readonly [infer First, ...infer Rest] ?
        { [K in First as K extends string ? K : never]: TupleToNestedObject<Rest, U>} : U


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3188/answer
  > View solutions: https://tsch.js.org/3188/solutions
  > More Challenges: https://tsch.js.org
*/

/*
- 题解：这题要求嵌套，肯定需要递归
- 先判断 T 是否为空，如果是空的就直接返回 U
- 否则取出第一个元素 First， 并将剩余的元素作为下一个元组 Rest 递归下去
- 使用条件类型和映射类型来构建嵌套对象

- type TupleToNestedObject<T extends readonly any[], U> = {
    T extends readonly [infer First, ...infer Rest] ?
        { [K in First as K extends string ? K : never]: TupleToNestedObject<Rest, U>} : U
    }
    这种写法是错误的，会让整个类型变成一个对象类型，而不是条件类型
*/
