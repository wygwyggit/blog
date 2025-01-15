## Options API - 设置全局属性
+ vue2中，根实例使用new Vue来创建，Vue是一个构造函数，全局属性可以放到Vue.prototype上
+ vue3 中的vue不是一个构造函数，需要使用 app.config.globalProperties.$xxx = xxx 来设置全局属性
+ vue2中Vue.prototype， vue3中app.config.globalProperties

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.config.globalProperties.$http = function () {
  console.log('http')
}
app.config.globalProperties.$userInfo = {
  name: 'woku',
  age: 28,
  sex: '男'
}
app.use(store).use(router).mount('#app')
```

```vue
<template>
  <div class="about">
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  mounted () {
    this.$http()
    console.log(this.$userInfo)
  },
  // 如果要在setup中访问使用app.config.globalProperties设置的全局属性
  // 获取当前实例
  // instance.appContext.config.globalProperties 有全局属性
  // 实际上，不用在setup中获取，app.config.globalProperties是为Options API提供的。
  setup () {
    const instance = getCurrentInstance()
    console.log(instance, 'instance')
  }
})
</script>
```

> 注意：
>
> vue3 != Composition API
>
> vue3是在vue2 Options API的基础上，增加了Composition API
>
> 如果使用Options API，在vue3中使用app.config.globalProperties设置全局属性，在组件中，使用this.xxx来获取
>

## Composition API - 设置全局属性
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalPropertys } from './data/index'
console.log(globalPropertys)

const app = createApp(App)
app.use(globalPropertys)
app.use(store).use(router).mount('#app')
```

```typescript
import globalPropertys from './globalPropertys'

export {
  globalPropertys
}
```

```typescript
export default {
  install (app) {
    app.provide('$http', function () {
      console.log('http')
    })
    app.provide('$userInfo', {
      name: 'woku',
      age: 28,
      sex: 'male'
    })
  }
}
```

```vue
<template>
  <div class="about">
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, inject } from 'vue'
export default defineComponent({
  mounted () {
    // this.$http()
    // console.log(this.$userInfo)
  },
  setup () {
    // const instance = getCurrentInstance()
    // console.log(instance, 'instance')
    const userInfo = inject('$userInfo')
    console.log(userInfo, 'userInfo')
  }
})
</script>
```

