<template>
  <div>
    <a-table :columns="hole_columns" :data-source="data" bordered size="middle" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const hole_columns = [
  {
    title: '炮孔编号',
    dataIndex: 'hole_depth',
    key: 'hole_depth'
  },
  {
    title: '部位',
    dataIndex: 'hole_length',
    key: 'hole_length'
  },

  {
    title: 'x(cm)',
    dataIndex: 'angle',
    key: 'angle'
  },

  {
    title: 'y(cm)',
    dataIndex: 'stages',
    key: 'stages'
  },
  {
    title: '孔径(mm)',
    dataIndex: 'delay',
    key: 'delay'
  },
  {
    title: '孔深(mm)',
    dataIndex: 'delay',
    key: 'delay'
  },
  {
    title: '孔长(mm)',
    dataIndex: 'delay',
    key: 'delay'
  },
  {
    title: '与工作面夹角/外插角(°)',
    dataIndex: 'delay',
    key: 'delay'
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
      hole_columns
    }
  }
})
</script>

<style></style>
