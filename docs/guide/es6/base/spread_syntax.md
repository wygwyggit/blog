## 参数空间

代码示例1：

~~~js
        let a = 1
        function test(a, b = function() {
            a = 2
        }) {
            console.log(a) // undefined
        }
        test()
~~~

查找变量a的顺序（找到了则停止）

1. 函数内部 
2. 参数 
3. 如果参数没有，再到函数父作用域查找。

在上面的代码示例中，查找a，函数内部没有，参数有a，拿到值为`undefined` 

代码示例2：

~~~js
        let a = 1
        function test(a, b = function() {
            a = 2
        }) {
            b()
            console.log(a)  // 2
        }
        test()
~~~

b函数执行，访问变量a，先在参数空间中找，有a，那么就把a的值修改为2。

代码示例3：

~~~js
        let a = 1
        function test(c, b = function() {
            a = 2
        }) {
            b()
            console.log(a) // 2
        }
        console.log(a)  // 1
        test()
~~~

b函数执行，访问变量a，先在参数空间中找，没有a，那么往外层作用域查找。

外层变量有a，那么就把a的值修改为2。

> 参数空间：
>
> 先找参数列表这个空间相同的变量对应的那个值去修改。
>
> 如果找不到，那么找外层作用域的相同的变量进行修改。

## 函数参数默认值

~~~js
        function test(a = 1, b = 2) {
            console.log(a + b)
        }
        test()
~~~

在ES5中，参数默认值

~~~js
        function test(a, b) {
            a = typeof a !== "undefined" ? a : 1
            b = typeof b !== "undefined" ? b : 2
            console.log(a + b)
        }
        test()
~~~

## 展开语法

### 形参中的展开语法-剩余参数

rest   剩余参数

rest **是一个数组**，需要平铺进形参列表（展开语法）

~~~js
        function test(a, b, ...rest) {
            console.log(rest)  // [3, 4]
        }
        test(1, 2, 3, 4)
~~~

### 实参中的展开语法

~~~js
        function test(a, b, c) {
            return a + b + c
        }
        const arr = [1, 2, 3]
        const res = test(...arr)
        console.log(res);
~~~

### 引用拷贝

- 使用`Object.assign` 

~~~js
        const arr = [1, 2, 3]
        const newArr = Object.assign([], arr)
        console.log(arr === newArr)
        console.log(newArr);
~~~

- 使用展开语法拷贝数组

~~~js
        const arr = [1, 2, 3]
        const newArr = [...arr]
        console.log(arr === newArr)
        console.log(newArr);
~~~

- 使用展开语法拷贝对象

~~~js
        const obj = {
            a: 1,
            b: 2,
            c: {
                name: 'zs'
            }
        }
        const newObj = {
            ...obj
        }
        console.log(obj === newObj)  // false
        console.log(newObj)
        newObj.c['name'] = 'ls'
        console.log(obj.c.name)  // 'ls'
~~~

### 合并引用

合并数组

~~~js
        const arr1 = [1, 2, 3]
        const arr2 = [4, 5, 6]
        const arr3 = [...arr1, ...arr2]
        console.log(arr3)
~~~

合并对象

~~~js
        const obj1 = {
            a: 1,
            b: 2
        }
        const obj2 = {
            c: 3
        }
        const obj3 = {
            ...obj1,
            ...obj2
        }
~~~

~~~js
        const obj = {
            a: 1
        }

        function test(...rest) {
            // 包装为数组  [{a: 1}]
            console.log(rest)
        }
        test(obj)
~~~

注意：下面这种代码会报错  Uncaught TypeError: obj is not iterable

...底层就是一次一次的迭代，obj是对象，不具备迭代接口。

~~~js
        const obj = {，
            a: 1
        }

        const arr = [...obj]  
~~~

>总结：
>
>1. 剩余参数使用展开语法，是为了平铺数据到参数列表，而剩余参数本身是会包装成数组的，这个叫做数据的凝聚。
>2. 展开语法是一种将一个集合展开平铺到另一个集合中的一种放出数据的行为，这种行为叫做数据分散。