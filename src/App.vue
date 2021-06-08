<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 15:06:47
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-07 15:21:25
 * @Description: file content
 * @FilePath: /vue3-ts/src/App.vue
-->
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
