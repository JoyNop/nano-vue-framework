<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-22 15:04:33
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-22 16:12:14
 * @Description: file content
 * @FilePath: /blast-browser/src/layout/tree/tree.vue
-->
<template>
  <div>
    <a-directory-tree
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      :load-data="onLoadData"
    >
      <a-tree-node
        v-for="(tree, index) in treeList"
        :key="index"
        :title="tree.title"
        :is-leaf="tree.type === 'plan'"
      />

      <a-tree-node key="0-1" title="parent 1">
        <a-tree-node key="0-1-0" title="leaf 1-0" is-leaf />
        <a-tree-node key="0-1-1" title="leaf 1-1" is-leaf />
      </a-tree-node>
    </a-directory-tree>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, toRefs, ref, onMounted } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'
import { Tree } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { routes } from '@/router'
import { planMenus } from '@/api/system/menu'

interface State {
  treeList: any[]
  openKeys: any
  selectedKeys: any
}
export default defineComponent({
  name: 'Tree',
  components: {
    'a-directory-tree': Tree.DirectoryTree,
    Tree,
    'a-tree-node': Tree.TreeNode,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined
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

    const expandedKeys = ref<string[]>(['0-0', '0-1'])
    const selectedKeys = ref<string[]>([])

    console.log(currentRoute.matched)

    // 获取当前打开的子菜单
    const getOpenKeys = () => [currentRoute.matched[1]?.name]

    const state: State = reactive({
      treeList: [],
      openKeys: getOpenKeys(),
      selectedKeys: [currentRoute.name]
    })
    const onLoadData = (treeNode: any) => {
      console.log(333333, treeNode)

      // return new Promise((resolve: (value?: unknown) => void) => {
      //   if (treeNode.dataRef.children) {
      //     resolve();
      //     return;
      //   }
      //   setTimeout(() => {
      //     treeNode.dataRef.children = [
      //       { title: 'Child Node', key: `${treeNode.eventKey}-0` },
      //       { title: 'Child Node', key: `${treeNode.eventKey}-1` },
      //     ];
      //     treeData.value = [...treeData.value];
      //     resolve();
      //   }, 1000);
      // });
    }
    onMounted(async () => {
      const res = await planMenus(0)

      const { directorys, plans } = res

      const treeList: any[] = []
      for (const dir of directorys) {
        const tree = { title: dir.name, key: dir.id, state: dir.state, pid: dir.pid, type: 'dir' }
        treeList.push(tree)
      }

      for (const plan of plans) {
        const tree = { title: plan.name, key: plan.id, step: plan.step, type: 'plan' }
        treeList.push(tree)
      }

      state.treeList = treeList
    })

    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys()
        state.selectedKeys = [currentRoute.name]
      }
    )

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name == 'login' || props.collapsed) return
        state.openKeys = getOpenKeys()
        state.selectedKeys = [currentRoute.name]
      }
    )

    // 点击菜单
    const clickMenuItem = ({ item, key, keyPath }) => {
      if (/http(s)?:/.test(key)) {
        window.open(key)
      } else {
        router.push({ name: key })
      }
    }

    return {
      ...toRefs(state),
      expandedKeys,
      selectedKeys,
      clickMenuItem,
      onLoadData
    }
  }
})
</script>
