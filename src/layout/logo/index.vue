<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 09:53:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 09:45:41
 * @Description: file content
 * @FilePath: /vue3-ts/src/layout/logo/index.vue
-->
<template>
  <div class="logo">
    <img src="~@/assets/logo.png" alt="" />
    <h2 v-show="!collapsed" class="title">JoyNop</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Index',
  props: {
    collapsed: {
      type: Boolean
    }
  }
})
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    color: white;
    margin-bottom: 0;
  }
}
</style>
