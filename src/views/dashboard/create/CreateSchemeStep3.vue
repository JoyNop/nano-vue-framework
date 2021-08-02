<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-15 10:51:42
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-01 09:33:31
 * @Description: file content
 * @FilePath: /blast-browser/src/views/dashboard/create/CreateSchemeStep3.vue
-->

<template>
  <div class="create-container">
    <PageHeader class="demo-page-header" title="创建方案">
      <template #extra>
        <a-button type="primary" @click="onSubmit">创建</a-button>
      </template></PageHeader
    >
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
        <a-form-item label="围岩条件、埋深"> <span></span></a-form-item>
        <a-form-item label="围岩等级" name="rockLevel">
          <Select v-model:value="formState1.rockLevel" placeholder="请选择围岩等级">
            <a-select-option value="Ⅰ ">Ⅰ</a-select-option>
            <a-select-option value="Ⅱ">Ⅱ</a-select-option>
            <a-select-option value="Ⅲ">Ⅲ</a-select-option>
            <a-select-option value="Ⅳ">Ⅳ</a-select-option>
            <a-select-option value="Ⅴ">Ⅴ</a-select-option>
          </Select>
        </a-form-item>
        <a-form-item label="可爆性/级别" name="blastabilityList">
          <Cascader
            v-model:value="formState1.blastabilityList"
            change-on-select
            :options="blastability_options"
            placeholder="请选择可爆性和级别"
          />
        </a-form-item>

        <a-form-item label="深埋(m)" name="buriedDepth" placeholder="请填写深埋">
          <InputNumber v-model:value="formState1.buriedDepth" style="width: 100%" />
        </a-form-item>
        <a-form-item label="炸药性质"> <span></span></a-form-item>

        <a-form-item label="普通药卷直径(mm)" name="diameter">
          <InputNumber v-model:value="formState1.diameter" style="width: 100%" />
        </a-form-item>
        <a-form-item label="光面炮孔药卷直径(mm)" name="peripheralDiameter">
          <InputNumber v-model:value="formState1.peripheralDiameter" style="width: 100%" />
        </a-form-item>
        <a-form-item label="密度(g/cm3)" name="density">
          <InputNumber v-model:value="formState1.density" style="width: 100%" />
        </a-form-item>
        <a-form-item label="爆速(m/s):" name="velocity">
          <InputNumber v-model:value="formState1.velocity" style="width: 100%" />
        </a-form-item>
        <a-form-item label="猛度(mm)" name="brisance">
          <InputNumber v-model:value="formState1.brisance" style="width: 100%" />
        </a-form-item>
        <a-form-item label="做功能力(ml)" name="capacity">
          <InputNumber v-model:value="formState1.capacity" style="width: 100%" />
        </a-form-item>
        <a-form-item label="循环进尺(m)" name="cyclicFootage">
          <InputNumber v-model:value="formState1.cyclicFootage" style="width: 100%" />
        </a-form-item>
        <a-form-item label="炮孔利用率(%)" name="holeUtilization">
          <InputNumber v-model:value="formState1.holeUtilization" style="width: 100%" />
        </a-form-item>
        <a-form-item label="垂直深度(m)" name="verticalDepth">
          <InputNumber v-model:value="formState1.verticalDepth" style="width: 100%" />
        </a-form-item>
        <a-form-item label="炮孔直径(mm)" name="holeDiameter">
          <InputNumber v-model:value="formState1.holeDiameter" style="width: 100%" />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  toRaw,
  UnwrapRef,
  defineComponent,
  ref,
  onMounted,
  computed,
  watch
} from 'vue'

import {
  PageHeader,
  Select,
  Modal,
  InputNumber,
  Card,
  Image,
  List,
  Cascader,
  Alert
} from 'ant-design-vue'
import { createPage1, createPage3, getSechemeBaseData } from '@/api/system/scheme'
import { selectBoxTask } from '@/utils/treeTask'

import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { useRoute, useRouter } from 'vue-router'
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

  planId: number
}

interface FormState1 {
  rockLevel: string
  blastabilityList: string[]
  buriedDepth: number
  diameter: number
  peripheralDiameter: number
  density: number
  velocity: number
  brisance: number
  capacity: number
  cyclicFootage: number
  holeUtilization: number
  verticalDepth: number
  holeDiameter: number
}

