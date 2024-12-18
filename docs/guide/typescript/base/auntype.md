## 基元类型和非基元类型
基元类型：string | number | boolean | bigint | symbol | null | undefined 

非基元类型： object => Object | Number | String | Boolean | Array | Function ....

> Object和object的区别
>
> Object：对象 数据类型
>
> object:  泛指引用类型
>
> object可以继承Object的原型
>

```typescript
// object可以继承Object的原型
function test(obj: object) {
    obj.hasOwnProperty('a');
    obj.valueOf();
    obj.toString();
}
test({})
test([])
test(new Map())
```

## any和unknown
+ any

任何类型，其类型的值可以参与任何的逻辑和运算

any可以使`TypeScript`回归到`JavaScript`编码状态, 会屏蔽所有的静态类型检查

```typescript
function test(a: any) {
    a.split(' ')
    a.toString()
    a.b
}
```

+ unknown

一个未知的类型，`TS`不知道该怎么分配类型，值是可以接受类型断言的

`any`的一个升级，`unknown`是`any`补充限制的一个新类型

```typescript
function test(a: unknown) {
    (a as number).toFixed();
    (a as string).split(' ');
}
```

```typescript
function test(jsonStr: string) : unknown {
    return JSON.parse(jsonStr)
}

const jsonData = test('{"a": 1}')
// unknown类型不能访问a,会报错
console.log(jsonData.a)
```

可以自己定义一个类型，然后用类型断言解决

```typescript
function test(jsonStr: string) : unknown {
    return JSON.parse(jsonStr)
}

interface IObj {
    a: number
}
const jsonData = <IObj>test('{"a": 1}')
console.log(jsonData.a)
```



`unknown`禁止方法调用，或方法执行。

```typescript
let a: unknown
a = 1
a = {}
a.sayHi() // 报错 'a' is of type 'unknown'
```

## nerver
TS的底层类型，没有可分配的类型了

下面代码中，default逻辑中的`a`就是`nerver`类型。在前面，`number`和`string`已经分配了，类型缩小，最后没有可分配的类型了。

`test`函数需要返回number | string，但是在default中，没有return,那么默认返回undefined。

```typescript
//红下划线部分报错： Function lacks ending return statement and return type does not include 'undefined'
function test(a: number | string) : number | string {
    switch(typeof a) {
        case 'number':
            return a
        case 'string':
            return a;
        default:
            console.log(a)
            break;
    }
}
```

```typescript
// 返回的是never，test函数不会限制返回值
function test(a: number | string) : number | string {
    switch(typeof a) {
        case 'number':
            return a
        case 'string':
            return a;
        default:
            return myError('参数类型错误')
    }
}

// never的作用，告诉TS现在没有可用的值了
function myError(err: string) : never {
    throw new Error(err)
}
```

## Function
不会限制参数和返回值类型的时候，可以用`Function`

```typescript
// Function 的参数都是any类型，返回值是void
function plus(a: number, b: number, cb: Function) : void {
    let res = a + b
    typeof cb === 'function' && cb(a, b, res)
}
/**
 * 如果TS配置文件中的noImplicitlyAny为true，
 * TS永远不能接受隐式的any类型
 * 下面的a,b,res都是隐式的any,会报错
 */
plus(1, 2, (a, b, res) => {
    console.log(a, b, res)
})
```

cb的类型可以使用函数签名

```typescript
// 使用函数签名
type TCallback = (a: number, b: number, res: number) => void
function plus(a: number, b: number, cb: TCallback) : void {
    let res = a + b
    typeof cb === 'function' && cb(a, b, res)
}
plus(1, 2, (a, b, res) => {
    console.log(a, b, res)
})
```

## <font style="color:rgb(204, 204, 204);background-color:rgb(32, 32, 32);"></font>一些小技巧
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

