## 概述
+ JavaScript的超集
+ 基于ECMAScript语言规范
+ 在ECMAScript的基础上扩展了静态类型和完善了面向对象编程
+ 2012年由微软推出

> ECMA：欧洲计算机制造协会
>
> ECMAScript：基于ECMA262文件（脚本语言规范）的一门语言
>
> ES3,ES5,ES6 .... 是ECMAScript的迭代版本
>
> 超集：TypeScript包含了ES3, ES5, ES6和其他迭代版本
>
> TypeScript：基于ECMAScript，进一步扩展的产物
>
> JavaScript：泛指ECMAScript语言，应是一门技术，包含ECMAScript语言，BOM，DOM，HTML5相关API，工程化等等。
>

## 为什么要使用
TypeScript的存在就是动态的制定了一个更明确的对对象的使用规范，类型定义和严格的约束是一个复杂项目维护的基础条件

比如：

1. 一个属性存不存在可能是未知的，能不能访问或能不能调用

![](https://cdn.nlark.com/yuque/0/2023/png/12494740/1696732708081-30e0e52d-6e59-461e-8ea3-c2427b152e13.png)

使用TypeScript，可以非常清楚的知道obj这个对象里面有没有c属性。



2. 一个函数对参数的约定，在JS中，极有可能很难判断函数正常工作的参数条件。

使用TS前：

```typescript
function plus(a, b) {
    return a + b
}
plus("1", "2")
plus(1, 2)
```

在JS中，我们要正常完成`a+b`的工作，需要传入的参数是number类型。使用着在调用时候，不能清楚的知道参数的类型。

使用TS后：

![](https://cdn.nlark.com/yuque/0/2023/png/12494740/1696733472061-c7ea251d-4da7-4593-9f79-ed2a411665a5.png)

可以看到，函数调用的时候，参数的类型需要使用number类型。

> 这些未知信息可能产生的情况，导致了对对象的使用者有很多不必要花费的使用成本以及对项目维护的代码分析的成本
>

## 类型的注解与any类型特点
### 类型的注解
+ 显示类型定义：手动指定变量类型。

```typescript
let a: number;
a = 1;
```

+ 类型推断：通过赋值的方式让ts自动推断出变量类型。

```typescript
let b = "123"  // 类型推断为string
```

+ 隐式的any：没有手动定义类型，又不能类型推断，又不是严格模式，那么隐式注释为any。

![](https://cdn.nlark.com/yuque/0/2023/png/12494740/1696772874099-d511412d-dbeb-4243-99ed-8d5655d9ce47.png)

对于any类型，TypeScript本身是不认可的。

你可以手动修改`tsconfig`文件

将  `strict：true` 严格模式改为`false` 后，可以使用any（**使用TypeScript，强烈建议使用严格模式，禁用any**）

或将`noImplicitAny（没有隐式any）`改为`false`

---------------------------------------------------------------

![](https://cdn.nlark.com/yuque/0/2023/png/12494740/1696775575460-2c4ad974-6179-4adf-b4e5-5edad88f5f52.png)

**T**ypeScript默认情况下，对null，undefined有严格检查

将  `strictNullChecks：true` 改为`false` 后，可以取消对null，undefined严格检查（不建议把严格检查关闭）

你完全可以写成下面这样：

```typescript
let a: string;
let b: Object = {};
```

### any类型的特点
> any：任意的类型
>
> 一种使TypeScript代码**退回到JavaScript**代码编写的方案
>
> 不存在任何静态类型检查
>

+ any类型的数据可以赋值给任何类型的变量

```typescript
let a = 1
let b: any = { name: "woku" }

a = b
```

+ any类型的变量可以被任何类型的变量赋值

```typescript
let a: any;
let b = 1;

a = b;
```

+ 可以任意访问对象属性

```typescript
 let obj: any = {
    a: 1
 }
console.log(obj.b);
```

+ 可以给对象的属性进行追加

```typescript
let obj: any = {
    a: 1
}
obj.b = 2
```

+ 隐式的any在严格模式下是不允许的，你可以显示的定义any

```typescript
function plus(a: any, b: any) {
    return a + b
}
plus(1, 2)
```

## 显示类型定义与类型推断
### 静态语言类型和TS中类型对比
+ 静态语言中的类型

静态语言变量的在定义时确定某种类型是为了能正确的在内存中**分配相应类型的空间**

```typescript
int a = 1;
// 开辟一个init类型的空间
// a作为一个标识符
// a的类型为int
// 将1赋值给a (将1存储到该空间）
```

+ TS中的类型

TS类型定义不是为了在内存中分配相应类型的空间

是为了在编译成JS代码之前进行**静态类型检查**

> 静态类型语言：分配空间
>
> TS：静态类型检查
>

### 显示类型定义
```typescript
let a: string = "hellow";
let n: number = 1;
let bol: boolean = true;
```

### 类型推断
根据等号后面的表达式计算出的结果的类型对变量类型进行推断。

```typescript
let str = "hellow";
let str2 = " typescript";
let str3 = str + str2;
```

```typescript
let n1 = 100;
let n2 = 200;
let n3 = n1 + n2;
```

:::info
为什么TS没有像Java一样的char,String类型呢？

1. TS是为了做静态类型检查的
2. 不是为了在内存中开辟相应数据类型的空间
3. TS编译的本质是将ts代码转换成js代码
4. 所以ts的基本数据类型都沿用了js中 typeof 返回的数据类型

:::

:::success
为什么TS没有像Java一样的整型和浮点型？

1. Java中的整型和浮点型是为了静态类型检查和分配相应内存空间的
2. 而TS中，分整型和浮点型只能做静态类型检查
3. 而JS中，并没有对其进行类型划分
4. 针对JS业务场景来说，对整型和浮点型的区分并没有要求。

:::

:::danger
为什么TS的基本数据类型定义都是小写？

1. TS的基本数据类型定义都是直接沿用JS typeof 返回的值
2. TS中也可以定义String, Number, Boolean，只是意义不同而已

:::

```typescript
 let str: string = 'abc'
 let strObj: String = new String('abc')

 let age: number = 1
 let ageObj: Number = new Number(1)

 let bol: boolean = true
 let bolObj: Boolean = new Boolean('true')


 class Person {

 }
 const p: Person = new Person()
```

:::danger
什么时候用显示类型定义，什么时候用类型推断？

1. 如果你有在代码层面上明确类型展示的目的，那么可以使用显示类型定义
2. 在一般情况下，TS可以进行明确的类型推断，就不在需要显示类型定义了，特别是在变量定义和初始化时候。

:::

## 引用类型
### 数组
> 几平所有的编程语言中[]都指代一个数组
>
> 在TS中，数组元素的类型在定义时必须确定
>
> 在JS中，数组是由字典方式存储的，数组长度是动态的 (不定长)
>

```typescript
let list: string[] = ['1', '2', '3']
let nList: number[] = [1, 2, 3]

// list.push(4)  Argument of type 'number' is not assignable to parameter of type 'string'
// nList.push('4')  Argument of type 'string' is not assignable to parameter of type 'number'
```

```typescript
let newList: Array<string> = ['1', '2', '3']
let newList2: Array<number> = [1, 2, 3]
```

+ TS同样可以对其进行类型推断

```typescript
let intArr = [1, 2, 3]  // let intArr: number[]
let strArr = ['1', '2', '3']  // let strArr: string[]
```

+ 数组元素的类型有多种

```typescript
// 这种类型定义方式是限制数组内部可用什么类型
let infoArr: (string | number | boolean)[] = ['zhangsan', 23, true]
```

```typescript
// 对数组内部的结构和类型一起进行约束。
type TypeinfoArr = [string, number, boolean]
let infoArr1: TypeinfoArr = ['zhangsan', 23, true]
```

+ 数组内部元素是否可选

```typescript
type TypeinfoArr2 = [string, number, boolean?]
let infoArr2: TypeinfoArr2 = ['zhangsan', 23]
let infoArr3: TypeinfoArr2 = ['zhangsan', 23, true]
```

### 对象
+ 如果不给obj定义类型，obj也不是隐式的any
+ TS会根据对象值进行类型的判断

![](https://cdn.nlark.com/yuque/0/2023/png/12494740/1697467407742-571517f5-5346-4f53-a916-411a2957faf9.png)

+ 如果你需要一个**特定的属性集合**的obj定义的话，需要**显示的**给obj进行类型定义。

```typescript
type TypeObj = {
    myName: string,
    myAge: number,
    married: boolean
}
let obj: TypeObj = {
    myName: "zhangsan",
    myAge: 23,
    married: false
}
```

+ 对象的可选属性

```typescript
type TypeObj = {
    myName: string,
    myAge: number,
    married?: boolean
}
let obj: TypeObj = {
    myName: "zhangsan",
    myAge: 23,
    married: false
}
let obj1: TypeObj = {
    myName: "zhangsan",
    myAge: 23
}
```

## 联合类型与类型别名
+ 联合类型

```typescript
function getName(val?: string) {
    console.log(val?.toLowerCase());
}
getName()
getName("张三")

// 本质上，在不同函数调用形式下，参数可能出现不同的类型
// 特别是可选参数，参数变量会被TS隐式的增加undefined类型
// 在程序代码使用参数时，要注意参数是undefined的情况
```

我们在定义类型的时候，可以定义更**包容的**类型形式

这种类型形式之一就是 联合类型

string | number

+ 类型别名

顾名思义，就是给类型定义一个别名（取一个小名）

命名规范：

1. 首写字母大写（大驼峰）
2. 推荐在类型名称前加上Type （根据公司具体规范）

```typescript
type TypeFullName = string | string[]

const myName: TypeFullName = "刘大宝"
const myName1: TypeFullName = ["刘", "大", "宝"]
```

综合：

```typescript
// 类型别名
type TypeTodoValue = {
    id: number,
    content: string | string[],
    completed: boolean
}
const todoItem: TypeTodoValue = {
    id: 0,
    content: "",
    completed: false
}

type TypeSetTodoVal = number | string | boolean | string[]
function setTodoVal(val: TypeSetTodoVal): TypeSetTodoVal {
    switch (typeof val) {
        case "number":
            todoItem.id = val;
            break;
        case "string":
            todoItem.content = val;
            break;
        case "boolean":
            todoItem.completed = val;
            break;
        default:
            break;
    }
    if (Array.isArray(val)) {
        todoItem.content = val.join(", ");
    }
    return val
}
// const id = setTodoVal(2);
// const content = setTodoVal("吃饭");
// const completed = setTodoVal(false);
// console.log(todoItem);

const id = setTodoVal(3);
const content = setTodoVal(["吃饭", "睡觉", "学习TS"]);
const completed = setTodoVal(false);
console.log(todoItem);
```

## <font style="color:rgb(33, 53, 71);">接口 interface</font>
+ 基本使用

给对象或类定义规范

```typescript
interface IPlusArgs {
    a: number;
    b: number;
}

function plus({a, b} : IPlusArgs): number {
    return a + b;
}

const res = plus({
    a: 1,
    b: 2
})
console.log(res);
```

+ 任意key的设置

```typescript
interface IObj {
    [key: string]: number
}
const obj : IObj = {
    a: 1,
    b: 2
}
console.log(obj);
```

+ 函数类型的定义

```typescript
type TypePlus = (a: number, b: number) => number;
interface IPlus {
    (a: number, b: number) : number
}
const plus : TypePlus = (a : number, b : number ) : number => {
    return a + b;
}
const plus2 : IPlus = (a : number, b : number ) : number => {
    return a + b;
}
console.log(plus(1, 2));
console.log(plus2(1, 2));
```

+ 带函数对象的定义

```typescript
interface IObj {
    a: number,
    getA() : number,
    setA(value: number) : void,
    // 带？表示可选
    sayHi?() : void
}
const obj : IObj = {
    a: 1,
    getA() {
        return this.a;
    },
    setA(value : number) {
        this.a = value
    }
}
```

+ 交叉类型

类型别名使用 `&`

接口使用 `extends`

```typescript
type TypeUser = {
    name: string,
}
// 类型别名的交叉类型
type TypeAdmin = TypeUser & {
    token: string,
}
const user1 : TypeUser = {
    name: 'woku'
}
const user2: TypeAdmin = {
    name: 'zhangsan',
    token: '<TOKEN>'
}

interface IUser {
    name: string,
}
interface IAdmin extends IUser {
    token: string,
}
const user3 : IUser = {
    name: 'lisi',
}
const user4 : IAdmin = {
    name: 'wangwu',
    token: '<TOKEN>'
}
```

+ 接口合并

相同名称的接口，可以进行合并

A定义了一个接口，B想在这个接口里面加一个，又不想改A的代码，那么B可以自己再定义一个同名称的接口。

```typescript
interface IBook {
    id: number,
    name: string
}
interface IBook {
    price?: number
}

const oldBook : IBook = {
    id: 1,
    name: 'vue',
}
const newBook : IBook = {
    id: 2,
    name: 'react',
    price: 10
}
```

+ 定义类

```typescript
type TUserArgs = {
    name: string,
    age: number
}
interface IUser {
    name: string,
    getAge() : number,
    setAge(value: number) : void
}

class User implements IUser {
    public name: string;
    private age: number
    constructor({
        name,
        age
    } : TUserArgs) {
        this.name = name
        this.age = age
    }
    getAge(): number {
        return this.age
    }
    setAge(value: number): void {
        this.age = value
    }
}
```

## 非空断言
如下代码

oBox的类型为：HTMLElement | null

null是不能调用innerHTML的，所以编辑器会报错提示：'oBox' is possibly 'null'

```typescript
const oBox = document.getElementById('box');
oBox.innerHTML = 'Hello World'; // 报错：'oBox' is possibly 'null'
```

解决：

程序员告诉TS，这个表达式的结果一定不为空。 - 非空断言

```typescript
// const oBox = document.getElementById('box')!;
// oBox.innerHTML = 'Hello World';

const oBox = document.getElementById('box');
oBox!.innerHTML = 'Hello World';
```

## 类型断言
<font style="color:rgb(33, 53, 71);">有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型。 比如，</font>

```typescript
// aLink 的类型 HTMLElement，该类型只包含所有标签公共的属性或方法
// 这个类型太宽泛，没包含 a 元素特有的属性或方法，如 href
const aLink = document.getElementById('link')
```

+ <font style="color:rgb(33, 53, 71);">但是我们明确知道获取的是一个 </font>`<font style="color:rgb(250, 119, 0);">A</font>`<font style="color:rgb(33, 53, 71);"> 元素，可以通过 </font>`<font style="color:rgb(250, 119, 0);">类型断言</font>`<font style="color:rgb(33, 53, 71);"> 给它指定一个更具体的类型。</font>

```typescript
const aLink = document.getElementById('link') as HTMLAnchorElement
```

+ <font style="color:rgb(33, 53, 71);">解释:</font>
    1. <font style="color:rgb(33, 53, 71);">使用</font><font style="color:rgb(33, 53, 71);"> </font>`<font style="color:rgb(250, 119, 0);">as</font>`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">关键字实现类型断言</font>
    2. <font style="color:rgb(33, 53, 71);">关键字</font><font style="color:rgb(33, 53, 71);"> </font>`<font style="color:rgb(250, 119, 0);">as</font>`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）</font>
    3. <font style="color:rgb(33, 53, 71);">通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了</font>

## <font style="color:rgb(33, 53, 71);">类型缩小</font>
+ TS会通过JS代码逻辑来判定一个变量类型

```typescript
function test(a: string | number | boolean | null | string[]) {
    if (a) {
        if (typeof a === 'string') {
            // a判定为字符串
            console.log(a.toUpperCase())
        } else if (typeof a === 'number') {
            // a判定为数字
            console.log(a.toFixed(2));
        } else if (Array.isArray(a)) {
            // a判定为数组
            console.log(a.join(' '));
        } else if (typeof a === 'boolean') {
            // a判定为布尔值
            console.log(a.toString());
        } else {
            console.log('未知类型');
        }
    } else {
        console.log('null');
    }
}
```

+ in可以缩小联合类型的类型范围，本质上就是排除决不可能的类型

```typescript
interface ISiderBar {
    hide(): void
}
interface IModel {
    close() : void
}
interface ITip {
    hide?() : void
    close?() : void
}

type TComponent = ISiderBar | IModel | ITip
function setClose(comp: TComponent) {
    if ('hide' in comp) {
        // comp的类型是ISiderBar | ITip，排除了IModel
        (<ISiderBar>comp).hide()
        return
    }
    (<IModel>comp).close()
}
```

+ 通过instanceof，TS能确定变量类型

```typescript
function printDate(date: Date | string) {
    if (date instanceof Date) {
        // date为Date类型
        return formatDate(date)
    }
    // date为string类型
    return date
}
function formatDate(date: Date) {
    return date
}
```

+ 三元运算和&&

```typescript
let flag = true
let count = 0
// a被判定为number类型
let a = flag && plus(count)
function plus(count: number) {
    return count + 1
}
```

```typescript
let flag = false
let count = 0
// a被判定为boolean类型
let a = flag && plus(count)
function plus(count: number) {
    return count + 1
}
```

```typescript
let flag = true
let count = 0
// a被判定为number类型
let a = flag ? plus(count) : flag
function plus(count: number) {
    return count + 1
}
```

```typescript
let flag = false
let count = 0
// a被判定为number | boolean类型
let a = flag ? plus(count) : flag
function plus(count: number) {
    return count + 1
}
```

+ TS对流程进行分析，来缩小变量的类型

```typescript
let a : string | number | boolean;
a = true;
if (a) {
    a = '123';
} else {
    a = 123;
}
// a被判定为number | string类型
console.log(a)
```

+ 谓词

```typescript
// : val is string 谓词
// 如果return的值为true，就判定val的类型为string
function isString(val: unknown) : val is string {
    return typeof val === 'string'
}
// : val is number 谓词
// 如果return的值为true，就判定val的类型为number
function isNumber(val: unknown) : val is number {
    return typeof val === 'number'
}
function formatArr (val: unknown) : string[] {
    if (isString(val)) {
        // val判定为string类型
        return val.split('')
    }
    if (isNumber(val)) {
        // val判定为number类型
        return val.toString().split('')
    }
    return []
}
```

> 注意：新版TS也能根据逻辑来判定变量的类型，不需要使用谓词的方式。
>

## nerver类型
nerver类型 -> 穷尽检查

没有类型，找不到类型，没有任何类型可以被分配

```typescript
type TArgs = number | string 
function formatA(val: TArgs) : string | number {
    switch (typeof val) {
        case 'number':
            return val.toFixed(2);
        case 'string':
            return val.toUpperCase()
        default:
            // val是never类型，在前面的case中穷尽检查了所有可能的情况
            return val
    }
}
```

>  不能将非nerve的任何类型分配给nerve类型
>
>  let a: never = 123 // 报错：<font style="color:#DF2A3F;">Type 'number' is not assignable to type 'never'</font>
>

## 函数签名
函数签名 就是对函数类型的定义

1. 声明函数时进行的函数签名

```typescript
function plus(a: number, b: number) : number {
    return a + b
}
/**
 * plus函数签名中的函数名
 * a: number, b: number 函数签名中的参数列表
 * number 函数签名中的返回值类型
 */
```

2. 函数类型的表达式

```typescript
type TPlus = (a: number, b : number) => number
const plus : TPlus = (a, b) => {
    return a + b
}
```

3. 对回调进行函数签名

```typescript
enum ComputeMethod {
    PLUS = '+',
    MINUS = '-',
    MULTIPLY = '*',
    DIVIDE = '/',
}
type TComputeArgs = {
    a: number,
    b: number,
    method: ComputeMethod
}
// 对回调进行函数签名
type TCallback = (a: number, b: number, method: ComputeMethod, res : number) => void
function compute({
    a,
    b,
    method
} : TComputeArgs, cb : TCallback) {
    let res : number = 0;
    switch (method) {
        case '+':
            res = a + b;
            break;
        case '-':
            res = a - b;
            break;
        case '*':
            res = a * b;
            break;
        case '/':
            res = a / b;
            break
        default:
            return 0;
    }
    typeof cb === 'function' && cb(a, b, method, res)
}

compute({
    a: 10,
    b: 20,
    method: ComputeMethod.PLUS
}, (a, b, method, res) => {
    console.log(res);
})
```

4. 调用签名

<font style="color:rgb(37, 41, 51);">在javaScript中函数除了被调用还能有自己的属性值</font>

<font style="color:rgb(37, 41, 51);">在函数类型中不能声明属性，所以我们可以在对象中写一个调用签名，如下面的</font>`<font style="color:rgb(37, 41, 51);">result</font>`

<font style="color:rgb(37, 41, 51);">如果函数中需要有属性就用 </font>**<font style="color:rgb(37, 41, 51);">调用签名</font>**<font style="color:rgb(37, 41, 51);">否则就用普通函数类型声明即可</font>

```typescript
enum ComputeMethod {
    PLUS = '+',
    MINUS = '-',
    MULTIPLY = '*',
    DIVIDE = '/',
}
type TCompute = {
    result?: number,
    (a: number, b: number, method: ComputeMethod) : void
}
const compute : TCompute = (a, b, method) => {
    let res : number = 0;
    switch (method) {
        case '+':
            res = a + b;
            break;
        case '-':
            res = a - b;
            break;
        case '*':
            res = a * b;
            break;
        case '/':
            res = a / b;
            break
        default:
            return 0;
    }
    compute.result = res
}

compute(10, 20, ComputeMethod.PLUS)
console.log(compute.result);
```

5. 构造签名

```typescript
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}
// 相当于下面的这种写法
// class Person {
//     public name: string
//     public age: number
//     constructor(
//         name: string,
//         age: number
//     ) {
//         this.name = name
//         this.age = age
//     }
// }
type TPersonConstructor = {
    new(name: string, age: number): Person
}
function createPerson(personInfo: TPersonConstructor) {
    return new personInfo('wokuw', 28)
}
const ins = createPerson(Person)
console.log(ins);
```

## <font style="color:rgb(33, 53, 71);">泛型</font>
泛型：泛指的类型（数据类型不明确时的替代类型）

在定义时，接收泛指的数据类型（具体不知道什么类型），先给一个泛型来占位

在使用时，指定明确的数据类型

基本上，最小限度使用any的情况，都可以考虑是否适用于泛型

```typescript
/**
 * 泛型书写位置：
 * 1. 函数声明：写在函数名后面
 * 2. 类型别名：写在表达式最前面
 */
// function arrToString<E>(arr: E[], separator: string): string {
//     return arr.join(separator)
// }
const arrToString = <E>(arr: E[], separator: string): string => {
    return arr.join(separator)
}

/**
 * 调用函数时：在函数名后面跟泛型，传入具体的数据类型
 */
const res = arrToString<string>(['1', '2'], '-')
const res2 = arrToString<number>([1,2], ',')
console.log(res, res2)
```

> 泛型的标识符：可以由任意的字符串或字符来标识
>
> 常见的标识符：
>
> T:  Type
>
> E:  Element
>
> K:  Key
>
> V:  Value
>
> R:  Result
>
> N:  Number
>
> S:  String
>

> 类型参数化是泛型的特征
>
> 定义时，传入类型参数 （相当于函数定义的形参）
>
> 调用时，传入实际类型 （相当于函数调用的实参）
>

+ 函数类型的复用

```typescript
type TPlus<T> = (a: T, b: T) => T
const plusNumber: TPlus<number> = (a, b) => {
    return a + b
}
const plusString: TPlus<string> = (a, b) => {
    return a + b
}
const res1 = plusNumber(1, 2)
const res2 = plusString('1', '2')
```

泛型可以定义多个

```typescript
type TPlus2<T, U> = (a: T, b: U) => string
const plusNumberString: TPlus2<string, number> = (a, b) => {
    return a + b.toString()
}
const res3 = plusNumberString('1', 2)
```

注意：下面是错误的写法

传入的泛型，在函数体内的逻辑一定要可操作。

```typescript
// 报错 Operator '+' cannot be applied to types 'T' and 'T'
// 调用的时候，可以传入任何的类型，不一定是number或string, 而对于其他类型是不能进行a+b的操作。
function plus<T>(a: T, b: T) : T {
    return a + b
}
```

+ 请求接口中泛型的使用

```typescript
interface IResult {
    code: number,
    data: any
}
async function getData<T>(url: string) : Promise<T> {
    const res = await fetch(url)
    return res.json()
}

getData<IResult>('某一个请求URL').then(res => {
    console.log(res);
})
```

## 一些小技巧
+ 如何定义type来约束一个对象，键名只有`a`, `b`, `c`。值是数值 ，字符串和布尔值类型

```typescript
type TKey =  'a' | 'b' | 'c'
type TValue = string | number | boolean
type TObj = {
    [key in TKey]: TValue
}
let personInfo : TObj = {
    a: 'woku',
    b: 28,
    c: true,
}
```