export default defineComponent({
  components: {
    PageHeader,
    Select,
    Modal,
    InputNumber,
    Card,
    Cascader,
    Image,
    'a-select-option': Select.Option,
    List,
    'a-list-item': List.Item,
    'a-list-meta': List.Item.Meta,
    Alert
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state: State = reactive({
      count: 0,
      step: 1,
      sechemeBaseData: '',
      submitData: {},
      planId: -1
    })
    const formRef = ref()
    const visible = ref<boolean>(false)

    const formState1: UnwrapRef<FormState1> = reactive({
      rockLevel: '',
      blastabilityList: [],
      buriedDepth: 0,
      diameter: 0,
      peripheralDiameter: 0,
      density: 0,
      velocity: 0,
      brisance: 0,
      capacity: 0,
      cyclicFootage: 0,
      holeUtilization: 0,
      verticalDepth: 0,
      holeDiameter: 0
    })

    const onSubmit = async () => {
      formRef.value
        .validate()
        .then(async () => {
          const data: any = toRaw(formState1)
          data['blastability'] = data.blastabilityList[0]
          data['blastabilityLevel'] = data.blastabilityList[1]

          data['planId'] = state.planId

          if (state.planId > -1) {
            const res = await createPage3(data)

            const pid = route.query.pid

            Modal.success({
              title: '成功！',
              content: '方案创建成功！',
              onOk() {
                router.push(`/dashboard/design/pid/${pid}/plan/${res.planId}`)
              }
            })
          }
        })
        .catch((error: ValidateErrorEntity<FormState1>) => {
          console.log('error', error)
        })
    }

    //掏槽形式配置
    const blastability_options = computed(() => {
      let list: any[] = []

      if (state.sechemeBaseData && state.sechemeBaseData.blastability) {
        list = selectBoxTask(state.sechemeBaseData.blastability)
      }

      return list
    })

    onMounted(async () => {
      const query = route.query

      if (query && query.planId) {
        const res = await getSechemeBaseData()
        state.planId = Number(query.planId)
        state.sechemeBaseData = res
      } else {
        Modal.warning({
          title: '错误',
          content: '未找到方案ID，无法进行步骤三。',
          onOk() {
            router.push('/')
          }
        })
      }
    })
    const rules = {
      rockLevel: [{ required: true, message: '请填写围岩等级', trigger: 'blur' }],
      blastabilityList: [
        { type: 'array', required: true, message: '请选择爆破性能级别', trigger: 'blur' }
      ],

      buriedDepth: [{ type: 'number', required: false, message: '请填写埋深', trigger: 'blur' }],
      diameter: [
        { type: 'number', required: true, message: '请填写普通药卷直径', trigger: 'blur' }
      ],
      peripheralDiameter: [
        { type: 'number', required: true, message: '请填写光面炮孔药卷直径', trigger: 'blur' }
      ],
      density: [{ type: 'number', required: false, message: '请填写密度', trigger: 'blur' }],
      velocity: [{ type: 'number', required: false, message: '请填写爆速', trigger: 'blur' }],
      brisance: [{ type: 'number', required: false, message: '请填写猛度', trigger: 'blur' }],
      capacity: [{ type: 'number', required: false, message: '请填写做功能力', trigger: 'blur' }],
      cyclicFootage: [
        { type: 'number', required: false, message: '请填写循环进尺', trigger: 'blur' }
      ],
      holeUtilization: [
        { type: 'number', required: false, message: '请填写炮孔利用率', trigger: 'blur' }
      ],
      verticalDepth: [
        { type: 'number', required: false, message: '请填写垂直深度', trigger: 'blur' }
      ]
    }

    // 监听菜单收缩状态
    watch(
      () => [formState1.cyclicFootage, formState1.holeUtilization],
      (newVal) => {
        formState1.verticalDepth = newVal[0] / newVal[1]
      }
    )

    return {
      ...toRefs(state),
      rules,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formRef,
      formState1,
      visible,
      onSubmit,
      blastability_options
    }
  }
})
</script>

<style lang="less" scoped>
.create-container {
  height: calc(100vh - 150px);
}

.form-container {
  max-height: 600px;
  overflow: auto;
}
</style>
