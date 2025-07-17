/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is a wrapped type like Promise, how can we get the type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

type MyAwaited<T> = T extends null | undefined ? T : T extends { then: (onfulfilled: (arg: infer Anwser, ...args) => any) => any} ? MyAwaited<Anwser> : T 
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/

/*
type MyAwaited<T> = T extends null | undefined ? T : T extends { then: (onfulfilled: (arg: infer Anwser, ...args) => any) => any} ? MyAwaited<Anwser> : T 
- 首先判断 T 是否为 null 或 undefined，如果是，则直接返回 T。
- 如果 T 是一个 Promise 类型（即具有 then 方法），则使用条件类型提取 then 方法的参数类型，并递归调用 MyAwaited 以处理嵌套的 Promise。
- 如果 T 不是 Promise 类型，则直接返回 T。

T extends { then: (onfulfilled: (arg: infer Anwser, ...args) => any) => any}拆解解释：
(onfulfilled: (arg: infer Anwser, ...args) => any) 是一个函数类型，表示 then 方法接受一个回调函数作为参数。
当 onfulfilled放回给then是一个非期约值时，promise T会被立马兑现（原理），否则得到解决，即T与后续的期约关联上了

这种方式可以处理嵌套的 Promise 类型，直到提取出最内层的类型。


function c1(response) {
  let p4 = response.json(); //第一个回调
  return p4; //返回期约4
}

function c2(profile) { //回调2
  display(profile);
}

let p1 = fetch('https://api.example.com/data'); //期约1，任务1
let p2 = p1.then(c1); //期约2，任务2
let p3 = p2.then(c2); //期约3，任务3

期约链是这样的：
为了让期约链有效工作，任务2的输出必须成为任务3的输入；
在该示例中，任务3的输入是从URL抓到响应体后又解析生成的JSON对象。不过回调C1的返回值并不是一个JSON对象，而是一个表示该JSON对象的期约p4.这看似矛盾实际上没有问题
在p1兑现后，即成功抓取到响应体，c1才被调用，任务2开始，然后p2兑现后，c2才被调用，任务3开始。
不过c1被调用时任务2开始，并不意味着任务2一定在c1返回时结束。
因为期约是用于管理异步任务的，如果任务2是异步（这里确实是），那么它在回调时就不会结束

流程（解决状态）：当把回调C传给then()方法时，then()就会返回期约p，并安排好在将来某个时刻异步调用C，届时这个回调执行某种计算并返回一个值v
当这个回调返回值v时，期约p就以这个值得以解决。当期约返回的是一个非期约值，那么期约就会立马以这个值兑现，否则p得到解决但未兑现。
此时p要等到v落定之后才能落定。如果v兑现了，那么p也会以相同的值兑现（期约）。如果v被拒绝，那么p也会被拒绝。
这就是期约“解决”状态的含义。即期约之间关联上了，或一个期约锁定了另外一个期约。

*/