## 函数声明方式

- function关键字声明

  预编译时进行收集（全部收集），在任何地方都可以调用

  ~~~js
          debugger
          function test() {
              console.log('test');
          }
  ~~~

  

  ![image-20240812215014961](https://static.woku.net/blog/image-20240812215014961.png)

- 函数表达式

  预编译时，收集test,值为undefined

  在程序执行期，才会赋值给一个函数

  ~~~js
          var test = function() {}
  ~~~

![image-20240812215319004](https://static.woku.net/blog/image-20240812215319004.png)

## 闭包

广义的闭包：一个函数的定义，由于始终与外部作用域捆绑，形成了内外作用域的绑定，就形成了闭包。

~~~js
        function test() {
        }
~~~



狭义的闭包：一个函数内部定义了一个内部函数，内部函数与外部函数的作用域形成了绑定，就形成了闭包。

~~~js
        function a() {
            var x = 1;
            function b() {  // 闭包函数
                console.log(x)
            }
            b()
        }
        a()
~~~



实用的闭包：函数A内定义函数B，被返回到函数A外部作用域，并用变量接收，B函数就会将A函数的作用域活跃对象带出而形成了闭包特性。

~~~js
        function a() {
            var x = 1;
            function b() {

            }
            return b
        }

        var c = a();
        c();
~~~

## 箭头函数

Arrow Function

是由`Arrow Function` 构造的，具有内部插槽 [[Arrow Function]]

特性：

- 箭头函数总是匿名函数
- 在全局定义的箭头函数，还在预编译阶段收集变量。在代码解释执行阶段，将箭头函数初始化给变量。
- 目的：1. 为了简洁  2. 提供稳定的`this` 指向。

~~~js
        debugger
        const a = () => {

        }
~~~



普通函数

```js
    function a() {
        this.name = 'wk'
        console.log(arguments)
        console.log(a.constructor)
        console.log(this)
    }
    console.dir(a)
    a()
    
    const newA = new a.prototype.constructor()
```

打印结果：

![image-20240818223921689](https://static.woku.net/blog/image-20240818223921689.png)

箭头函数

~~~js
        const a = () => {
            console.log(arguments);
        }
        a()
~~~

Uncaught ReferenceError: arguments is not defined

- 箭头函数内部没有`arguments` 

~~~js
        const a = () => {
            this.name = 'wk'
            console.log(a.constructor) // [[Construct]] Internal Property(内部属性)
        }
        console.dir(a)
        a()
~~~

console.dir结果出来的变量a

![image-20240818225417349](https://static.woku.net/blog/image-20240818225417349.png)

在上面的普通函数打印的a

![image-20240818225542329](https://static.woku.net/blog/image-20240818225542329.png)

所以说，箭头函数不具备构造器功能，也不能访问`a.prototype.constructor()`

> Internal Property  内部属性，底层的，我们不能直接访问
>
> Build-in  Property  内置属性，提供给开发者调用的
>
> [[constructor]]  插槽，有这个插槽说明具备构造器功能。

- 箭头函数不具备构造对象实例的能力。

## 箭头函数为什么不具备构造对象实例的能力

### 现象：

~~~js
        const a = () => {
            this.name = 'wk'
            console.log(a.constructor)
        }

        const newA = new a()
        console.log(newA)
~~~

new a()会报错：Uncaught TypeError: a is not a constructor。

翻译过来：a不是一个构造器，也就是底层没有`[[Construct]]` 这个内部属性。

### 箭头函数中的`this` 

**this  执行期上下文**

~~~js
        function a() {
            this.name = 'wk'
            // 访问this总是指向父作用域中的this指向。
            let b = () => {
                // 箭头函数并不是没有this,
                // 箭头函数访问this总是指向父作用域的this指向
                console.log(this)
            }
            b()
        }
        new a() // {name: 'wk'}
        a()  // window
~~~

~~~js
        function test() {
            // this指向new出来的这个对象
            this.step = 0;
            setTimeout(function() {
                // this指向window
                this.step++;
                console.log(this.step)  //NaN
            }, 0);
        }

        new test()
~~~

普通函数中的this指向会根据执行的方式不同，而有所变化。

在ES5中，经常用一个变量来保存`this` 

~~~js
        function test() {
            var _this = this
            _this.step = 0;
            setTimeout(function() {
                _this.step++;
                console.log(_this.step)  // 1
            }, 0);
        }

        new test()
~~~

在ES6中，可以直接使用箭头函数。

~~~js
        function test() {
            this.step = 0;
            setTimeout(() => {
                this.step++;
                console.log(this.step)  // 1
            }, 0);
        }

        new test()
~~~

> 总结：
>
> 箭头函数没有自己的this指向，使用的是其所在的封闭的作用域的this指向
>
> 箭头函数的创建是为了解决JS开发中this指向总是不稳定的情况
>
> 构造函数是在执行期通过new来改变this指向的，所以this指向是不稳定的
>
> 这就恰恰违背了箭头函数稳定this指向的创建初衷，所以为了追求this指向的稳定，没有给箭头函数设计构造器功能。

## 箭头函数返回值

如果箭头函数里面，只有一个`return`的话，可以使用下面的方式简写：

~~~js
        const test = () => {
            return 'wk'
        }
        // 简写
        const test1 = () => 'wk1'
        const test2 = () => (
            'wk2'
        )
        const t1 = test1()
        const t2 = test2()
        console.log(t1)
        console.log(t2)
~~~

注意：

1. this => 函数没有执行的时候，指向是不能确定的
2. 箭头函数并不是在执行之前，就能确定this指向，只是**在程序执行的时候**，总是指向父作用域的this指向。