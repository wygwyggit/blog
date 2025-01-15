provide/inject让**同一棵组件树**中的数据能够**跨层级**传递

provide: 提供数据

inject: 注入数据

## provide-提供ref响应式数据
```vue
<script lang="ts">
import { defineComponent, reactive, ref, provide, readonly } from 'vue'
export default defineComponent({
  name: 'HomeView',
  setup() {
    const count = ref(0)
    provide('HomeViewCount', count)
  }
})
</script>
```

inject

```vue
<template>
    <div>
         我是孙组件 {{ count }}
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue'

export default defineComponent({
  name: 'son-page',
  setup () {
    const count = inject('HomeViewCount')
    console.log(count, 'inject count')
    // 修改了父组件提供的数据，这违背了数据单向流动的原则，
    count.value = 100
    return {
      count
    }
  }
})
</script>
```

## readonly禁止子组件修改父组件提供的数据
使用readonly，让子组件不能修改父组件提供的数据

```vue
<script lang="ts">
import { defineComponent, reactive, ref, provide, readonly } from 'vue'
export default defineComponent({
  name: 'HomeView',
  setup() {
    const count = ref(0)
    provide('HomeViewCount', readonly(count))
  }
})
</script>
```

## provide-提供reactive响应式数据
```vue
<script lang="ts">
import { defineComponent, reactive, ref, provide, readonly } from 'vue'
export default defineComponent({
  name: 'HomeView',
  setup() {
    const HomeViewInfo = reactive({
      title: 'provide和inject的使用',
      author: 'zhangsan',
      publishTime: '2023-01-01'
    })
    provide('HomeViewInfo', readonly(HomeViewInfo))
  }
})
</script>
```

```vue
<template>
    <div>
         <h2>
            {{ title }}
         </h2>
         <p>{{ author }}</p>
         <p>{{ publishTime }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue'

export default defineComponent({
  name: 'son-page',
  setup () {
    // 父组件数据变更时，子组件也会同时变更
    const info = inject('HomeViewInfo')
    return {
      ...toRefs(info)
    }
  }
})
</script>
```

## provide-提供方法
```vue
<script lang="ts">
import { defineComponent, reactive, ref, provide, readonly } from 'vue'
export default defineComponent({
  name: 'HomeView',
  setup() {
    const HomeViewInfo = reactive({
      title: 'provide和inject的使用',
      author: 'zhangsan',
      publishTime: '2023-01-01'
    })
    provide('HomeViewInfo', readonly(HomeViewInfo))
    const setHomeViewInfoTitle = (value: string) : void => {
      HomeViewInfo.title = value
    }
    provide('updateHomeViewInfoTitle', setHomeViewInfoTitle)
  }
})
</script>
```

```vue
<template>
    <div>
         <h2>
            {{ title }}
         </h2>
         <p>{{ author }}</p>
         <p>{{ publishTime }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue'

export default defineComponent({
  name: 'son-page',
  setup () {
    const info = inject('HomeViewInfo')
    const updateHomeViewInfoTitle = inject('updateHomeViewInfoTitle')
    updateHomeViewInfoTitle('我是新的标题')
    return {
      ...toRefs(info)
    }
  }
})
</script>
```

> 组件层级比较深的时候，provide和inject的使用，会导致，不知道数据是从哪里过来的。
>
> 要合理的使用provide和inject，不要滥用。
>
> 在provide命名的时候，可以加一个前缀，比如 HomeViewInfo，表示来自HomeView模块。
>

