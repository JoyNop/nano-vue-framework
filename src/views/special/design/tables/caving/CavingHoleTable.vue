<template>
  <div style="text-align: right; margin-bottom: 16px">
    <a-button type="primary" @click="showModal">合并炮孔</a-button>
  </div>
  <div v-if="toggle">
    <a-table :columns="columns" :data-source="data" bordered :row-selection="rowSelection">
      <template #action="{ record }">
        <span>
          <a-popconfirm
            title="确认删除这个崩落孔吗?"
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
  </div>

  <!-- 添加表单 -->
  <a-modal
    v-model:visible="visible"
    title="设置分组名称"
    :footer="null"
    @ok="handleOk"
    @cancel="handleOk"
  >
    <a-form :model="groupNameFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="分组名称">
        <a-input v-model:value="groupNameFormState.group" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
        <a-button type="primary" @click="onSubmit">提交</a-button>
        <a-button style="margin-left: 10px" @click="handleOk">取消</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, ref, reactive, toRaw, UnwrapRef } from 'vue'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons-vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '分组',
    dataIndex: 'holePosition',
    key: 'holePosition'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

interface DataItem {
  key: number
  name: string
  age: number
  address: string
  children?: DataItem[]
}

export default defineComponent({
  components: {
    EditTwoTone,
    DeleteTwoTone
  },
  setup() {
    const { ctx }: any = getCurrentInstance()
    const route = useRoute()

    const store = useStore()

    const data = computed(() => store.getters['design/getCarvingHoleTableData'])

    const combineHole = ref<any[]>([])

    const rowSelection = {
      onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
        combineHole.value = selectedRows
      },
      onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
        combineHole.value = selectedRows
      }
    }

    const toggle = ref(true)

    const confirm = async (record: any) => {
      await store.dispatch('design/deleteOneCarvingHoleClientTableData', record)
      toggle.value = false
      toggle.value = true
    }

    const visible = ref<boolean>(false)

    const groupNameFormState: UnwrapRef<any> = reactive({
      group: ''
    })

    const clearFormState = () => {
      groupNameFormState.group = ''
    }

    const showModal = () => {
      visible.value = true
    }

    const handleOk = () => {
      visible.value = false
    }

    const onSubmit = async () => {
      const formData = toRaw(groupNameFormState)
      try {
        // await postHoleTable(formData)
        const holeGroup: any = {}
        holeGroup.planId = route.params.planId
        holeGroup.groupName = formData.group
        holeGroup.groupArray = combineHole.value
        store.dispatch('design/combineCarvingHoleClientTableData', holeGroup)
        handleOk()
        clearFormState()
      } catch (e) {
        console.log('周边孔失败!')
      }
    }

    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      data,
      columns,
      rowSelection,
      confirm,
      visible,
      showModal,
      handleOk,
      groupNameFormState,
      onSubmit,
      toggle
    }
  }
})
</script>

<style></style>
