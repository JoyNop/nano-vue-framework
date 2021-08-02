<template>
  <div>
    <div style="text-align: right; margin-bottom: 16px">
      <a-button type="primary" @click="showModal">添加内圈孔</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" bordered :childrenColumnName="null">
      <template #action="{ record }">
        <span>
          <a-button type="link" @click="showEditModal(record)"
            ><template #icon><EditTwoTone /></template
          ></a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确认删除这行内圈孔信息吗?"
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
      title="添加内圈孔"
      :footer="null"
      @ok="handleOk"
      @cancel="handleOk"
    >
      <a-form :model="paddingHoleFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="部位">
          <a-input v-model:value="paddingHoleFormState.holePosition" />
        </a-form-item>
        <a-form-item label="光爆层厚度(cm)">
          <a-input-number v-model:value="paddingHoleFormState.rowSpacing" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔距(cm)">
          <a-input-number v-model:value="paddingHoleFormState.holeDistance" style="width: 100%" />
        </a-form-item>
        <a-form-item label="垂直深度(cm)">
          <a-input-number v-model:value="paddingHoleFormState.holeDepth" style="width: 100%" />
        </a-form-item>
        <a-form-item label="角度(°)">
          <a-input-number v-model:value="paddingHoleFormState.holeAngle" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔数">
          <a-input-number v-model:value="paddingHoleFormState.holeCount" style="width: 100%" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onSubmit">提交</a-button>
          <a-button style="margin-left: 10px" @click="handleOk">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 编辑表单 -->
    <a-modal
      v-model:visible="visibleEdit"
      title="编辑内圈孔"
      :footer="null"
      @ok="handleEditOk"
      @cancel="handleEditOk"
    >
      <a-form :model="paddingHoleFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="部位">
          <a-input v-model:value="paddingHoleFormState.holePosition" />
        </a-form-item>
        <a-form-item label="光爆层厚度(cm)">
          <a-input-number v-model:value="paddingHoleFormState.rowSpacing" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔距(cm)">
          <a-input-number v-model:value="paddingHoleFormState.holeDistance" style="width: 100%" />
        </a-form-item>
        <a-form-item label="垂直深度(cm)">
          <a-input-number v-model:value="paddingHoleFormState.holeDepth" style="width: 100%" />
        </a-form-item>
        <a-form-item label="角度(°)">
          <a-input-number v-model:value="paddingHoleFormState.holeAngle" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔数">
          <a-input-number v-model:value="paddingHoleFormState.holeCount" style="width: 100%" />
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

const columns = [
  {
    title: '部位',
    dataIndex: 'holePosition',
    key: 'holePosition'
  },
  {
    title: '光爆层厚度(cm)',
    dataIndex: 'rowSpacing',
    key: 'rowSpacing'
  },
  {
    title: '孔距(cm)',
    dataIndex: 'holeDistance',
    key: 'holeDistance'
  },

  {
    title: '垂直深度(cm)',
    dataIndex: 'holeDepth',
    key: 'holeDepth'
  },

  {
    title: '角度(°)',
    dataIndex: 'holeAngle',
    key: 'holeAngle'
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

interface PaddingHoleFormState {
  blastholeType: string
  holePosition: string
  rowSpacing: number
  holeDistance: number
  holeDepth: number
  holeAngle: number
  holeCount: number
  planId: any
}

export default defineComponent({
  components: {
    EditTwoTone,
    DeleteTwoTone
  },
  setup() {
    const route = useRoute()
    const visible = ref<boolean>(false)

    const store = useStore()

    const data = computed(() => store.getters['design/getPaddingHoleTableData'])

    const showModal = () => {
      visible.value = true
    }

    const handleOk = () => {
      visible.value = false
    }

    const visibleEdit = ref<boolean>(false)

    const currentEditId = ref<boolean | null>(null)

    const showEditModal = (record: any) => {
      paddingHoleFormState.holePosition = record.holePosition
      paddingHoleFormState.rowSpacing = record.rowSpacing
      paddingHoleFormState.holeDistance = record.holeDistance
      paddingHoleFormState.holeDepth = record.holeDepth
      paddingHoleFormState.holeAngle = record.holeAngle
      paddingHoleFormState.holeCount = record.holeCount
      currentEditId.value = record.id
      visibleEdit.value = true
    }

    const handleEditOk = () => {
      visibleEdit.value = false
    }

    const paddingHoleFormState: UnwrapRef<PaddingHoleFormState> = reactive({
      blastholeType: '内圈孔',
      holePosition: '',
      rowSpacing: 0,
      holeDistance: 0,
      holeDepth: 0,
      holeAngle: 0,
      holeCount: 0,
      planId: route.params.planId
    })

    const clearFormState = () => {
      paddingHoleFormState.holePosition = ''
      paddingHoleFormState.rowSpacing = 0
      paddingHoleFormState.holeDistance = 0
      paddingHoleFormState.holeDepth = 0
      paddingHoleFormState.holeAngle = 0
      paddingHoleFormState.holeCount = 0
    }

    const onSubmit = async () => {
      const formData = toRaw(paddingHoleFormState)
      try {
        await postHoleTable(formData)
        handleOk()
        clearFormState()
      } catch (e) {
        console.log('周边孔失败!')
      }
    }

    const onEditSubmit = async () => {
      const formData: any = toRaw(paddingHoleFormState)
      formData.id = currentEditId.value
      try {
        await editHoleTable(formData)
        handleEditOk()
        clearFormState()
        currentEditId.value = null
        getTableData()
      } catch (e) {
        console.log('失败!')
      }
    }

    const confirm = async (record: any) => {
      await store.dispatch('design/deleteOneHoleTableData', record.id)
      getTableData()
    }

    onMounted(() => {
      // getTableData()
    })

    const getTableData = async () => {
      store.dispatch('design/getPaddingHoleTableData', route.params.planId)
    }

    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      data,
      columns,
      visible,
      showModal,
      handleOk,
      paddingHoleFormState,
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
