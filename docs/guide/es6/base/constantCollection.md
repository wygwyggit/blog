## 错误类型

- SyntaxError：语法错误，发生在语法检查阶段

  ~~~js
      <script>
          let a = 1;
          let a = 2;
      // Uncaught SyntaxError: Identifier 'a' has already been declared 
      </script>
  ~~~

- ReferenceError：引用错误，发生在代码执行期阶段

  ~~~js
      <script>
          console.log(a);
          let a = 1;
       // Uncaught ReferenceError: Cannot access 'a' before initialization
      </script>
  ~~~

  

- TypeError：类型错误，发生在代码执行期阶段

  ~~~js
      <script>
          const a = 1;
          a = 2;
      // Uncaught TypeError: Assignment to constant variable.
      </script>
  ~~~

  

> js代码执行时经历的三个阶段
>
> 1.语法检查阶段，如果语法有错误，报错，停止执行
>
> 2.预编译阶段
>
> 3.代码执行阶段，如果有错误，报错，停止执行

## 常量-不可改变的量

### 概述

只要不重新赋值的标识符都应该使用 `const`  声明（稳定和安全）

使用常量声明：

- 配置量：一般使用全部大写，用_分隔单词
- 普通量：与变量声明方式一致。

### 注意点

1. 常量一旦声明必须初始化。

    const a； // Uncaught SyntaxError: Missing initializer in const declaration

2. 常量一旦初始化在所属作用域生命周期内永久不可变。

3. 常量声明和var声明的区别和let声明一致。

4. 常量对象或数组内的属性或元素可修改。

   ~~~js
    <script>
           const a = {
               x: 1
           }
           a.x = 2; 
           // 只要保证当前常量的引用地址不变，内部属性如何更新不在限制范围内。
    </script>
   ~~~

### 封闭对象

当常量是一个对象或数组时候，怎样让他的内部属性或元素不能被修改

- Object.freeze进行包装

~~~js
  <script>
       const obj = Object.freeze({
          a: 1
       })
       obj.a = 2;
       console.log(obj);
  </script>
~~~

- Object.defineProperty

  ~~~js
    <script>
          const obj = {}
          Object.defineProperty(obj, 'a', {
              value: 1
          })
          // writable属性默认为false，如果是true，那么就可以对属性a进行修改。
          console.log(obj);
          obj.a = 2;
          console.log(obj);
    </script>
  ~~~

- Object.create

~~~js
  <script>
        const obj = Object.create(null, {
            a: {
                value: 1,
            }
        })
         // writable属性默认为false，如果是true，那么就可以对属性a进行修改。
        console.log(obj);
        obj.a = 2
        console.log(obj);
  </script>
~~~

