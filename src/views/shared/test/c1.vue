<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-01 16:33:00
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-01 16:33:30
 * @Description: file content
 * @FilePath: /blast-browser/src/views/shared/test/c1.vue
-->

<template>
  <div>Mounted1</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('Mounted1')
    })

    return {}
  }
})
</script>

<style scoped></style>
