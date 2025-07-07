## 简介
0. TS为JS超集，完全兼容JS；
1. 相较于JS，TS增加了类型约束，更加严格的语法与功能；
2. 同样的功能TS代码量大于JS，但后期维护TS远胜JS
3. TS代码需要通过编译器编译为JS后再交由JS解析器执行


## 开发环境
0. 下载node.js
1. npm全局安装ts -> npm i -g typescript
2. tsc命令编译ts文件，自动生成.js文件


## 类型声明

### 类型声明
0. 通过类型声明指定TS中变量的类型， TS有自动类型判断机制
0. let 变量：类型;
1. let 变量：类型 = 值
2. let 变量 = 值， 声明和赋值同时进行时，TS编译器会自动判断变量类型，可省略

### 类型断言
0. 场景：我们自己明确变量的类型，但TS编译器不知道，通过类型断言告诉编译器变量的类型，忽略警告
1. let someValue: unknown = "this is a string"
    - let strLength: number = (someValue as string).strLength
    - let strLength: number = (<string>someValue).length;

### 类型
- number
- string
- boolean
- any
- unknown
- void (空值 但也是值)
- never (可以作为函数类型，表示不会返回值，用在抛出异常这种用途等)
- object
- array
- tuple
- enum (枚举)


## 编译选项（tsconfig.json）

### 自动编译文件 
1. tsc xxx.ts -w(watch) watch自动监视文件变化并重新编译

### tsconfig.jgon配置文件（配置选项）

#### include
1. 定义希望被编译文件所在的目录
2. 默认值：[ "\*\*/*" ]
3. 示例："include":[ "src/**/*", "tests/**/*" ],

#### exclude 
1. 定义需要排除在外的目录
2. 默认值: [ "node_modules", "bower_components", "jspm_packages" ]

#### extends
1. 定义被继承的配置文件
2. 示例： "extends": "./configs/base"

#### files
1. 指定被编译文件的列表，需要编译的文件比较少时采用得到
2. 示例: "files": [
            "hello.ts",
            "cialloworld.ts",
            "holyshit.ts"
        ]

#### compilerOptons 编译选项，包含多个子选项，用来完成对编译的配置
- target 设置ts代码编译的目标版本
- lib 指定代码运行时所包含的库
- module 设置编译后代码使用的模块化系统
- outDir 编译后文件的所在目录
- outFile 将所有的文件编译为一个js文件
- rootDir 指定代码的根目录
- allowJs 是否对JS文件进行编译
- checkJs 是否对JS文件进行检查
- removeComments 是否删除注释
- noEmit 不对代码进行编译
- sourceMap 是否生成sourceMap
- 严格检查
  - strict
    - 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
  - alwaysStrict
    - 总是以严格模式对代码进行编译
  - noImplicitAny
    - 禁止隐式的any类型
  - noImplicitThis
    - 禁止类型不明确的this
  - strictBindCallApply
    - 严格检查bind、call和apply的参数列表
  - strictFunctionTypes
    - 严格检查函数的类型
  - strictNullChecks
    - 严格的空值检查
  - strictPropertyInitialization
    - 严格检查属性是否初始化
- 额外检查
  - noFallthroughCasesInSwitch
    - 检查switch语句包含正确的break
  - noImplicitReturns
    - 检查函数没有隐式的返回值
  - noUnusedLocals
    - 检查未使用的局部变量
  - noUnusedParameters
    - 检查未使用的参数
- 高级
  - allowUnreachableCode
    - 检查不可达代码
    - 可选值：
      - true，忽略不可达代码
      - false，不可达代码将引起错误
  - noEmitOnError
    - 有错误的情况下不进行编译
    - 默认值：false

## 面向对象
在程序中所有的操作都需要通过对象来完成
- 举例：
  - 操作浏览器要使用window对象
  - 操作网页要使用document对象
  - 操作控制台要使用console对象
- 对象是什么 ?
  - 计算机程序的本质就是对现实事物的抽象，即某类事物（类），而类的具体化就是对象 
  - 如我们把世界上动物的所有事物抽象成一个animal类，用这个animal类具体化成一只狗，这只狗就是对象
  - 在程序中所有的对象都被分成了两个部分数据和功能，狗有品种、毛色、性别，这些就是数据，即程序中的属性；狗会跑、会叫，这些就是功能，即程序中的方法
  - 简而言之，程序中一切都是对象

### 类
- 定义类
    - ```typescript
        class 类名 {
            属性名: 类型;

            constructor(参数: 类型) {
                this.属性名 = 参数;
            }

            方法名() {
                ....
            }
        }
        ```

- 使用类
    - ```typescript
        const dog = new Animals('狗', '萨摩耶');
        dog.say();
        ```
