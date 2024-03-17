import { defineConfig } from 'vitepress'
import algolia from './algolia.js'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我酷前端小站",
  description: "这有关于前端、后端相关的文章和笔记内容，还有项目合集和生活分享。相信你可以在这里找到对你有用的知识和教程",
  lastUpdated: true,
  head: [
    [
      'link',
      { rel: 'icon', href: 'https://static.woku.net/blog/logo/favicon.ico' }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '工作', link: '/work', activeMatch: '/work/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      "/work/":
      {
        base: '/work/',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    },
    search: {
      provider: 'algolia',
      options: algolia
    },
    footer: {
      message: `MIT版权，未经许可禁止任何形式的转载`,
      copyright: `版权所有 © 2023-${new Date().getFullYear()} <a target="_blank" href="https://github.com/wygwyggit/blog">wokuBlog</a> | 备案号 <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">湘ICP备17003302号-4</a>`,
    },
  },
  
})
