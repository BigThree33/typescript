/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys

  ### Question

  Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > View on GitHub: https://tsch.js.org/8
*/

/* _____________ Your Code Here _____________ */

// 1.
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & { readonly [P in K]: T[P] };
// 2.
// type MyReadonly2<T, K extends  keyof T = keyof T > = {
//   [P in keyof T]: P extends K ? Readonly<T[P]> : T[P]
// }
// Omit<T, K> & Readonly<T>;
/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8/answer
  > View solutions: https://tsch.js.org/8/solutions
  > More Challenges: https://tsch.js.org
*/

// getJSON(url).then(jsonData => {
//   // 这是一个回调函数，他会在解析得到JSON值
//   // 之后被异步调用，并接受该JSON值作为参数
//   console.log(jsonData)
// })

// function displayUserProfile(profile) {}

// getJSON('https://api.example.com/user/123').then(displayUserProfile);

/*
先筛除K指定的属性，然后把剩下的属性原样保留。
再添加readonly属性（K）

1.type MyReadonly2<T, K extends keyof T = keyof T> = T & {
  readonly [P in K]: T[P];
};

2.type MyReadonly2<T, K extends  keyof T = keyof T > = {
  [P in keyof T]: P extends K ? Readonly<T[P]> : T[P]
}
*/