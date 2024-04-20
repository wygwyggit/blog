使用`express` 框架来启动我们的本地服务

~~~js
const express = require('express')
const { resolve } = require('path')
const app = express()

// 指定public是我们的静态文件夹目录
app.use(express.static(resolve(__dirname, 'public')))


app.listen(8081, () => {
    console.log('server is runing at 8081');
})
~~~



使用`history` 路由模式，也是将页面的某个固定HTML的内容进行替换从而达到页面切换的效果。

那么无论请求的地址是 http://localhost:8081/home 还是 http://localhost:8081/list  都需要返回一个带有固定HTML内容的页面，也就是`index.html` , 在这个页面中，将ID为app的元素里面的内容进行替换。

在`public`目录下存在如下文件：

![image-20240420211937822](https://static.woku.net/blog/image-20240420211937822.png)

Index.html内容如下：

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="http://localhost:8081/app.js"></script>
</body>
</html>
~~~

当访问 http://localhost:8081/ 时，可以响应`index.html` ，但当访问 http://localhost:8081/home 或者 http://localhost:8081/list 时，都是404状态。原因就是因为，后端程序中，并没有配置 /home 或 /list的路由。

无论请求什么地址，都要响应`index.html` 资源。

~~~js
const express = require('express')
const { resolve } = require('path')
const app = express()

// 指定public是我们的静态文件夹目录
app.use(express.static(resolve(__dirname, 'public')))

// 无论请求什么地址，都要响应`index.html` 资源。
app.use((req,res) => {
    res.sendFile(resolve(__dirname, './public/index.html'))
})

app.listen(8081, () => {
    console.log('server is runing at 8081');
})
~~~

## History接口

### 属性

[`state`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/state) 只读

返回一个表示历史堆栈顶部的状态的任意（`any`）值。这是一种不必等待 [`popstate`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event) 事件而查看状态的方式。

> 简单说，state 就是 拿到当前页面的路由
>
> 拿到当前页面的路由，你就能知道app中要放什么东西了。
>
> 本质 和hash模式一样，只是标准不一样了，history没有#号

### 方法

[`pushState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)

按指定的名称和 URL（如果提供该参数）将数据 push 进会话历史栈，数据被 DOM 进行不透明处理；你可以指定任何可以被序列化的 javascript 对象。请注意，除了 Safari 所有浏览器现在都忽略了 title 参数。更多的信息，请看[使用 History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)。

> 将路由信息推到会话历史栈这个容器中。
>
> 页面的表现，就是url变化了。

详细资料可参考：[MDN History接口](https://developer.mozilla.org/zh-CN/docs/Web/API/History)

~~~js
function init() {
    handleRouter()
}
function handleRouter() {
    const app = document.getElementById('app')
    // state 拿到当前页面的路由
    const { state } = window.history
    console.log(state);
    switch(state) {
        case '':
        case '/':
        case 'home':
        case null:
            app.innerHTML = `
            <p>home page</p>
            <button id="toListBtn">ToListPage</button>
            `
            bindEvent()
           break;
        case 'list':
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
    window.history.pushState('list', '', '/list')
    handleRouter()
}

function toHomeBtnHandle() {
    window.history.pushState('home', '', '/home')
    handleRouter()
}

init()
~~~

页面效果：

![image-20240420215700725](https://static.woku.net/blog/image-20240420215700725.png)

![image-20240420215717349](https://static.woku.net/blog/image-20240420215717349.png)