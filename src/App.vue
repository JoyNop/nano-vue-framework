<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 15:20:30
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 16:19:03
 * @Description: file content
 * @FilePath: /blast-web/src/App.vue
-->
<template>
  <config-provider :locale="zh_CN">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </config-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data() {
    return {
      zh_CN
    }
  }
}
</script>

<style></style>
