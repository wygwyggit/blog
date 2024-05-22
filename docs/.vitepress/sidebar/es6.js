export default function es6Docs() {
    return [
        {
            text: 'ES6',
            base: '/guide/',
            collapsed: false,
            items: [
                { 
                    text: '基础',
                    items: [
                        {
                            text: '变量声明与其底层的变量收集',
                            link: '/es6/base/variableCollection',
                        },  {
                            text: '错误类型，常量声明与封闭对象',
                            link: '/es6/base/constantCollection',
                        }
                    ]
                },
            ],
        }
    ]
}