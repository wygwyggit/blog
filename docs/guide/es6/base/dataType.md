## 基本数据类型（ES6）

- null: 针对于对象的**空指针**类型
- undefined: 针对于未初始化值，系统级的默认类型
- Boolean: 真假值类型
- Number: 整型或浮点型数字类型
- String: 针对字符系列化的一种类型（有序列表）
- BigInt: 任意精度的整型
- Symbol: 唯一不可变的值的包装类型



## 动态语言

- JS代码在运行之前没有编译过程
- JS引擎会在执行期根据赋值的情况，动态的分配存储空间的大小和地址
- JS变量在执行期可以赋值任意类型的数据

> 动态语言强制类型转换是针对于“值”
>
> 静态语言针对于当前变量可存储某一种数据类型所需要改变的空间

- JS代码运行过程（JS执行期）
  1. 语法检查期
  2. 变量收集期
  3. 代码解释执行期



## 字面量（直接量）

### 概念

字面量不需要特定的方法生成就能得到的值，自变量是**值**，不是变量。

数字字面量

~~~js
let number = 27;
~~~



布尔字面量

~~~js
let isBoy = true;
~~~



正则字面量

~~~js
let regx = /abc/;
~~~



字符串字面量

~~~js
let name = 'wyg';
~~~



数组字面量

~~~js
let likeArr = ['eat', 'sleep', 'study'];
~~~



对象字面量

~~~js
let personInfo = {
  name: 'wyg'
}
~~~



模板字面量

~~~js
let name = 'wyg';
let template = `this is ${name}`;
~~~



### 对象字面量在ES6中的特性

- 键与值相同，可以只写一个

  ~~~js
  let c = 3;
  let obj = {
    a: 1,
    b: 2,
    c
  }
  ~~~

  

- 键名变量化，数字化

  ~~~js
  let objKey = 'd';
  let obj = {
    a: 1,
    b: 2,
    ['property' + objKey]: 3
  }
  ~~~

  

- 可以通过` __proto__`  设置原型链

  ~~~js
  let obj = {
    __proto__: {
      toString() {
        retrun 'abc'
      }
    }
  }
  ~~~



## 模板字符串

### 格式化字符串

不使用模板字符串

~~~js
let str = 'this is wyg \n' + 'this is tony'
console.log(str);
~~~

使用模板字符串

~~~js
let str = `this is wyg
this is tony
`
console.log(str);
~~~

### 拼接字符串

- 模板字符串中插入变量

~~~js
let strName = 'test'
let str = `this is ${strName}`
~~~

- 变量进行计算

~~~js
let str = 'template'
let strName = 'wyg'

console.log(`this is ${str + ' ' + strName}`);
~~~

