<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-08-02 15:20:30
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 18:35:11
 * @Description: file content
 * @FilePath: /blast-web/src/App.vue
-->
<!-- <template>
  <config-provider :locale="zh_CN">
    <div>
      sadfasf
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </config-provider>
</template>

<script>


export default {
  data() {
    return {
      zh_CN
    }
  }
}
</script>

<style></style> -->

<template>
  <config-provider :locale="zh_CN">
    <a-layout v-if="hasLayout" class="layout">
      <a-layout-header class="header">
        <div class="logo" @click="$router.push('/')">dd</div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider v-if="hasLeft" width="200" style="background: #fff">
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <user-outlined />
                  subnav 1
                </span>
              </template>
              <a-menu-item key="1" @click="$router.push('/dashboard')">option1</a-menu-item>
              <a-menu-item key="2">option2</a-menu-item>
              <a-menu-item key="3">option3</a-menu-item>
              <a-menu-item key="4">option4</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <laptop-outlined />
                  subnav 2
                </span>
              </template>
              <a-menu-item key="5">option5</a-menu-item>
              <a-menu-item key="6">option6</a-menu-item>
              <a-menu-item key="7">option7</a-menu-item>
              <a-menu-item key="8">option8</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <notification-outlined />
                  subnav 3
                </span>
              </template>
              <a-menu-item key="9">option9</a-menu-item>
              <a-menu-item key="10">option10</a-menu-item>
              <a-menu-item key="11">option11</a-menu-item>
              <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 24px 24px 24px">
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>

    <router-view v-else v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </config-provider>
</template>
<script lang="ts">
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined
  },
  setup() {
    const currentRoute = useRoute()
    console.log('currentRoute', currentRoute)
    // 跟随页面路由变化，切换菜单选中状态

    // watch(
    //   () => {
    //     return currentRoute.fullPath
    //   },
    //   (a, b, c) => {
    //     console.log(currentRoute.meta)
    //   }
    // )

    const hasLeft = computed(() => currentRoute.meta.left)
    const hasTop = computed(() => currentRoute.meta.top)
    const hasLayout = computed(() => currentRoute.meta.layout)

    return {
      selectedKeys1: ref<string[]>(['2']),
      selectedKeys2: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(['sub1']),
      zh_CN,
      hasLeft,
      hasTop,
      hasLayout
    }
  }
})
</script>
<style lang="less" scoped>
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
}

#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
