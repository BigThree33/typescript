/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #easy #union #built-in

  ### Question

  Implement the built-in `Pick<T, K>` generic without using it.

  Constructs a type by picking the set of properties `K` from `T`

  For example:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/4
*/

/* _____________ Your Code Here _____________ */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4/answer
  > View solutions: https://tsch.js.org/4/solutions
  > More Challenges: https://tsch.js.org
*/

/* 原理：Pick的底层通过 映射类型 + keyof 约束实现
type Pick<T, K extengd keyof T> = {
    P[K in T]: T[P];
}
1. K extends keyof T : 确保选取的键属于原始类型T
2. [P in K]: T[P] : 遍历联合类型 K, 为每个属性 P 保留原始类型 T[P];
*/

/* 用途:用来从对象属性中选取 指定属性 来构造一个新类型, 提高代码复用性
1.选择特定属性
    interface User {
        id: number;
        age: number;
        name: string;
        phone: string;
    }

    type MyUser = Pick<User, "id" | "name">;

    const ChengZi : MyUser = {
        id: 33;
        name: '李国胜'
        //不能包含其他没有 选取的键
    }

2. 函数参数类型约束
    function Myf(myUser: Pick<User, "age" | "phone">) {
        console.log(`只能访问 ${myUser.id} 与 ${myUser.phone}`)
    }
    //Myf({ phone: "12345678910" }) ××, 确保类型一致

3.嵌套对象属性选取
    interface Profile {
        user: User;
        bio: string;
    }

    type YourUser = Pick<Profile["user"], "name" | "age"> //{name: string, age: number}
    
4.动态选择属性(结合泛型)

    */