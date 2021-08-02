<template>
  <div style="padding: 16px">
    <div>单位体积岩体炸药消耗量:</div>
    <a-form :model="formState" layout="inline">
      <a-form-item label="掏槽眼(kg/m³)" style="margin: 8px">
        <a-input-number v-model:value="formState.cutHole" />
      </a-form-item>
      <a-form-item label="扩槽眼(kg/m³)" style="margin: 8px">
        <a-input-number v-model:value="formState.spreaderHole" />
      </a-form-item>
      <a-form-item label="崩落眼(kg/m³)" style="margin: 8px">
        <a-input-number v-model:value="formState.cavingHole" />
      </a-form-item>
      <a-form-item label="周边眼(kg/m³)" style="margin: 8px">
        <a-input-number v-model:value="formState.borderHole" />
      </a-form-item>
      <a-form-item label="底板眼(kg/m³)" style="margin: 8px">
        <a-input-number v-model:value="formState.bottomHole" />
      </a-form-item>
      <a-form-item label="单个药卷质量(kg)" style="margin: 8px">
        <a-input-number v-model:value="formState.singleExplosiveMass" />
      </a-form-item>
      <a-form-item label="实际单个药卷取整质量(kg)" style="margin: 8px">
        <a-input-number v-model:value="formState.singleExplosiveDivisor" />
      </a-form-item>
      <a-form-item label="单个周边孔药卷质量(kg)" style="margin: 8px">
        <a-input-number v-model:value="formState.borderExplosiveMass" />
      </a-form-item>
      <a-form-item label="实际单个周边孔药卷取整质量(kg)" style="margin: 8px">
        <a-input-number v-model:value="formState.borderExplosiveDivisor" />
      </a-form-item>
      <a-form-item style="margin: 8px">
        <a-button type="primary" @click="onSubmit">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
  <div>
    <a-table :columns="columns" :data-source="tableData" bordered />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw, UnwrapRef, reactive, onMounted, ref } from 'vue'
import { EditTwoTone } from '@ant-design/icons-vue'
import { setEonsumption, getEonsumption, getHoleData } from '@/api/system/design/table'
import { Modal } from 'ant-design-vue'
import { useRoute } from 'vue-router'

const columns = [
  {
    title: '部位',
    dataIndex: 'holePosition',
    key: 'holePosition'
  },
  {
    title: '孔数',
    dataIndex: 'holeCount',
    key: 'holeCount'
  },

  {
    title: '爆破体积(m³)',
    dataIndex: 'blastVolume',
    key: 'blastVolume'
  },

  {
    title: '炸药单耗(kg/m³)',
    dataIndex: 'blastUnitConsumption',
    key: 'blastUnitConsumption'
  },
  {
    title: '计算单孔装药量(kg)',
    dataIndex: 'blastWeight',
    key: 'blastWeight'
  },
  {
    title: '实际单孔装药量(kg)',
    dataIndex: 'aboutBlastWeight',
    key: 'aboutBlastWeight'
  },
  {
    title: '装药量小计(kg)',
    dataIndex: 'totalBlastWeight',
    key: 'totalBlastWeight'
  },
  {
    title: '药卷数(kg)',
    dataIndex: 'explosiveCount',
    key: 'explosiveCount'
  }
]

interface FormState {
  name: string
}

export default defineComponent({
  components: {
    EditTwoTone,
    Modal
  },
  setup() {
    const route = useRoute()
    const tableData = ref<any>([])
    const formState: UnwrapRef<any> = reactive({
      cutHole: 0,
      spreaderHole: 0,
      cavingHole: 0,
      borderHole: 0,
      bottomHole: 0,
      singleExplosiveMass: 0,
      singleExplosiveDivisor: 0,
      borderExplosiveMass: 0,
      borderExplosiveDivisor: 0
    })

    const onSubmit = async () => {
      try {
        const formStateData = toRaw(formState)
        formStateData.planId = +route.params.planId
        await setEonsumption(formStateData)
        Modal.success({
          title: '成功！',
          content: '装药量及装药结构更新成功！'
        })
      } catch (error) {}
    }

    onMounted(async () => {
      const planId = route.params.planId
      const res: any = await getEonsumption(planId)

      if (res !== null) {
        formState.cutHole = res.cutHole
        formState.spreaderHole = res.spreaderHole
        formState.cavingHole = res.cavingHole
        formState.borderHole = res.borderHole
        formState.bottomHole = res.bottomHole
        formState.singleExplosiveMass = res.formSsingleExplosiveMasstate
        formState.singleExplosiveDivisor = res.singleExplosiveDivisor
        formState.borderExplosiveMass = res.borderExplosiveMass
        formState.borderExplosiveDivisor = res.borderExplosiveDivisor
      }

      const res2 = await getHoleData(planId)

      const res3 = res2.map((item) => ({
        key: item.id,
        id: item.id,
        holePosition: item.holePosition,
        holeCount: item.holeCount,
        blastVolume: item.blastVolume,
        blastUnitConsumption: item.blastUnitConsumption,
        blastWeight: item.blastWeight,
        aboutBlastWeight: item.aboutBlastWeight,
        totalBlastWeight: item.totalBlastWeight,
        explosiveCount: item.explosiveCount
      }))

      tableData.value = res3
    })

    return {
      tableData,
      columns,
      formState,
      onSubmit
    }
  }
})
</script>

<style></style>
