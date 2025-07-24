/*
  110 - Capitalize
  -------
  监于110题自己改进的一题
  > View on GitHub: https://tsch.js.org/110
*/

/* _____________ Your Code Here _____________ */

type MyCapitalize<S extends string> = S extends `${infer F}${infer Rest}` ? `${Uppercase<F>}${Rest}` : S
type CapitalizeWords<S extends string> = S extends `${infer Word} ${infer Rest}` ? `${MyCapitalize<Word>} ${CapitalizeWords<Rest>}` : MyCapitalize<S>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
  Expect<Equal<CapitalizeWords<'a'>, 'A'>>,
  Expect<Equal<CapitalizeWords<'a b c'>, 'A B C'>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/110/answer
  > View solutions: https://tsch.js.org/110/solutions
  > More Challenges: https://tsch.js.org
*/
