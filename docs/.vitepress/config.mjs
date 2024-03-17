import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我酷前端小站",
  description: "分享前端与科技生活",
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
      options: {
        appId: 'P42XOBT16P',
        apiKey: '974c6866a475b10bd7fd33138fde4013',
        indexName: 'wygdocs'
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  
})
