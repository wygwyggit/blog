import { defineConfig } from 'vitepress'
import sidebar from './sidebar'
import socialLinks from './link'
import algolia from './algolia.js'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我酷前端小站",
  description: "这有关于前端、后端相关的文章和笔记内容，还有项目合集和生活分享。相信你可以在这里找到对你有用的知识和教程",
  lastUpdated: true,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    logo: './logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '💭 学习笔记', link: '/guide/', activeMatch: '/guide/' },
      {
        text: '🔥 专栏',
        items: [
          { text: '🔥 前端算法', link: '/algorithm/guide/' },
          { text: '🔥 源码专辑', link: '/code/guide/' },
          { text: '🔥 设计模式', link: '/patterns/guide/' },
          { text: '📋 面试大全', link: '/interview/' },
        ],
      },
      { text: '💻 工作', link: '/work', activeMatch: '/work/' },
    ],
    outlineTitle: '目录',
    outline: [2, 5],
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    sidebar,
    socialLinks,
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
