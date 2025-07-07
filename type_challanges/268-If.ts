/*
  268 - If
  -------
  by Pavel Glushkov (@pashutk) #easy #utils

  ### Question

  Implement the util type `If<C, T, F>` which accepts condition `C`, a truthy value `T`, and a falsy value `F`. `C` is expected to be either `true` or `false` while `T` and `F` can be any type.

  For example:

  ```ts
  type A = If<true, 'a', 'b'>  // expected to be 'a'
  type B = If<false, 'a', 'b'> // expected to be 'b'
  ```

  > View on GitHub: https://tsch.js.org/268
*/

/* _____________ Your Code Here _____________ */

type If<C extends boolean, T, F> = C extends true ? T : F

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
  Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/268/answer
  > View solutions: https://tsch.js.org/268/solutions
  > More Challenges: https://tsch.js.org
*/


/*
题解：
- 前两个测试用例比较简单，直接使用条件类型判断即可。
- 第三个测试用例中，`boolean` 是一个联合类型，包含了 `true` 和 `false`，因此可以返回 `T | F`。

- 第33行中的 `@ts-expect-error` 注释表示我们期望在编译时会报错，因为 `null` 不是一个布尔值。
- 最后一个测试用例是一个错误示例，`If<null, 'a', 'b'>` 应该会导致编译错误，因为 `null` 不是一个布尔值。
- 所以需要判别 C 是否extends boolean，确保 C 是一个布尔值。
*/