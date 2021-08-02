<template>
  <div>
    <div style="text-align: right; margin-bottom: 16px">
      <a-button type="primary" @click="showModal">添加掏槽孔</a-button>
    </div>
    <!-- 表格 -->
    <a-table :columns="columns" :data-source="data" bordered :childrenColumnName="null">
      <template #action="{ record }">
        <span>
          <a-button type="link" @click="showEditModal(record)"
            ><template #icon><EditTwoTone /></template
          ></a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确认删除这行掏槽孔信息吗?"
            ok-text="删除"
            cancel-text="不删除"
            @confirm="confirm(record)"
          >
            <a-button type="link"
              ><template #icon><DeleteTwoTone /></template
            ></a-button>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
    <!-- 添加表单 -->
    <a-modal
      v-model:visible="visible"
      title="添加掏槽孔"
      :footer="null"
      @ok="handleOk"
      @cancel="handleOk"
    >
      <a-form :model="cutHoleFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="部位">
          <a-input v-model:value="cutHoleFormState.holePosition" />
        </a-form-item>
        <a-form-item label="孔口(cm)">
          <a-input-number v-model:value="cutHoleFormState.rowSpacing" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔距(cm)">
          <a-input-number v-model:value="cutHoleFormState.holeDistance" style="width: 100%" />
        </a-form-item>
        <a-form-item label="起始位(cm)">
          <a-input-number v-model:value="cutHoleFormState.startPosition" style="width: 100%" />
        </a-form-item>
        <a-form-item label="垂直深度(cm)">
          <a-input-number v-model:value="cutHoleFormState.holeDepth" style="width: 100%" />
        </a-form-item>
        <a-form-item label="超深(cm)">
          <a-input-number v-model:value="cutHoleFormState.ultraDeep" style="width: 100%" />
        </a-form-item>
        <a-form-item label="倾角(°)">
          <a-input-number v-model:value="cutHoleFormState.holeAngle" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔数">
          <a-input-number v-model:value="cutHoleFormState.holeCount" style="width: 100%" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onSubmit">提交</a-button>
          <a-button style="margin-left: 10px" @click="handleOk">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <!--  编辑表单 -->
    <a-modal
      v-model:visible="visibleEdit"
      title="编辑掏槽孔"
      :footer="null"
      @ok="handleEditOk"
      @cancel="handleEditOk"
    >
      <a-form :model="cutHoleFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="部位">
          <a-input v-model:value="cutHoleFormState.holePosition" />
        </a-form-item>
        <a-form-item label="孔口(cm)">
          <a-input-number v-model:value="cutHoleFormState.rowSpacing" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔距(cm)">
          <a-input-number v-model:value="cutHoleFormState.holeDistance" style="width: 100%" />
        </a-form-item>
        <a-form-item label="起始位(cm)">
          <a-input-number v-model:value="cutHoleFormState.startPosition" style="width: 100%" />
        </a-form-item>
        <a-form-item label="垂直深度(cm)">
          <a-input-number v-model:value="cutHoleFormState.holeDepth" style="width: 100%" />
        </a-form-item>
        <a-form-item label="超深(cm)">
          <a-input-number v-model:value="cutHoleFormState.ultraDeep" style="width: 100%" />
        </a-form-item>
        <a-form-item label="倾角(°)">
          <a-input-number v-model:value="cutHoleFormState.holeAngle" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔数">
          <a-input-number v-model:value="cutHoleFormState.holeCount" style="width: 100%" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onEditSubmit">提交</a-button>
          <a-button style="margin-left: 10px" @click="handleEditOk">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRaw, UnwrapRef, onMounted, computed } from 'vue'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue'
import { postHoleTable, editHoleTable } from '@/api/system/design/table'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

interface CutHoleFormState {
  blastholeType: string
  holePosition: string
  rowSpacing: number
  holeDistance: number
  startPosition: number
  holeDepth: number
  ultraDeep: number
  holeAngle: number
  holeCount: number
  planId: any
}

