<template>
  <div>
    <div style="text-align: right; margin-bottom: 16px">
      <a-button type="primary" @click="showModal">添加底板孔</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" bordered :childrenColumnName="null">
      <template #action="{ record }">
        <span>
          <a-button type="link" @click="showEditModal(record)"
            ><template #icon><EditTwoTone /></template
          ></a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确认删除这行底板孔信息吗?"
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
      title="添加底板孔"
      :footer="null"
      @ok="handleOk"
      @cancel="handleOk"
    >
      <a-form :model="bottomHoleFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="部位">
          <a-input v-model:value="bottomHoleFormState.holePosition" />
        </a-form-item>
        <a-form-item label="孔距(cm)">
          <a-input-number v-model:value="bottomHoleFormState.holeDistance" style="width: 100%" />
        </a-form-item>
        <a-form-item label="垂直深度(cm)">
          <a-input-number v-model:value="bottomHoleFormState.holeDepth" style="width: 100%" />
        </a-form-item>
        <a-form-item label="外插角(°)">
          <a-input-number v-model:value="bottomHoleFormState.holeAngle" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔数">
          <a-input-number v-model:value="bottomHoleFormState.holeCount" style="width: 100%" />
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
      title="编辑底板孔"
      :footer="null"
      @ok="handleEditOk"
      @cancel="handleEditOk"
    >
      <a-form :model="bottomHoleFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="部位">
          <a-input v-model:value="bottomHoleFormState.holePosition" />
        </a-form-item>
        <a-form-item label="孔距(cm)">
          <a-input-number v-model:value="bottomHoleFormState.holeDistance" style="width: 100%" />
        </a-form-item>
        <a-form-item label="垂直深度(cm)">
          <a-input-number v-model:value="bottomHoleFormState.holeDepth" style="width: 100%" />
        </a-form-item>
        <a-form-item label="外插角(°)">
          <a-input-number v-model:value="bottomHoleFormState.holeAngle" style="width: 100%" />
        </a-form-item>
        <a-form-item label="孔数">
          <a-input-number v-model:value="bottomHoleFormState.holeCount" style="width: 100%" />
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
import { defineComponent, ref, reactive, toRaw, UnwrapRef, computed, onMounted } from 'vue'
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
    title: '外插角(°)',
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

interface BottomHoleFormState {
  holePosition: string
  blastholeType: string
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

    const data = computed(() => store.getters['design/getBottomHoleTableData'])

    const showModal = () => {
      visible.value = true
    }

    const handleOk = () => {
      visible.value = false
    }

    const visibleEdit = ref<boolean>(false)

    const currentEditId = ref<boolean | null>(null)

    const showEditModal = (record: any) => {
      bottomHoleFormState.holePosition = record.holePosition
      bottomHoleFormState.holeDistance = record.holeDistance
      bottomHoleFormState.holeDepth = record.holeDepth
      bottomHoleFormState.holeAngle = record.holeAngle
      bottomHoleFormState.holeCount = record.holeCount
      currentEditId.value = record.id
      visibleEdit.value = true
    }

    const handleEditOk = () => {
      visibleEdit.value = false
    }

    const bottomHoleFormState: UnwrapRef<BottomHoleFormState> = reactive({
      blastholeType: '底板孔',
      holePosition: '',
      holeDistance: 0,
      holeDepth: 0,
      holeAngle: 0,
      holeCount: 0,
      planId: route.params.planId
    })

    const clearFormState = () => {
      bottomHoleFormState.holePosition = ''
      bottomHoleFormState.holeDistance = 0
      bottomHoleFormState.holeDepth = 0
      bottomHoleFormState.holeAngle = 0
      bottomHoleFormState.holeCount = 0
    }

    const onSubmit = async () => {
      const formData = toRaw(bottomHoleFormState)
      try {
        await postHoleTable(formData)
        handleOk()
        clearFormState()
      } catch (e) {
        console.log('底板孔失败!')
      }
    }

    const onEditSubmit = async () => {
      const formData: any = toRaw(bottomHoleFormState)
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
      store.dispatch('design/getBottomHoleTableData', route.params.planId)
    }

    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      data,
      columns,
      visible,
      showModal,
      handleOk,
      bottomHoleFormState,
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
