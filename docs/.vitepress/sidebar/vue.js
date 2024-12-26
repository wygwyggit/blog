export default function vueDocs() {
    return [
      {
        text: "vue本尊",
        base: "/guide/",
        collapsed: false,
        items: [
          {
            text: "路由",
            items: [
              {
                text: "基础认识",
                link: "/vue/router/about",
              },
              {
                text: "服务端渲染的路由",
                link: "/vue/router/serverRander",
              },
              {
                text: "hash路由原理与实现",
                link: "/vue/router/hash",
              },
              {
                text: "history路由原理与实现",
                link: "/vue/router/history",
              },
            ],
          },
          {
            text: "vue3",
            items: [
              {
                text: "组合式API-setup函数",
                link: "/vue/vue3/setup",
              },
            ],
          },
        ],
      },
    ];
}