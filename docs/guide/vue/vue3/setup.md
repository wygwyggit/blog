## 执行时期
组合式API的**入口函数**

所有的组合式API都可以放到setup中执行

**组件被创建之前,自动执行. 在使用组合式API时，没有beforeCreate,created生命周期**

## 参数props
选项API中props选项的引用，就和vue2的props一样，接收父组件传的数据。

注意：如果对props进行解构，会丢失响应式。

如下代码：在父组件中更改了`count`的值，子组件的`myCount`不会更新。

解决方案：可以使用toRefs或者toRef将属性转化为响应式ref对象

父组件：

```vue
<template>
  <div class="home">
    <setup msg="this is msg" :count="count"></setup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import setup from '@/components/setup.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    setup,
  },
  setup () {
    const count = ref(0)
    onMounted(() => {
      setTimeout(() => {
        count.value++
      }, 1000)
    })
    return {
      count
    }
  }

})
</script>
```

子组件：

```vue
<template>
    <div>
        <h1>{{ msg }}</h1>
        <p>{{ count }}</p>
        <p>{{ myCount }}</p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef, toRefs } from 'vue'
export default defineComponent({
  name: 'setup-view',
  props: {
    msg: String,
    count: {
      type: Number,
      required: true
    }
  },
  setup (props, ctx) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { msg, count } = props
    // msg,和count丢失响应式
    console.log(msg, count)
    const myCount = computed(() => count * 2)

    // 使用toRefs将props所有属性转换成响应式ref对象
    // const { msg, count } = toRefs(props)
    // const myCount = computed(() => count.value * 2)

    // 使用toRef单独的将某一个属性进行转化
    const _count = toRef(props, 'count')
    const myCount = computed(() => _count.value * 2)
    return {
      myCount
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
```

## 参数ctx
ctx里面有：

+ attrs    相当于选项式API中的this.$attr  非prop的attributes
+ emit    相当于选项式API中的this.$emit
+ slots    相当于选项式API中的this.$slots
+ expose 暴漏属性给父组件

> 注意： attrs里面的属性是非响应式的，slots属性是非响应式的
>
> setup在组件创建之前执行，此时没有this，不能使用this
>

## return暴漏数据
子组件return一个对象

```vue
<template>
    <div>
        <p>{{ myCount }}</p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef, toRefs } from 'vue'
export default defineComponent({
  name: 'setup-view',
  setup (props, ctx) {
    const _count = toRef(props, 'count')
    const myCount = computed(() => _count.value * 2)
    console.log(ctx)
    return {
      myCount,
      test () {
        return 123
      }
    }
  }
})
</script>
```

父组件拿到子组件通过return暴漏的数据

```vue
<template>
  <div class="home">
    <setup ref="setupRef" :count="count"></setup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, onMounted } from 'vue'
import setup from '@/components/setup.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    setup
  },
  setup () {
    const count = ref(0)
    const setupRef = ref(null)
    onMounted(() => {
      // setupRef.value中有test方法
      console.log(setupRef.value)
    })
    return {
      count,
      setupRef
    }
  }
})
</script>
```

## ctx.expose暴漏数据
如果子组件return的不是一个对象，而是一个h函数，或者一个jsx，那么需要使用`ctx.expose`暴漏数据

子组件通过`ctx.expose`暴漏数据

```vue
<script lang="ts">
import { defineComponent, h } from 'vue'
export default defineComponent({
  name: 'setup-new',
  setup (props, ctx) {
    // 使用ctx.expose暴漏数据给父组件
    ctx.expose({
      sayHi () {
        return 'hi'
      }
    })
    // 返回一个函数，这个函数返回h函数的执行结果
    return () => {
      return h('div', null,
        [
          h('h2', null, ctx.slots.default && ctx.slots.default()),
          h('p', null, ctx.slots.content && ctx.slots.content()),
          h('p', null, ctx.slots.footer && ctx.slots.footer())
        ]
      )
    }
  }
})
</script>
```

父组件：

```vue
<template>
  <div class="home">
    <setup-new ref="setupnewRef">
      <template #default>this is title</template>
      <template #content>this is content</template>
      <template #footer>this is footer</template>
    </setup-new>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect, onMounted } from 'vue'
import setupNew from '@/components/setup-new.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    setupNew
  },
  setup () {
    const setupnewRef = ref(null)
    onMounted(() => {
      // setupnewRef.value中有sayHi方法
      console.log(setupnewRef.value)
    })
    return {
      setupnewRef
    }
  }

})
</script>
```

