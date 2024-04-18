## 多页面和单页面

多页面：对各个HTML进行请求与响应使得浏览器发生跳转，从而切换页面。

单页面：通过JS来控制某个HTML中应该显示什么内容，某个固定HTML中DOM的切换。

单页面路由：

- URL路由标识
- 控制单页面（HTML）中显示什么内容

URL怎么控制

- `hash` 模式：使用`#` 来对`URL` 进行截断，`#` 号后面的内容是浏览器识别的内容，`#` 前面的内容是向服务器请求的`URL` 

例如：我们浏览器输入的URL http://localhost:5173/ 和 浏览器输入的URL http://localhost:5173/#/abc 

向服务端请求的URL都是 http://localhost:5173/

![image-20240418222407621](https://static.woku.net/blog/image-20240418222407621.png)

- `history` 模式

## 什么是hash

`#` 在url中是锚点，有html的时候就存在。

~~~HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .nav {
            position: fixed;
            top:0;
            left: 0;
            z-index: 999;
        }
        p {
            padding: 20px;
            background-color: #f2f3f5;
        }
    </style>
</head>
<body>
    <div class="nav">
        <a href="#box1">box1</a>
        <a href="#box2">box2</a>
        <a href="#box3">box3</a>
    </div>
    <div id="box1">
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
        <p>我是box1</p>
    </div>
    <div id="box2">
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
        <p>我是box2</p>
    </div>
    <div id="box3">
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
        <p>我是box3</p>
    </div>
</body>
</html>
~~~

## 模拟hash模式路由

> `vue`中的`hash`  是/#/的形式，我们也使用这种。

访问 http://localhost:5173/#/home, 页面显示home相关的内容，访问 http://localhost:5173/#/list，页面显示list相关的内容

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
    </div>
    <script type="module" src="./index.js"></script>
</body>
</html>
~~~



1. 拿到url中的锚点

   通过 window.location.hash 获取锚点

   ~~~js
   function init() {
       handleRouter()
   }
   function handleRouter() {
       const app = document.getElementById('app')
       const hash = window.location.hash
   
       console.log(hash);
       // http://localhost:5173/#/home   #/home
       // 拿#后面的内容
       const hashRouter = hash.substring(1)
   }
   
   init()
   ~~~

   

2. 根据锚点，让JS控制`app`中具体显示什么DOM结构

~~~js
function init() {
    handleRouter()
}
function handleRouter() {
    const app = document.getElementById('app')
    const hash = window.location.hash
    const hashRouter = hash.substring(1)

    switch(hashRouter) {
        case '/home':
            app.innerHTML = `
             <p>home page</p>
             <button id="toListPage">ToListPage</button>
            `
            break;
        case '/list':
            app.innerHTML = `
             <p>list page</p>
             <button id="toHomePage">ToHomePage</button>
            `
            break;
        default:
            app.innerHTML = `
             <p>404</p>
            `
            break;
            
    }
}

init()
~~~



3. 当锚点发生变化的时候，重新让JS控制`app` 显示什么DOM结构

~~~js
function init() {
    window.addEventListener('hashchange', handleRouter, false)
    handleRouter()
    bindEvent()
}
function handleRouter() {
    const app = document.getElementById('app')
    const hash = window.location.hash
    const hashRouter = hash.substring(1)

    switch(hashRouter) {
        case '/home':
            app.innerHTML = `
             <p>home page</p>
             <button id="toListBtn">ToListPage</button>
            `
            bindEvent()
            break;
        case '/list':
             app.innerHTML = `
             <p>list page</p>
             <button id="toHomeBtn">ToHomePage</button>
            `
            bindEvent()
            break;
        default:
             app.innerHTML = `
             <p>404</p>
            `
            break;
            
    }
}

function bindEvent() {
    const toListBtn = document.getElementById("toListBtn")
    const toHomeBtn = document.getElementById('toHomeBtn')

    toListBtn && toListBtn.addEventListener("click", toListBtnHandle, false)
    toHomeBtn && toHomeBtn.addEventListener("click", toHomeBtnHandle, false)
}

function toListBtnHandle() {
    window.location.hash = "#/list"
}

function toHomeBtnHandle() {
    window.location.hash = "#/home"
}
init()
~~~

app.innerHTML中我们也可以使用函数的方式，这样就有点像vue中组件的形式了。

~~~
 import home from './components/home'
 // -----
 case '/home':
     app.innerHTML = home()
     bindEvent()
     break;
            
 // -----
~~~

~~~js
//  components/home文件内容
export default function home(props) {
    return `
    <p>home page</p>
    <p>{{ props.title }}<p>
    <button id="toListBtn">ToListPage</button>
    `
}
~~~

