<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-15 10:51:42
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-01 09:34:14
 * @Description: file content
 * @FilePath: /blast-browser/src/views/dashboard/create/CreateSchemeStep1.vue
-->

<template>
  <div class="create-container">
    <PageHeader class="demo-page-header" title="创建">
      <template #extra>
        <a-button key="1" type="primary" @click="onSubmit">下一步</a-button>
      </template>
    </PageHeader>

    <div class="form-container">
      <a-form
        v-show="step === 1"
        ref="formRef"
        :model="formState1"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <!-- <a-form-item label="方案名称">
          <a-input v-model:value="formState1.name" />
        </a-form-item> -->

        <a-form-item label="所属文件夹">
          <a-select
            v-model:value="formState1.pid"
            style="width: 100%"
            placeholder="请选择所属文件夹"
          >
            <a-select-option :key="0" :value="0"> 根目录 </a-select-option>
            <a-select-option v-for="(d, index) in directorys" :key="index" :value="d.id">
              {{ d.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="隧道名称" name="project_name">
          <a-input v-model:value="formState1.project_name" />
        </a-form-item>
        <a-form-item label="隧道描述" name="project_describe">
          <a-input v-model:value="formState1.project_describe" />
        </a-form-item>
        <a-form-item label="工作面" name="working_face">
          <a-input v-model:value="formState1.working_face" />
        </a-form-item>
        <a-form-item label="里程桩号" name="mileage">
          <a-input v-model:value="formState1.mileage" />
        </a-form-item>

        <a-form-item label="里程桩号描述" name="mileage_describe">
          <a-input v-model:value="formState1.mileage_describe" />
        </a-form-item>
        <a-form-item label="隧道类型及类别" name="project_type">
          <Cascader
            v-model:value="formState1.project_type"
            change-on-select
            :options="project_type_options"
            placeholder="请选择隧道类型及类别"
          />
        </a-form-item>
        <a-form-item label="断面形状" name="shape">
          <Cascader
            v-model:value="formState1.shape"
            change-on-select
            :options="section_shape_options"
            placeholder="请选择断面形状"
          />
        </a-form-item>
        <a-form-item label="施工方向" name="direction">
          <Select v-model:value="formState1.direction" placeholder="请选择方向">
            <a-select-option value="顺向">顺向</a-select-option>
            <a-select-option value="逆向">逆向</a-select-option>
          </Select>

          <!-- <a-input v-model:value="formState1.direction" /> -->
        </a-form-item>
        <a-form-item label="施工工法" name="excavation_method">
          <Cascader
            v-model:value="formState1.excavation_method"
            change-on-select
            :options="excavation_method_options"
            placeholder="请选择施工工法"
          />
        </a-form-item>
        <a-form-item label="掏槽形式" name="cut_pattern">
          <Cascader
            v-model:value="formState1.cut_pattern"
            change-on-select
            :options="cut_pattern_options"
            placeholder="请选择掏槽形式"
          />
          <!-- <a-input v-model:value="formState1.cut_pattern" /> -->
        </a-form-item>
        <!-- <a-form-item label="开挖轮廓线">
          <a-button @click="openKWtemplateModal">选择模版</a-button>
          <a-button type="link">
            <template #icon><EyeOutlined /></template>预览</a-button
          >
        </a-form-item> -->
      </a-form>
    </div>

    <a-modal v-model:visible="visible" title="确认提交" @ok="handleOk">
      <Alert banner :message="alertInfoMsg" :type="alertInfoType" show-icon />
      <div><span>项目名称 :</span><a-input v-model:value="submitData.name" /></div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, toRaw, UnwrapRef, defineComponent, ref, onMounted, computed } from 'vue'
import { EyeOutlined } from '@ant-design/icons-vue'
import {
  Typography,
  Divider,
  Row,
  Col,
  Card,
  Image,
  List,
  Cascader,
  Select,
  Alert,
  PageHeader
} from 'ant-design-vue'
import { checkPlanName, createPage1, getSechemeBaseData } from '@/api/system/scheme'
import { selectBoxTask } from '@/utils/treeTask'

import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { useRouter } from 'vue-router'
import { planMenus } from '@/api/system/menu'
interface SchemeBaseItem {
  children: string
  createDate: string
  id: string
  name: string
  pid: number
  typeCode: string
}

interface SchemeBase {
  blastability: SchemeBaseItem[]
  cutMode: SchemeBaseItem[]
  excavationMethod: SchemeBaseItem[]
  sectionShape: SchemeBaseItem[]
  tunnelType: SchemeBaseItem[]
}

interface State {
  count: number
  step: number
  sechemeBaseData: SchemeBase | any
  submitData: any
  nameErrorType: 0 | 1 | 2 | 3 //0正常，1有重名，2有重名已被追加时间
  alertMsg: string
  directorys: any[]
}

interface FormState1 {
  name: string
  project_name: string
  project_describe: string
  working_face: string
  mileage: string
  mileage_describe: string
  project_type: string[]
  section_type: string
  shape: string[]
  direction: string
  cut_pattern: string[]
  excavation_method: string[]
  pid: number
}

export default defineComponent({
  components: {
    EyeOutlined,
    Title: Typography.Title,
    Divider,
    Row,
    Col,
    Card,
    Cascader,
    Image,
    Select,
    'a-select-option': Select.Option,
    List,
    'a-list-item': List.Item,
    'a-list-meta': List.Item.Meta,
    Alert,
    PageHeader
  },
  setup() {
    const router = useRouter()
    const state: State = reactive({
      count: 0,
      step: 1,
      sechemeBaseData: '',
      submitData: {},
      nameErrorType: 0,
      alertMsg: '请确认项目名称，点击确认后保存提交',
      directorys: []
    })
    const formRef = ref()
    const visible = ref<boolean>(false)

    const handleOk = async (e: MouseEvent) => {
      const res = await createPage1(state.submitData)

      visible.value = false

      router.push(`/dashboard/create/scheme/2?pid=${formState1.pid}&planId=${res}`)
    }

    const formState1: UnwrapRef<FormState1> = reactive({
      pid: 0,
      name: '',
      project_name: '',
      project_describe: '',
      working_face: '',
      mileage: '',
      mileage_describe: '',
      project_type: [],
      section_type: '',
      shape: [],
      direction: '顺向',
      excavation_method: [],
      cut_pattern: []
    })

    const onSubmit = async () => {
      formRef.value
        .validate()
        .then(async () => {
          const data = toRaw(formState1)
          const submitData = {
            directoryId: data.pid, //TODO: 暂时只能创建根目录
            projectName: data.project_name,
            projectDescribe: data.project_describe,
            workFace: data.working_face,
            mileage: data.mileage,
            mileageDescribe: data.mileage_describe,
            projectType: data.project_type[0],
            sectionType: data.project_type[1],
            shape: data.shape[0],
            direction: data.direction,
            excavationMethod1: data.excavation_method[0],
            excavationMethod2: data.excavation_method[0],
            cutPattern: data.cut_pattern[0],
            name: `${data.project_name}-${data.working_face}-${data.mileage}`
          }
          state.submitData = submitData

          try {
            await checkPlanName(submitData.name)
            state.nameErrorType = 0
          } catch (error) {
            state.submitData.name = state.submitData.name + new Date().getTime()
            state.nameErrorType = 2
          } finally {
          }

          openConformModal()
          // showConfirm()
          // state.step = 2
        })
        .catch((error: ValidateErrorEntity<FormState1>) => {
          console.log('error', error)
        })
    }

    const openConformModal = () => {
      visible.value = true
    }

    //掏槽形式配置
    const cut_pattern_options = computed(() => {
      let list: any[] = []

      if (state.sechemeBaseData && state.sechemeBaseData.cutMode) {
        list = selectBoxTask(state.sechemeBaseData.cutMode)
      }

      return list
    })
    //工程类型配置
    const project_type_options = computed(() => {
      let list: any[] = []

      if (state.sechemeBaseData && state.sechemeBaseData.tunnelType) {
        list = selectBoxTask(state.sechemeBaseData.tunnelType)
      }

      return list
    })
    //开挖工法配置
    const excavation_method_options = computed(() => {
      let list: any[] = []

      if (state.sechemeBaseData && state.sechemeBaseData.excavationMethod) {
        list = selectBoxTask(state.sechemeBaseData.excavationMethod)
      }

      return list
    })

    //断面形状配置
    const section_shape_options = computed(() => {
      let list: any[] = []

      if (state.sechemeBaseData && state.sechemeBaseData.sectionShape) {
        list = selectBoxTask(state.sechemeBaseData.sectionShape)
      }

      return list
    })

    const alertInfoType = computed(() => (state.nameErrorType === 0 ? 'info' : 'warning'))

    const alertInfoMsg = computed(() => {
      let str = '请确认项目名称，点击确认后保存提交'
      switch (state.nameErrorType) {
        case 0:
          str = '请确认项目名称，点击确认后保存提交'
          break
        case 1:
          str = '当前名称已存在，请修改名称后，点击确认后保存提交'
          break
        case 2:
          str = '当前名称已存在，已为您重命名，点击确认后保存提交'
          break
      }
      return str
    })
    onMounted(async () => {
      const res = await getSechemeBaseData()

      state.sechemeBaseData = res

      const res2 = await planMenus(0)
      state.directorys = res2.directorys
    })
    const rules = {
      project_name: [{ required: true, message: '请填写隧道名称', trigger: 'blur' }],
      project_describe: [{ required: false, message: '请填写隧道描述', trigger: 'blur' }],
      working_face: [{ required: true, message: '请填写工作面', trigger: 'blur' }],
      mileage: [{ required: true, message: '请填写里程桩号', trigger: 'blur' }],
      mileage_describe: [{ required: false, message: '请填写里程桩号描述', trigger: 'blur' }],
      project_type: [
        { type: 'array', required: true, message: '请选择隧道类型及类别', trigger: 'blur' }
      ],
      shape: [{ type: 'array', required: true, message: '请选择断面形状', trigger: 'blur' }],

      direction: [{ required: false, message: '请选择施工方向', trigger: 'blur' }],
      excavation_method: [
        { type: 'array', required: true, message: '请选择施工工法', trigger: 'blur' }
      ],
      cut_pattern: [{ type: 'array', required: true, message: '请选择掏槽形式', trigger: 'blur' }]
    }
    return {
      ...toRefs(state),
      rules,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formRef,
      formState1,
      visible,
      onSubmit,
      handleOk,
      project_type_options,
      cut_pattern_options,
      excavation_method_options,
      section_shape_options,
      alertInfoType,
      alertInfoMsg
    }
  }
})
</script>

<style lang="less" scoped>
.create-container {
  height: calc(100vh - 150px);
  padding: 15px;
}

.form-container {
  max-height: 600px;
  overflow: auto;
}
</style>
