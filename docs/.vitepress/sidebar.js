export default {
    "/guide/": [
        {
            text: '开始阅读',
            collapsed: false,
            items: [
              { text: '阅读须知', link: '/guide/' },
            ]
        },
        {
            text: 'vue本尊',
            base: '/guide/',
            collapsed: false,
            items: [
                { 
                    text: '路由',
                    items: [
                        {
                            text: '基础认识',
                            link: '/vue/router/about',
                        },
                        {
                            text: '服务端渲染的路由',
                            link: '/vue/router/serverRander',
                        },
                        {
                            text: 'hash路由原理与实现',
                            link: '/vue/router/hash',
                        },
                        {
                            text: 'history路由原理与实现',
                            link: '/vue/router/history',
                        },
                    ]
                },
            ],
        }
    ]
}