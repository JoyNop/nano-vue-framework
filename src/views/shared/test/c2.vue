<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-01 16:33:37
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-01 16:33:43
 * @Description: file content
 * @FilePath: /blast-browser/src/views/shared/test/c2.vue
-->
<template>
  <div>Mounted2</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('Mounted2')
    })

    return {}
  }
})
</script>

<style scoped></style>
