import { sidebarVueDocs, sidebarEs6, sidebarTs } from './sidebar/index'
export default {
    "/guide/": [
        {
            text: '开始阅读',
            collapsed: false,
            items: [
              { text: '阅读须知', link: '/guide/' },
            ]
        },
        ...sidebarVueDocs(),
        ...sidebarEs6(),
        ...sidebarTs(),
       
    ]
}