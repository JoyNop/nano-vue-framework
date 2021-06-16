<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 09:53:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-08 17:31:34
 * @Description: file content
 * @FilePath: /vue3-ts/src/layout/menu/menu-item.vue
-->
<template>
  <template v-if="!menuInfo.meta.hidden">
    <a-sub-menu v-if="menuInfo.children?.length" :key="menuInfo.name" v-bind="$attrs">
      <template #title>
        <span>
          <icon-font style="color: aliceblue" :type="menuInfo.meta.icon" />
          <span>{{ menuInfo.meta.title }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <icon-font style="color: aliceblue" :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <menu-item :key="item.name" :menu-info="item" />
        </template>
      </template>
    </a-sub-menu>
    <a-menu-item v-else :key="menuInfo.name">
      <icon-font style="color: aliceblue" :type="menuInfo.meta.icon" />
      <span>{{ menuInfo.meta.title }}</span>
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Menu } from 'ant-design-vue'
// import { IconFont } from '@/components/iconfont'

export default defineComponent({
  name: 'MenuItem',
  components: {
    // IconFont,
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>

<style scoped></style>
