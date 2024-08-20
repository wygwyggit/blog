## 可迭代协议

The Iterable protocol

要成为一个可迭代的对象: 

1. 必须要实现@iterator方法
2. 对象的原型上必须有Symbol.iterator方法

## 什么是迭代？

版本迭代： 在一个时间周期内进行一次版本的升级

> 1.0  ->  2.0  遍历过程
>
> 1.0  ->  1.1  ->  1.2  迭代过程

迭代是遍历中的每一个过程

eg: 数组[1, 2, 3], 遍历这个数组，从1到2 是一次迭代。从2到3 是另一次迭代

在JS中符合可迭代协议的内置对象:  Array Map Set String TypeArray

1. 这些内置对象原型上都实现了Symbol.iterator
2. 这些内置对象可以使用for of 进行遍历

~~~js
        let arr = [1, 2, 3]
        console.log(arr);
        for (let v of arr) {
            console.log(v);
        }

        let m = new Map()
        m.set(1, '1')
        m.set(2, '2')
        console.log(m);
        for (let [k, v] of m) {
            console.log(k, v);
        }

        let str = new String('abc')
        console.log(str);
        for (let v of str) {
            console.log(v);
        }
~~~

{} 对象没有实现迭代器方法 - 对象是一个无序列表

简单实现一个迭代器接口，让for of 也能对 对象进行迭代

~~~js
        let obj = {}
        Object.prototype[Symbol.iterator] = function * () {
            yield 1;
            yield 2;
            yield 3;
        }
        for (let k of obj) {
            console.log(k)
        }
~~~



## 生成器迭代器

生成器函数：生成一个迭代器对象

迭代器对象：有一个next方法来控制迭代的次数的对象

~~~js
         function * generator(arr) {
            for (let v of arr) {
                // yield：每次调用next的时候，停下来，产出一个
                yield v;
            }
         }

         const iterator = generator([1, 2, 3])
         let res = iterator.next()
         res = iterator.next()
         res = iterator.next()
         res = iterator.next()
         console.log(res);
~~~

对于对象，我们可以自己实现@iterator方法，使得对象也能通过for of进行迭代

~~~js
         Object.prototype[Symbol.iterator] = function() {
            let _this = this;
            let keys = Object.keys(_this);
            let step = 0;
            return {
                next() {
                    if (step < keys.length) {
                        const key = keys[step++]
                        const value = _this[key]
                        return {
                            done: false,
                            value: {
                                [key]: value
                            }
                        }
                    }
                    return {
                        done: true,
                        value: undefined
                    }
                }
            }
         }
         let obj = {
            a: 1,
            b: 2,
            c: 3
         }
         for (let o of obj) {
            console.log(o);
         }
~~~

## 异步迭代器

Symbol.asyncIterator

> 现阶段没有任何内置对象实现了异步迭代协议。

~~~js
         Array.prototype[Symbol.asyncIterator] = async function * () {
            const _this = this
            for (let v of _this) {
                yield v
            }
         }
         
         let arr2 = [
            new Promise((resolve) => resolve(1)),
            new Promise((resolve) => resolve(2)),
            new Promise((resolve) => resolve(3)),
         ]
         console.log(arr2);

         for (let v of arr2) {
            console.log(v);
         }
         // Promise {<fulfilled>: 1}
         // Promise {<fulfilled>: 2}
         // Promise {<fulfilled>: 3}
~~~

直接拿到resolve的值：

~~~js

        ;(async function() {
            for await (let v of arr2) {
               console.log(v);
            }
        })()
        // 打印  1,2,3
~~~

