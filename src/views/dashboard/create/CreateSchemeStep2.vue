<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-20 15:49:36
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 10:21:49
 * @Description: file content
 * @FilePath: /blast-browser/src/views/dashboard/create/CreateSchemeStep2.vue
-->

<template>
  <div class="create-container">
    <PageHeader class="demo-page-header" title="数据管理" sub-title="在此处处理数据">
      <template #extra>
        <a-button
          v-show="outLineStep === 2"
          key="1"
          type="primary"
          @click="$router.push(`/dashboard/create/scheme/3?pid=${defaultPid}&planId=${defaultId}`)"
          >下一步</a-button
        >
      </template>
    </PageHeader>

    <div v-show="outLineStep === 1" class="outline-container">
      <div class="left">
        <List item-layout="horizontal" :data-source="templateList">
          <template #renderItem="{ item, index }">
            <a-list-item class="left-container" @click="selectTemplateIndex(index)">
              <div>{{ item.name }}</div>
              <Image
                :preview="false"
                :src="item.image"
                fallback="data:image/png;base64,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"
              />
              <!-- {{ item }} -->
            </a-list-item>
          </template>
        </List>
      </div>
      <div class="right">
        <div v-if="index > -1" class="has-content">
          <div class="right-description">
            <Image
              :preview="false"
              :width="500"
              :height="500"
              :src="templateList[index]?.image"
              fallback="data:image/png;base64,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"
            />

            <pre style="width: calc(100% - 550px)">{{ templateList[index].description }}</pre>
          </div>

          <div style="text-align: end">
            <a-button type="primary" @click="applyTemplate">应用模版</a-button>
          </div>
        </div>

        <Empty v-else description="请在右侧选择模版" />
      </div>
    </div>

    <div v-show="outLineStep !== 1" class="preview-container">
      <!-- {{ templateList[index] }} -->

      <div class="preview-top">
        <div class="preview-top-left">
          <Image
            :preview="false"
            :width="400"
            :height="300"
            :src="index > -1 ? templateList[index]?.image : projectOultine?.image"
            fallback="data:image/png;base64,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"
          />
        </div>
        <div class="preview-top-right">
          <div class="pixiWrapper">
            <div ref="pixiRef"></div>
          </div>
        </div>
      </div>
      <div class="preview-bottom">
        <PageHeader
          class="demo-page-header"
          style="height: 100%; border: 1px solid rgb(235, 237, 240)"
          title="数据管理"
          sub-title="在此处处理数据"
        >
          <template #extra>
            <a-button key="1" type="primary" @click="downloadFile">下载模版</a-button>

            <Upload
              key="2"
              v-model:file-list="fileList"
              name="file"
              :multiple="false"
              :showUploadList="false"
              :action="actionUrl"
              :headers="headers"
              @change="handleChange"
            >
              <a-button>
                <UploadOutlined />
                上传
              </a-button>
            </Upload>
            <a-button key="3" @click="showModal">编辑</a-button>
          </template>
          <a-table :columns="header" :data-source="tableData" :pagination="false" size="small">
            <template #angle="{ text }">
              <span>
                {{ angleText(text) }}
              </span>
            </template>
          </a-table>
        </PageHeader>
      </div>
    </div>

    <a-modal v-model:visible="visible" title="编辑数据" :footer="false" @ok="handleOk">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="tableRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item
          v-for="(item, index) in header"
          :key="index"
          :name="item.title"
          :label="item.title"
        >
          <InputNumber
            v-if="item.type === 'number'"
            v-model:value="formState[item.title]"
            style="width: 100%"
          />

          <a-input-group v-else-if="item.type === 'angle'" compact style="width: 100%">
            <InputNumber
              v-model:value="formState[`angle-${item.title}-degree`]"
              :formatter="(value) => `${value}°`"
              :parser="(value) => value.replace('°', '')"
              style="width: 33.33%"
            />
            <InputNumber
              v-model:value="formState[`angle-${item.title}-minute`]"
              :formatter="(value) => `${value}′`"
              :parser="(value) => value.replace('′', '')"
              style="width: 33.33%"
            />
            <InputNumber
              v-model:value="formState[`angle-${item.title}-second`]"
              :formatter="(value) => `${value}″`"
              :parser="(value) => value.replace('″', '')"
              style="width: 33.33%"
            />
          </a-input-group>

          <!-- <Angle v-model:value="formState[item.title]" /> -->
        </a-form-item>
      </a-form>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">创建</a-button>
        <a-button style="margin-left: 10px">关闭</a-button>
      </a-form-item>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  toRefs,
  UnwrapRef,
  onUnmounted
} from 'vue'
import {
  Typography,
  Empty,
  PageHeader,
  Divider,
  Image,
  List,
  Cascader,
  Select,
  Alert,
  InputNumber,
  message as Msg,
  Modal,
  Upload
} from 'ant-design-vue'
import {
  createOutlineParams,
  getCreateStep1Info,
  getOutlineParamsByPlanId,
  getOutlineTemplateByShapeType,
  getOutlineTemplateList
} from '@/api/system/scheme'
import { Template } from './interface'

