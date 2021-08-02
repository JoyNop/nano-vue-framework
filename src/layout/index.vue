<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 17:53:15
 * @Description: file content
 * @FilePath: /blast-web/src/layout/index.vue
-->
<template>
  <a-layout class="layout">
    <div v-if="!hasMenu" class="hello">
      <logo :collapsed="collapsed" />
      <page-header v-model:collapsed="collapsed" />
    </div>
    <a-layout-sider
      v-else
      v-model:collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
      class="layout-sider"
    >
      <!--      网站logo start-->
      <logo :collapsed="collapsed" />
      <!--      网站logo end-->
      <div style="margin: 10px">
        <a-button shape="round" block @click="$router.push('/dashboard/create')">创建</a-button>
      </div>

      <!--      侧边菜单栏start-->
      <aside-menu :collapsed="collapsed" />

      <!-- <aside-tree :collapsed="collapsed" /> -->

      <!--      侧边菜单栏end-->
    </a-layout-sider>

    <a-layout>
      <!--      页头 start-->
      <page-header v-show="hasMenu" v-model:collapsed="collapsed" />
      <!--      页头end-->
      <!--      内容区域start-->
      <a-layout-content class="layout-content">
        <!-- 移除tab -->
        <!-- <a-card class="card" bodyStyle="padding:10px"> -->
        <router-view v-slot="{ Component }">
          <!-- <keep-alive> -->
          <component :is="Component" />
          <!-- </keep-alive> -->
        </router-view>
        <!-- </a-card> -->

        <!-- <tabs-view /> -->
      </a-layout-content>
      <!--      内容区域end-->
      <!--      页脚start-->
      <!-- <page-footer /> -->
      <!--      页脚end-->
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, h, computed, reactive, onMounted } from 'vue'
import { Layout, message } from 'ant-design-vue'
import Logo from './logo/index.vue'
import { TabsView } from './tabs'
import AsideMenu from './menu/menu.vue'
import AsideTree from './tree/tree.vue'
import PageHeader from './header/index.vue'
import PageFooter from './footer'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Layout',
  components: {
    TabsView,
    PageHeader,
    AsideMenu,
    AsideTree,
    Logo,
    PageFooter,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider
  },
  setup() {
    const collapsed = ref<boolean>(false)

    const state = reactive({
      hasMenu: true
    })
    const route = useRoute()
    const testMsg = () => {
      message.success(h('span', '啥子'), 2)
    }

    const asiderWidth = computed(() => (collapsed.value ? '80px' : '256px'))

    const hasMenu = computed(() => !route.path.includes('/dashboard/create'))

    // onMounted(() => {
    //   if (route.path.includes('/dashboard/create')) {
    //     state.hasMenu = false
    //   }
    // })

    console.log(hasMenu.value)

    return {
      collapsed,
      state,
      testMsg,
      hasMenu,
      asiderWidth
    }
  }
})
</script>

<style lang="scss" scoped>
.hello {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  background-color: #001529;
}

.ant-card-body {
  padding: 10px;
}

.layout {
  // display: flex;
  height: 100vh;
  overflow: hidden;

  .ant-layout {
    overflow: hidden;
  }

  .layout-content {
    /* flex: none; */
    overflow-y: auto;
  }

  .menu {
    height: 100vh;
    // margin-right: 5px;
    // box-shadow: 1px 1px 5px #cdc9c9;
  }

  .card {
    margin: 10px;
  }
}
</style>
