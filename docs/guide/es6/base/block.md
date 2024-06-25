## 语句块

> 所有的语句的{}部分，都是语句块

~~~js
if () {语句块}
for () {语句块}
switch () {语句块}
~~~

语句块结合let声明的表现分析

- ES5中，语句块不会形成作用域

~~~js
        if (true) {
            var a = 1;
        }
        console.log(a);
~~~

-  在let声明中，语句块内部会在**收集变量的时候**，会触发引擎在语句块中**创建一个独立作用域**（块级作用域）
- 在所有语句块中let声明的变量，被收集的时机都是在代码解释执行的阶段。

~~~js
        debugger
        if (true) {
            debugger
            let a = 1;
            debugger
        }
        console.log(a);
~~~

## 块级作用域

> 系统或手动的创建的非全局，非脚本，非函数作用域的其他作用域

~~~js
        // global {
        //     a: undefined
        // }
        {
            // block: {
            //     b: ?
            // }
            var a = 1;
            let b = 2;
        }

        // var a 会被收集在global作用域中，外部能够访问。
        // let b 收集变量，创建block作用域（块级作用域），外部不能访问。
        console.log(a);
        console.log(b);
~~~

~~~js
        switch (true) {
            case true:
                let a = 1;
                break;
        }

        // 外界无法访问块级作用域中的变量
        console.log(a);
~~~

~~~js
        switch (true) {
            // Block scope
            case true:
                let a = 1;
            case true:
                console.log(a);
        }
~~~

在第二个case中，我们能访问到变量`a` ,则说明块级作用域是在`switch (true) {}` 内部