## 服务端渲染的路由-返回数据

- `express` 框架编写服务端程序

- 定义接口地址，返回json数据。

  ~~~js
  const express = require('express')
  
  const app = express()
  
  app.get('/data', (req, res) => {
      res.json({
          company: '天威诚信',
          job: '前端开发'
      })
  })
  
  app.listen(8080, () => {
      console.log('server is runing at 8081');
  })
  ~~~

  > 服务的端口为8081。
  >
  > 访问http://localhost:8081/data 

  ![image-20240412214330186](https://static.woku.net/blog/image-20240412214330186.png)



服务端渲染的路由-返回页面

服务端文件目录结构如下：

![image-20240412220234402](https://static.woku.net/blog/image-20240412220234402.png)

需求：当访问http://localhost:8081时候，服务端响应`index.html` 

​            当访问http://localhost:8081/list 时候，服务端响应`list.html` 

~~~js
const express = require('express')
const { resolve } = require('path')
const app = express()

// 访问'/'路由，返回index.html
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, './public/index.html'))
})

// 访问'/list'路由，返回list.html
app.get('/list', (req, res) => {
    res.sendFile(resolve(__dirname, './public/list.html'))
})

app.listen(8081, () => {
    console.log('server is runing at 8081');
})
~~~

当然，我们也可以在服务端指定静态资源文件夹，通过http://localhost:8081/index.html 去直接访问`index.html`  

 通过http://localhost:8081/list.html 去直接访问`list.html` 。

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



> 为啥要通过服务端服务的接口来响应页面，而不直接通过地址访问页面。
>
> 通过路由方式，具有可控性。某些文件不能直接访问，比如文件是一个模板，那么我们要通过某一个服务，将这个模板文件读取出来，替换模板字符串，然后响应。

## 多页面路由

多个HTML文件进行切换。

一定存在着HTML资源的请求与响应。



存在的问题：

每次都需要重新进行一次HTML文件的加载，加载后进行解析，重新形成DOM结构，进行DOM结构的渲染。（页面刷新，加载）

影响用户体验。