import { angleTextAnalysis } from '@/utils/common'
import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { useRoute, useRouter } from 'vue-router'

import { UploadOutlined } from '@ant-design/icons-vue'
import { storage } from '@/utils/Storage'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import * as PIXI from 'pixi.js'

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}
interface State {
  templateList: Template[]
  index: number
  outLineStep: 1 | 2
  tableData: any[]
  projectInfo: any
  projectOultine: any
  header: any[]
  defaultId: number
  defaultPid: number
  templateUrl: string
}

export default defineComponent({
  components: {
    Title: Typography.Title,
    Empty,
    Modal,
    PageHeader,
    Divider,
    Cascader,
    Image,
    Select,
    'a-select-option': Select.Option,
    List,
    'a-list-item': List.Item,
    'a-list-meta': List.Item.Meta,
    InputNumber,
    Alert,
    UploadOutlined,
    Upload
  },

  setup() {
    const formRef = ref()

    const route = useRoute()
    const router = useRouter()
    // 画图
    const pixiRef = ref<any>(null)
    // Pixi
    let app: PIXI.Application

    // Pixi 根容器
    let rootContainer: PIXI.Container

    // Pixi 轮廓线容器
    let outlineContainer: PIXI.Container
    const state: State = reactive({
      templateList: [],
      index: -1,
      outLineStep: 1,
      tableData: [],
      projectInfo: undefined,
      projectOultine: undefined,
      defaultId: 0,
      defaultPid: 0,
      header: [],
      templateUrl: ''
    })
    const formState: UnwrapRef<any> = reactive({})
    const goBackList = () => {
      state.outLineStep = 1
    }
    const applyTemplate = () => {
      getHeader(state.templateList[state.index].headers)
      state.templateUrl = state.templateList[state.index].templateFile
      state.outLineStep = 2
    }
    const selectTemplateIndex = (index: number) => {
      state.index = index
    }
    const getHeader = (arrList: any[]) => {
      const arr: any[] = []
      for (const item of arrList) {
        const arrItem = {
          title: item.sign,
          dataIndex: item.sign,
          key: item.sign,
          type: item.data_type
        }
        if (arrItem.type === 'angle') {
          arrItem['slot'] = { customRender: 'angle' }
        }
        arr.push(arrItem)
      }

      state.header = arr
    }

    const getTableData = (arrList: any[]) => {
      const arrItem = {}
      for (const item of arrList) {
        arrItem[item.sign] = item.value
        formState[item.sign] = item.value
      }

      state.tableData = [arrItem]

      // formState = toRaw(arrItem)
    }
    // const header = computed(() => {

    //   if (state.index > -1 && state.projectInfo.step === 1) {
    //     getArr(state.templateList[state.index].headers)
    //   } else if (state.projectInfo?.step !== 1) {
    //     getArr(state.templateList[state.index].headers)
    //   }

    //   return arr
    // })
    const visible = ref<boolean>(false)

    const showModal = () => {
      visible.value = true
    }

    const handleOk = (e: MouseEvent) => {
      console.log(e)
      visible.value = false
    }

    const onSubmit = async () => {
      // formRef.value
      //   .validate()
      //   .then(() => {
      //     debugger
      //     console.log('values', formState, toRaw(formState))
      //   })
      //   .catch((error: ValidateErrorEntity<any>) => {
      //     console.log('error', error)
      //   })

      const data = toRaw(formState)

      const body = {}
      let canSubmit = true

      for (const item of state.header) {
        if (item.type === 'angle') {
          if (
            data[`angle-${item.title}-degree`] &&
            data[`angle-${item.title}-minute`] &&
            data[`angle-${item.title}-second`]
          ) {
            body[item.title] = `${data[`angle-${item.title}-degree`]}-${
              data[`angle-${item.title}-minute`]
            }-${data[`angle-${item.title}-second`]}`
          } else {
            Msg.warn(`${item.title}填写不完整`)
            canSubmit = false
            break
          }
        } else {
          if (data[item.title]) {
            body[item.title] = data[item.title]
          } else {
            Msg.warn(`${item.title}填写不完整`)
            canSubmit = false
            break
          }
        }
      }

      if (canSubmit && state.index !== -1) {
        const res = await createOutlineParams(
          state.projectInfo.id,
          state.templateList[state.index].id,
          body
        )

        let arr: any[] = [...state.tableData]
        arr[0] = body
        state.tableData = arr
        console.log(res.data)

        drawOutline(res.computedParam)
        Msg.success('创建成功！')
        visible.value = false
      } else {
        Msg.warn('提交失败')
      }
    }

    const tableRules = computed(() => {
      const rules: any[] = []
      for (const item of state.header) {
        const rule = {}
        rule[item.title] = { required: true, message: `请填写${item.title}`, trigger: 'blur' }

        rules.push(rule)
      }

      return rules
    })

    const angleText = (text: string) => angleTextAnalysis(text)

    const drawOutline = (computedParam) => {
      console.log('computedParam', computedParam)

      const radio = 7
      // 画图坐标转换
      const calculateDrawData = (drawObject) => {
        return {
          r: drawObject.radius / radio,
          start: drawObject.startTheta,
          end: drawObject.endTheta,
          x: drawObject.x / radio,
          y: drawObject.y / radio
        }
      }
      // 画轮廓线
      // 顶
      const top = calculateDrawData(computedParam.upArc)
      const arcTop = new PIXI.Graphics()
      arcTop.lineStyle(1, 0x000000, 1)
      arcTop.arc(top.x, top.y, top.r, top.start, top.end, true)
      outlineContainer.addChild(arcTop)

      // 左拱腰
      const left = calculateDrawData(computedParam.leftArc)
      const arcLeft = new PIXI.Graphics()
      arcLeft.lineStyle(1, 0x000000, 1)
      arcLeft.arc(left.x, left.y, left.r, left.start, left.end, true)
      outlineContainer.addChild(arcLeft)

      // 右拱腰
      const right = calculateDrawData(computedParam.rightArc)
      const arcRight = new PIXI.Graphics()
      arcRight.lineStyle(1, 0x000000, 1)
      arcRight.arc(right.x, right.y, right.r, right.start, right.end, true)
      outlineContainer.addChild(arcRight)

      // 拱底
      const bottom = calculateDrawData(computedParam.downArc)
      const arcBottom = new PIXI.Graphics()
      arcBottom.lineStyle(1, 0x000000, 1)
      arcBottom.arc(bottom.x, bottom.y, bottom.r, bottom.start, bottom.end)
      outlineContainer.addChild(arcBottom)
    }

    onMounted(async () => {
      try {
        // 画布大小
        const canvasWidth = 500
        const canvasHeight = 300

        // 初始化

        console.log(pixiRef)

        const canvas = pixiRef.value
        console.log(canvas)

        app = new PIXI.Application({
          width: canvasWidth,
          height: canvasHeight,
          transparent: true,
          antialias: true,
          resolution: 1
        })

        // 原点
        const Ox = canvasWidth / 2
        const Oy = canvasHeight / 2

        app.stage.interactive = true

        canvas.appendChild(app.view)

        app.start()

        // 根容器
        rootContainer = new PIXI.Container()
        app.stage.addChild(rootContainer)

        rootContainer.setTransform(Ox, Oy, 0, -1)

        // 初始化子容器

        // 轮廓线容器
        outlineContainer = new PIXI.Container()
        rootContainer.addChild(outlineContainer)

        const query = route.query

        if (query && query.planId) {
          state.defaultId = Number(query.planId)
          state.defaultPid = Number(query.pid)
          try {
            const info = await getCreateStep1Info(query.planId)
            const outlineTemplate = await getOutlineTemplateByShapeType(info.shape)
            state.templateList = outlineTemplate
            state.projectInfo = info
            if (info.step === 1) {
              state.templateUrl = state.templateList[state.index].templateFile
              getHeader(state.templateList[state.index].headers)
            } else {
              const data = await getOutlineParamsByPlanId(query.planId)
              state.projectOultine = data

              console.log(300008, state.projectOultine)

              getHeader(state.projectOultine.param)
              getTableData(state.projectOultine.param)
              state.outLineStep = 2

              drawOutline(state.projectOultine.computedParam)
            }
          } catch (error) {}
        } else {
          Modal.warning({
            title: '错误',
            content: '未找到方案ID，无法进行步骤二。',
            onOk() {
              router.push('/')
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    })
    onMounted(() => {})
    const downloadFile = () => {
      alert(state.templateUrl)
      window.open(state.templateUrl)
    }

    const handleChange = (info: FileInfo) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        const data: any = info.file.response

        getTableData(data.data.param)
        drawOutline(data.data.computedParam)

        Msg.success(`${info.file.name} 文件上传成功！`)
      } else if (info.file.status === 'error') {
        Msg.error(`${info.file.name} 文件上传失败！`)
      }
    }

    const fileList = ref([])
    const headers = computed(() => {
      const token = storage.get(ACCESS_TOKEN)
      return { token: token }
    })

    const actionUrl = computed(() => {
      return `/api/outline-param/plan/${state.defaultId}/template/${
        state.index > -1 ? state.templateList[state.index].id : 0
      }/upload`
    })

    onUnmounted(() => {
      app.stop()
    })

    return {
      ...toRefs(state),
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      handleChange,
      actionUrl,
      fileList,
      headers,
      visible,
      formState,
      tableRules,
      formRef,
      angleText,
      onSubmit,
      showModal,
      handleOk,
      selectTemplateIndex,
      applyTemplate,
      goBackList,
      pixiRef,
      downloadFile
    }
  }
})
</script>

<style lang="less" scoped>
.create-container {
  height: calc(100vh - 150px);
  padding: 15px;
}

.outline-container {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 600px;
  flex-wrap: nowrap;
  flex-direction: row;
}

.left {
  width: 200px;
  height: calc(100vh - 220px);
  overflow-x: hidden;
  overflow-y: auto;

  // background: green;
}

.left-container {
  display: flex;
  width: 180px;
  height: 200px;
  // border-radius: 10px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #ddd;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

  &:hover {
    background: #f0f0f0;
  }
}

.right {
  // background: red;
  display: flex;
  width: calc(100% - 220px);
  height: calc(100vh - 220px);
  padding: 20px;
  border: 1px solid #ddd;
  flex-direction: column;
  justify-content: space-between;

  .has-content {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }

  .right-description {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}

.preview-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  // flex-wrap: nowrap;
}

.preview-top {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}

.preview-top-left {
  width: 500px;
  height: 300px;
  text-align: center;
  background-color: white;
}

.preview-top-right {
  width: 500px;
  height: 300px;
  // background-color: white;
}

.preview-bottom {
  padding-top: 10px;
}

.pixiWrapper {
  display: flex;
  justify-content: center;
  // height: 300px;
}
</style>
