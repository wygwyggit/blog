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
                        },  {
                            text: '数据类型与字面量',
                            link: '/es6/base/dataType',
                        },  {
                            text: '语句块和块级作用域',
                            link: '/es6/base/block',
                        },  {
                            text: '迭代协议',
                            link: '/es6/base/iterator',
                        }, {
                            text: 'for循环与let之间的特殊关系',
                            link: '/es6/base/eachLetAndVar',
                        }, {
                            text: '函数闭包和箭头函数',
                            link: '/es6/base/ArrowFun',
                        }, {
                            text: '参数空间和展开语法', 
                            link: '/es6/base/spread_syntax',
                        }, {
                            text: '解构赋值', 
                            link: '/es6/base/destructingAssignment',
                        }
                    ]
                },
            ],
        }
    ]
}