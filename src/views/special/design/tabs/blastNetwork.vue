<template>
  <div style="padding: 16px">
    <a-form :model="formState" layout="inline">
      <a-form-item label="延期间隔时间(ms)">
        <a-input-number v-model:value="formState.interval" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">更新延期间隔时间</a-button>
      </a-form-item>
    </a-form>
  </div>
  <div style="margin-bottom: 16px; text-align: right">
    <a-button type="primary" @click="onUpdateStage">更新起爆网络顺序</a-button>
  </div>
  <div>
    <a-table :columns="columns" :data-source="tableData" bordered>
      <template #action="{ record }">
        <span>
          <a-button type="link" @click="downGo(record)"
            ><template #icon><DownSquareTwoTone /> </template
          ></a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="upGo(record)"
            ><template #icon><UpSquareTwoTone /> </template
          ></a-button>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, toRaw, UnwrapRef, reactive, onMounted } from 'vue'
import { UpSquareTwoTone, DownSquareTwoTone } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'
import {
  getHoleData,
  getInterval,
  updateInterval,
  setBlastNetwork
} from '@/api/system/design/table'
import { Modal } from 'ant-design-vue'

const columns = [
  {
    title: '部位',
    dataIndex: 'holePosition',
    key: 'holePosition'
  },
  {
    title: '孔深(cm)',
    dataIndex: 'holeDepth',
    key: 'holeDepth'
  },
  {
    title: '孔长(cm)',
    dataIndex: 'holeLength',
    key: 'holeLength'
  },

  {
    title: '倾角/外插角(°)',
    dataIndex: 'holeAngle',
    key: 'holeAngle'
  },

  {
    title: '起爆顺序',
    dataIndex: 'stages',
    key: 'stages'
  },
  {
    title: '延期时间(ms)',
    dataIndex: 'delay',
    key: 'delay'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

interface FormState {
  interval: number
}

export default defineComponent({
  components: {
    UpSquareTwoTone,
    DownSquareTwoTone,
    Modal
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      interval: 0
    })

    const tableData = ref<any[]>([])

    const route = useRoute()

    const onSubmit = async () => {
      try {
        await updateInterval(route.params.planId, toRaw(formState).interval)
        Modal.success({
          title: '成功！',
          content: '间隔时间更新成功！'
        })
      } catch (error) {}
    }
    const onUpdateStage = async () => {
      try {
        const tableDataValue = tableData.value.map((item) => ({
          id: item.id,

          stages: item.stages,
          delay: item.delay
        }))
        await setBlastNetwork(route.params.planId, tableDataValue)
        Modal.success({
          title: '成功！',
          content: '起爆网络更新成功！'
        })
      } catch (error) {}
    }

    onMounted(async () => {
      const planId = route.params.planId
      const res1 = await getInterval(planId)
      const res2 = await getHoleData(planId)
      formState.interval = res1

      const res3 = res2.map((item) => ({
        key: item.id,
        id: item.id,
        holePosition: item.holePosition,
        holeDepth: item.holeDepth,
        holeLength: item.holeLength,
        holeAngle: item.holeAngle,
        stages: item.stages,
        delay: item.delay
      }))
      tableData.value = res3
    })

    const upGo = (record) => {
      const fieldData = tableData.value
      const index = tableData.value.findIndex((item) => item.id === record.id)
      if (index != 0) {
        fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0]
      } else {
        fieldData.push(fieldData.shift())
      }
    }

    const downGo = (record) => {
      const fieldData = tableData.value
      const index = tableData.value.findIndex((item) => item.id === record.id)
      if (index != fieldData.length - 1) {
        fieldData[index] = fieldData.splice(index + 1, 1, fieldData[index])[0]
      } else {
        fieldData.unshift(fieldData.splice(index, 1)[0])
      }
    }

    return {
      tableData,
      columns,
      formState,
      onSubmit,
      onUpdateStage,
      upGo,
      downGo
    }
  }
})
</script>

<style></style>
