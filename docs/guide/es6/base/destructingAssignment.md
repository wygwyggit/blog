## 什么是解构赋值

~~~js
        const arr = [1, 2, 3]
        const [a, b, c] = arr
~~~



1. 把这个数据分散出来，一个一个的拿出来。（解构）
2. 按顺序给到a, b, c。（赋值）。

## 数组中的解构赋值

~~~js
        const arr = [1, 2, 3, 4, 5]
        //  需求：
        //  e1: 1,
        //  e2: 2,
        //  e3: [3, 4, 5]
        
        // const e1 = arr[0]
        // const e2 = arr[1]
        // const e3 = arr.slice(2)
        // console.log(e1, e2, e3)
        
        // 使用解构赋值
        // e3集中起来，剩余成员
        // 展开运算符，将左边的和右边的一一对应。
        const [e1, e2, ...e3] = arr
        console.log(e1, e2, e3)
~~~

## 对象中的解构赋值

~~~js
        const obj = {
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: 5
        }

        const {a, b, ...rest} = obj
        console.log(a, b, rest)
~~~

> 解构赋值，让程序变得更加清晰，易读。一眼就能看出a, b, rest对应的值，

## 其他

~~~js
        const obj = {
            a: {
                name: 'wyg'
            },
            b: 2
        }

        let {a, b} =  obj
        console.log(a === obj.a) // true
        a = {
            name: 'woku'
        }
        console.log(obj.a) // {name: 'wyg'}
~~~

obj的每一项拿出来，分别赋值给变量a, b。赋值给变量a的是一个引用地址。这个地址和obj.a指向的是同一个地址。所以打印 a === obj.a的结果是true。

变量a重新赋值，指向了一个新的地址，此时和obj.a不再是同一个地址。



- 解构变量声明类型的穿透

~~~js
        const obj = {
            a: {
                b: 1
            }
        }

        const {
            a: {
                b: x
            }
        } = obj
        console.log(x)
        x = 2; // 报错 Uncaught TypeError: Assignment to constant variable.
        // 此时的x变量也是一个常量，使用const声明。
~~~

- 解构赋值默认值

~~~js
        const [a = 1, b = 2, c] = [, , 3]
        console.log(a, b, c)
~~~

- 交换值

~~~js
        let a = 1;
        let b = 2;

        [b, a] = [a, b]
        console.log(a, b)
~~~

- 忽略属性

~~~js
        const [a, , b] = [1, 2, 3]
        console.log(a, b)
        const {name, age} = {
            name: 'wyg',
            email: '123@qq.com',
            age: 25
        }
        console.log(name, age)
~~~

- 解构原型上的属性

~~~js
        const arr = [1, 2]
        Array.prototype.test = function() {
            console.log('123')
        }
        const [a, b, ...{ test}] = arr
        test()
~~~

- 提前声明变量

~~~js
        let a,
            b;
        {a, b} = {a: 1, b: 2}
~~~

注意这种写法会报语法错误：Uncaught SyntaxError: Unexpected token '='。

我们需要把变成一个表达式

~~~js
        let a,
            b;
        ({a, b} = {a: 1, b: 2})
        console.log(a, b)
~~~

- 解构map数据结构

~~~js
        const m = new Map()
        m.set('a', 1)
        m.set('b', 2)

        console.log(m)
~~~

![image-20240905223944577](https://static.woku.net/blog/image-20240905223944577.png)

这种结构，针对于数组是下面这种结构(二维数组)

[[‘a’, 1], [‘b’, 2]]

那么针对于这种结构，可以进行解构赋值

~~~js
        const m = new Map()
        m.set('a', 1)
        m.set('b', 2)

        console.log(m)
        const [[k1, v1], [k2, v2]] = m
        console.log(k1, v1, k2, v2)
~~~

