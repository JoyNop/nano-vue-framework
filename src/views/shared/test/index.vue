<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-01 16:31:52
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-01 16:46:36
 * @Description: file content
 * @FilePath: /blast-browser/src/views/shared/test/index.vue
-->
<template>
  <a-tabs v-model:activeKey="activeKey" :animated="false">
    <a-tab-pane key="1" tab="Tab 1" :forceRender="true">Content of Tab Pane 1<C1 /></a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" :forceRender="true">Content of Tab Pane 2<C2 /></a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3" :forceRender="true">Content of Tab Pane 3 </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import { computed, createVNode, defineComponent, ref } from 'vue'

import C1 from './c1.vue'
import C2 from './c2.vue'

export default defineComponent({
  components: { C1, C2 },
  setup() {
    return {
      activeKey: ref('1')
    }
  }
})
</script>
