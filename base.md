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

### 编译选项（tsconfig.json）


影像序列进来，