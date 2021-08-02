<template>
  <div>
    <a-table :columns="forecast_columns" :data-source="data" bordered size="middle" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw, UnwrapRef, reactive } from 'vue'

const forecast_columns = [
  {
    title: '序号',
    dataIndex: 'hole_depth',
    key: 'hole_depth'
  },
  {
    title: '项目',
    dataIndex: 'hole_length',
    key: 'hole_length'
  },

  {
    title: '单位',
    dataIndex: 'angle',
    key: 'angle'
  },

  {
    title: '数量',
    dataIndex: 'stages',
    key: 'stages'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

export default defineComponent({
  setup() {
    return {
      data,
      forecast_columns
    }
  }
})
</script>

<style></style>
