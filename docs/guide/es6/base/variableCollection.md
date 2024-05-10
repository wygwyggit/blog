## 变量收集

~~~js
 <script>
        debugger
        var a = 1;
        debugger
        let b = 2;
        {
            debugger
            let c = 3;
            debugger
            console.log(c);
        }
        console.log(a, b);
</script>
~~~

在预编译阶段进行的变量收集

- Global  全局作用域

  ~~~
  Global {
    a: undefined
  }
  ~~~

- Script   脚本作用域，整个脚本都是一个脚本代码块

  ~~~
  Script {
    b: ? <value unavailable>
  }
  ~~~

  ![image-20240510211729115](https://static.woku.net/blog/image-20240510211729115.png)

在代码执行期进行的变量收集

- Block 块级作用域

  ~~~
  Block {
    c: ? <value unavailable>
  }
  ~~~

  >![image-20240510212026408](https://static.woku.net/blog/image-20240510212026408.png)
  >
  >在手动创建的块级作用域在执行期进行变量收集
  >
  >手动创建的块作用域（代码块），属于脚本作用域

## 暂时性死区

在上面代码的块级作用域中，声明变量前访问`c` 

~~~
{
    console.log(c);
    let c = 3;      
}
~~~

<span style="color: red">Uncaught ReferenceError: Cannot access 'c' before initialization</span> 

未捕获的引用错误，在变量c初始化之前不能访问变量c (value unavailable)

变量在`value unavailable`状态的阶段，就叫暂时性死区 （Temporary dead zone）TDZ

总结：let和const在声明变量之前不能访问这个变量的区域就叫暂时性死区。

## var 与 let 声明的区别（重点）

- 挂载

> var声明的变量在全局作用域（global），挂载在window对象上，可以通过window对象访问变量
>
> let声明的变量在块级作用域（script/block)，不挂载在window对象上。



- 预编译变量收集中（会不会初始化）

>var声明变量会初始化undefined
>
>let声明
>在脚本代码块（script)中，声明语句之前，不会进行初始化，处于值不可用状态
>在手动创建的代码块（block）中，变量收集在执行期中进行



- 变量提升现象 （在声明前能不能访问）

> var声明，由于预编译阶段进行了初始化，所以可以在声明语句之前访问变量
>
> let声明，由于在变量收集时不会进行变量初始化，处于值不可用状态，所以不可以在声明语句之前访问变量，暂时性死区为了解决变量异常访问的问题。



- 重复声明同一个标识符变量

>var声明，ES5不做限制，只是替换值
>
>let声明：语法检查不通过，不允许重复声明同一个标识符变量。







