<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-15 10:51:42
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-28 17:45:02
 * @Description: file content
 * @FilePath: /blast-browser/src/views/dashboard/create/index.vue
-->

<template>
  <div class="create-container">
    <Title :level="4">创建</Title>
    <Divider />

    <div class="create-card-container">
      <Collapse v-model:activeKey="activeKey" :bordered="false" style="background-color: white">
        <template #expandIcon="{ isActive }">
          <caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel key="1" header="新创建" :style="customStyle">
          <div id="create-toolbar">
            <router-link to="/dashboard/create/folder">
              <CreateCard createType="Folder" />
            </router-link>
            <router-link to="/dashboard/create/scheme/1">
              <CreateCard createType="newScheme" />
            </router-link>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="根目录方案" :style="customStyle">
          <div id="created-scheme">
            <CreateCard
              v-for="(plan, key) in plans0"
              :key="key"
              :planName="plan.name"
              :planId="plan.id"
              createType="oldScheme"
            />
          </div>
        </a-collapse-panel>

        <a-collapse-panel
          v-for="(dir, index) in directorys"
          :key="dir + index"
          :header="dir.name"
          :style="customStyle"
        >
          <div id="created-scheme">
            <CreateCard
              v-for="(plan, key) in dir.children.plans"
              :key="plan.id"
              :planName="plan.name"
              :planId="plan.id"
              createType="oldScheme"
            />
          </div>
        </a-collapse-panel>

        <a-collapse-panel key="3" header="方案库" :style="customStyle">
          <div id="scheme-lib">
            <CreateCard createType="schemeLib" /> <CreateCard createType="schemeLib" />
            <CreateCard createType="schemeLib" />
            <CreateCard createType="schemeLib" />
            <CreateCard createType="schemeLib" />
            <CreateCard createType="schemeLib" />
            <CreateCard createType="schemeLib" />
            <CreateCard createType="schemeLib" />
          </div>
        </a-collapse-panel>
      </Collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, toRaw, UnwrapRef, defineComponent, ref, onMounted } from 'vue'
import { EyeOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
import { Typography, Divider, Row, Col, Card, Image, List, Collapse } from 'ant-design-vue'
import CreateCard from './CreateCard.vue'
import { Moment } from 'moment'
import { planMenus } from '@/api/system/menu'
// @ts-ignore
interface FormState {
  schemeName: string
  tunnelName: string
  region: string | undefined
  date1: Moment | undefined
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}
interface State {
  count: number
  directorys: any[]
  plans0: any[]
}

export default defineComponent({
  components: {
    CaretRightOutlined,
    CreateCard,
    Title: Typography.Title,
    Divider,
    EyeOutlined,
    Row,
    Col,
    Card,
    Image,
    List,
    'a-list-item': List.Item,
    'a-list-meta': List.Item.Meta,
    Collapse,
    'a-collapse-panel': Collapse.Panel
  },
  setup() {
    const state: State = reactive({
      count: 0,
      directorys: [],
      plans0: []
    })

    const visible = ref<boolean>(false)

    const data: any[] = [
      {
        title: 'Ant Design Title 1'
      },
      {
        title: 'Ant Design Title 2'
      },
      {
        title: 'Ant Design Title 3'
      },
      {
        title: 'Ant Design Title 4'
      }
    ]

    const handleOk = (e: MouseEvent) => {
      visible.value = false
    }

    const formState: UnwrapRef<FormState> = reactive({
      schemeName: '',
      tunnelName: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })
    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }

    const openKWtemplateModal = () => {
      visible.value = true
    }

    onMounted(async () => {
      const res = await planMenus(0)
      state.directorys = res.directorys
      state.plans0 = res.plans
    })

    const activeKey = ref(['1'])
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
    const customStyle =
      'background: white;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'

    return {
      ...toRefs(state),
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      openKWtemplateModal,
      data,
      handleOk,
      visible,
      activeKey,
      text,
      customStyle
    }
  }
})
</script>

<style lang="less" scoped>
.create-container {
  height: calc(100vh - 150px);
  padding: 15px;
}

.create-card-container {
  max-height: 600px;
  overflow: auto;
}

#created-scheme {
  display: flex;
  flex-wrap: wrap;
}
#scheme-lib {
  display: flex;
  flex-wrap: wrap;
}

#create-toolbar {
  display: flex;
  flex-wrap: wrap;
}
</style>
