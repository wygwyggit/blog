import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我酷前端小站",
  description: "分享前端与科技生活",
  base: "/book/",
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
