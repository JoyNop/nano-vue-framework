<template>
  <div>
    <a-table :columns="explosive_columns" :data-source="data" bordered size="middle" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const explosive_columns = [
  {
    title: '炮孔名称',
    dataIndex: 'hole_depth',
    key: 'hole_depth'
  },
  {
    title: '炮孔数(个)',
    dataIndex: 'hole_length',
    key: 'hole_length'
  },

  {
    title: '起爆顺序',
    dataIndex: 'angle',
    key: 'angle'
  },

  {
    title: '延期时间(ms)',
    dataIndex: 'stages',
    key: 'stages'
  },
  {
    title: '药卷直径(mm)',
    dataIndex: 'delay',
    key: 'delay'
  },
  {
    title: '单孔装药量(kg)',
    dataIndex: 'delay',
    key: 'delay'
  },
  {
    title: '装药量小计(kg)',
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
      explosive_columns
    }
  }
})
</script>

<style></style>
