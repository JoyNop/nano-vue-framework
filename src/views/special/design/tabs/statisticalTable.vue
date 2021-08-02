<template>
  <!-- 切换表格按钮 -->
  <div style="padding: 16px">
    <a-radio-group v-model:value="value1">
      <a-radio-button
        v-for="table in tables"
        :key="table.value"
        :value="table.value"
        @click="setCurrentTab(table.value)"
      >
        {{ table.name }}
      </a-radio-button>
    </a-radio-group>
  </div>
  <!-- 切换表格组件 -->
  <div style="padding: 16px">
    <component :is="currentTabComponent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, ref } from 'vue'
import HoleParameterTable from './tables/HoleParameterTable.vue'
import ExploriveParameterHoleTable from './tables/ExploriveParameterHoleTable.vue'
import ForecastTable from './tables/ForecastTable.vue'

export default defineComponent({
  components: {
    HoleParameterTable,
    ExploriveParameterHoleTable,
    ForecastTable
  },
  setup() {
    const value1 = ref<string>('HoleParameterTable')

    const tableData = reactive({
      currentTab: 'HoleParameterTable',
      tables: [
        {
          name: '炮孔参数表',
          value: 'HoleParameterTable'
        },
        {
          name: '装药参数表',
          value: 'ExploriveParameterHoleTable'
        },
        {
          name: '爆破参数预测统计表',
          value: 'ForecastTable'
        }
      ]
    })

    const setCurrentTab = (tableName: string) => {
      tableData.currentTab = tableName
    }

    const currentTabComponent = computed(() => {
      return tableData.currentTab
    })

    return {
      ...toRefs(tableData),
      value1,
      setCurrentTab,
      currentTabComponent
    }
  }
})
</script>

<style></style>
