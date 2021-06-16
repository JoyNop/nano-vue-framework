<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 09:53:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 10:59:16
 * @Description: file content
 * @FilePath: /vue3-ts/src/views/shared/redirect/index.vue
-->
<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Empty } from 'ant-design-vue'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    debugger
    console.log('dsfasd')
    onBeforeMount(() => {
      const { params, query } = route

      const { path } = params
      router.replace({
        path: '/' + (Array.isArray(path) ? path.join('/') : path),
        query
      })
    })
    return () => <Empty />
  }
})
</script>
