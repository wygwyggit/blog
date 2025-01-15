## 响应式
数据与视图之间的联动关系

数据在被更改的时候，开发者不用手动更新视图，框架底层通过viewmodel帮我们追踪一个数据的变化，然后自动更新视图

## vue2
定义对象属性的getter和setter，实现数据劫持

```javascript
const oldArrayPrototype = Array.prototype;
const newArrayPrototype = Object.create(oldArrayPrototype);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach((methodName) => {
    newArrayPrototype[methodName] = function() {
        oldArrayPrototype[methodName].call(this, ...arguments)
        updateView();
    }
})
function observe(target) {
  if (typeof target !== "object" || target == null) {
    return;
  }
  if (Array.isArray(target)) {
    target.__proto__ = newArrayPrototype
  }
  for (let key in target) {
    // 深度监听
    observe(target[key])
    defineReactive(target, key, target[key])
  }
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                value = newValue;
                console.log('数据更新了')
                observe(newValue)
                updateView()
            }
        }
    })
}

function updateView() {
    console.log('视图更新了')
}
const data = {
    name: 'woku',
    age: 28,
    info: {
        address: 'beijing'
    },
    number: [1,2,3]
}

observe(data)
data.number.push(4)
```

>      Object.defineProperty的缺点
>
>      深度监听，需要递归到底，一次性计算量大
>
>      无法监听新增属性和删除属性 (Vue.set, Vue.delete)
>
>      无法原生监听数组，需要特殊处理。
>

## vue3
使用ES6的proxy

```javascript
function reactive(data) {
    return new Proxy(data, {
        get(target, key) {
            const value = Reflect.get(target, key)
            return value != null && typeof value === 'object' ? reactive(value) : value;
        },
        set(target, key, value) {
            console.log(target, key, value)
            console.log("属性被修改了")
            // 为啥不直接用target[key] = value
            // 使用函数的方式更加符合语义化。
            return Reflect.set(target, key, value)
        }
    })
}

const $data = reactive({
    a: 1,
    b: 2,
    c: [1, 2, 3],
    d: {
        e: 4,
        f: 5
    }
})
console.log($data.a);
$data.b = 3

$data.c.push(4)
```

> proxy不用一次性递归到底，而是当访问到某一个属性时，如果值是一个对象类型，那么才再创建一个代理对象。
>
> 例如：当访问$data.d时候，会将{e: 4, f: 5}创建代理
>

