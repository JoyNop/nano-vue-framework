<template>
  <!-- <a-menu
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    mode="inline"
    :inline-collapsed="collapsed"
    class="menu1"
    @click="clickMenuItem"
  >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item" />
    </template>
  </a-menu> -->

  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="light"
    class="menu1"
    :inline-collapsed="collapsed"
  >
    <template v-for="(item, index) in menus" :key="index">
      <a-menu-item
        v-if="item.path.startsWith('/dashboard/')"
        :key="item.path"
        @click="clickMenuItem(item.path, item.id, item.pid, item.step)"
      >
        <template #icon>
          <FileTextOutlined />
        </template>
        <span>{{ item.meta.title }}</span>
      </a-menu-item>

      <a-sub-menu v-else-if="item.path.startsWith('/pid/')" :key="item.path">
        <template #icon>
          <FolderOutlined />
        </template>
        <template #title>{{ item.meta.title }}</template>
        <a-menu-item
          v-for="(childItem, childIndex) in item.children"
          :key="childItem.path"
          @click="clickMenuItem(childItem.path, childItem.id, childItem.pid, childItem.step)"
        >
          {{ childItem.meta.title }}
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, toRefs } from 'vue'
import { FolderOutlined, FileTextOutlined } from '@ant-design/icons-vue'
import { Menu, message } from 'ant-design-vue'
import MenuItem from './menu-item.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { routes } from '@/router'
import { planUrlMatch } from '@/router/generator-routers'

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem,
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item,
    FileTextOutlined,
    FolderOutlined
  },
  props: {
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean
    }
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()
    const store = useStore()

    // 获取当前打开的子菜单
    const getOpenKeys = () => [`/pid/${currentRoute.params.pid}`]

    const state = reactive({
      openKeys: getOpenKeys(),
      selectedKeys: [currentRoute.fullPath]
    })

    const menus = computed(
      () =>
        store.getters['asyncRoute/menus'] ?? routes.find((item) => item.name == 'Layout')!.children
    )

    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys()
        state.selectedKeys = [currentRoute.fullPath]
      }
    )

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => {
        return currentRoute.fullPath
      },
      () => {
        if (currentRoute.name == 'login' || props.collapsed) return
        state.openKeys = getOpenKeys()
        state.selectedKeys = [currentRoute.fullPath]
      }
    )

    // 点击菜单
    const clickMenuItem = (url: any, id?: any, pid?: any, step?: any) => {
      if (/http(s)?:/.test(url)) {
        window.open(url)
      } else {
        if (step === 3) {
          router.push({
            name: url,
            params: {
              pid: pid,
              planId: id
            }
          })
        } else {
          router.push(url)
        }
      }
    }

    return {
      ...toRefs(state),
      menus,
      clickMenuItem
    }
  }
})
</script>

<style>
.ant-layout-sider-children {
  box-shadow: 1px 1px 5px #cdc9c9;
}

.menu1 {
  height: calc(100vh - 130px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