const columns = [
  {
    title: '部位',
    dataIndex: 'holePosition',
    key: 'holePosition'
  },
  {
    title: '孔口(cm)',
    dataIndex: 'rowSpacing',
    key: 'rowSpacing'
  },
  {
    title: '孔距(cm)',
    dataIndex: 'holeDistance',
    key: 'holeDistance'
  },
  {
    title: '起始位(cm)',
    dataIndex: 'startPosition',
    key: 'startPosition'
  },
  {
    title: '垂直深度(cm)',
    dataIndex: 'holeDepth',
    key: 'holeDepth'
  },

  {
    title: '超深(cm)',
    dataIndex: 'ultraDeep',
    key: 'ultraDeep'
  },

  {
    title: '倾角(°)',
    dataIndex: 'holeAngle',
    key: 'holeAngle'
  },

  {
    title: '孔长(cm)',
    dataIndex: 'holeLength',
    key: 'holeLength'
  },
  {
    title: '孔底(cm)',
    dataIndex: 'holeBottomDistance',
    key: 'holeBottomDistance'
  },
  {
    title: '孔数',
    dataIndex: 'holeCount',
    key: 'holeCount'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

export default defineComponent({
  components: {
    EditTwoTone,
    DeleteTwoTone
  },
  setup() {
    const route = useRoute()

    const store = useStore()

    const data = computed(() => store.getters['design/getCutHoleTableData'])

    const visible = ref<boolean>(false)

    const showModal = () => {
      visible.value = true
    }

    const handleOk = () => {
      visible.value = false
    }

    const visibleEdit = ref<boolean>(false)

    const currentEditId = ref<boolean | null>(null)

    const showEditModal = (record: any) => {
      cutHoleFormState.holePosition = record.holePosition
      cutHoleFormState.rowSpacing = record.rowSpacing
      cutHoleFormState.holeDistance = record.holeDistance
      cutHoleFormState.startPosition = record.startPosition
      cutHoleFormState.holeDepth = record.holeDepth
      cutHoleFormState.ultraDeep = record.ultraDeep
      cutHoleFormState.holeAngle = record.holeAngle
      cutHoleFormState.holeCount = record.holeCount
      currentEditId.value = record.id
      visibleEdit.value = true
    }

    const handleEditOk = () => {
      visibleEdit.value = false
    }

    const cutHoleFormState: UnwrapRef<CutHoleFormState> = reactive({
      blastholeType: '掏槽孔',
      holePosition: '',
      rowSpacing: 0,
      holeDistance: 0,
      startPosition: 0,
      holeDepth: 0,
      ultraDeep: 0,
      holeAngle: 0,
      holeCount: 0,
      planId: route.params.planId
    })

    const clearFormState = () => {
      cutHoleFormState.holePosition = ''
      cutHoleFormState.rowSpacing = 0
      cutHoleFormState.holeDistance = 0
      cutHoleFormState.startPosition = 0
      cutHoleFormState.holeDepth = 0
      cutHoleFormState.ultraDeep = 0
      cutHoleFormState.holeAngle = 0
      cutHoleFormState.holeCount = 0
    }

    const onSubmit = async () => {
      const formData = toRaw(cutHoleFormState)
      try {
        await postHoleTable(formData)
        handleOk()
        clearFormState()
      } catch (e) {}
    }

    const onEditSubmit = async () => {
      const formData: any = toRaw(cutHoleFormState)
      formData.id = currentEditId.value
      try {
        await editHoleTable(formData)
        handleEditOk()
        clearFormState()
        currentEditId.value = null
        getTableData()
      } catch (e) {}
    }

    const confirm = async (record: any) => {
      await store.dispatch('design/deleteOneHoleTableData', record.id)
      getTableData()
    }

    onMounted(() => {
      // getTableData()
    })

    const getTableData = async () => {
      store.dispatch('design/getCutHoleTableData', route.params.planId)
    }

    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      data,
      columns,
      visible,
      showModal,
      handleOk,
      cutHoleFormState,
      onSubmit,
      confirm,
      showEditModal,
      visibleEdit,
      handleEditOk,
      onEditSubmit
    }
  }
})
</script>

<style></style>
