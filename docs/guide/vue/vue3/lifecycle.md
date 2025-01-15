vue2生命周期执行顺序回顾

![](../../images/lifecycle.png)

| vue2 | vue3-Options API | vue3-Composition API |
| --- | --- | --- |
| beforeCreate | beforeCreate | setup |
| created | created | |
| beforeMount | beforeMount | onBeforeMount |
| mounted | mounted | onMounted |
| beforeUpdate | beforeUpdate | onBeforeUpdate |
| updated | updated | onUpdated |
| beforeDestroy | <font style="color:#ECAA04;">beforeUnmount</font> | onBeforeUnmount |
| destroyed | <font style="color:#ECAA04;">unmounted</font> | onUnmounted |
| <font style="color:rgb(33, 53, 71);">activated</font> | <font style="color:rgb(33, 53, 71);">activated</font> | onActivated |
| <font style="color:rgb(33, 53, 71);">deactivated</font> | <font style="color:rgb(33, 53, 71);">deactivated</font> | onDeactivated |
| <font style="color:rgb(33, 53, 71);">errorCaptured</font> | <font style="color:rgb(33, 53, 71);">errorCaptured</font> | onErrorCaptured |
| <font style="color:rgb(33, 53, 71);">renderTracked  </font><font style="color:#FFFFFF;background-color:#ECAA04;">Dev only</font> | <font style="color:rgb(33, 53, 71);">renderTracked</font> | onRenderTracked |
| <font style="color:rgb(33, 53, 71);">renderTriggered </font><font style="color:#FFFFFF;background-color:#ECAA04;">Dev only</font> | <font style="color:rgb(33, 53, 71);">renderTriggered</font> | onRenderTriggered |


