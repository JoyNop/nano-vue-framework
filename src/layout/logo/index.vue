<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-15 11:59:46
 * @Description: file content
 * @FilePath: /blast-browser/src/layout/logo/index.vue
-->
<template>
  <router-link to="/">
    <div class="logo">
      <img src="~@/assets/images/logo.png" alt="" />
      <h2 v-show="!collapsed" class="title">{{ title }}</h2>
    </div></router-link
  >
</template>

<script>
export default {
  name: 'Logo',
  props: {
    collapsed: {
      type: Boolean
    }
  },
  data() {
    return {
      title: ''
    }
  },
  mounted() {
    this.title = process.env.VUE_APP_HEADER_TITLE
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  white-space: nowrap;
  align-items: center;
  background-color: #001529;
  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    margin-bottom: 0;
    color: white;
  }
}
</style>
