<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-22 18:17:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-28 14:54:37
 * @Description: file content
 * @FilePath: /blast-browser/src/views/special/design/design.vue
-->
<template>
  <!-- 图 -->
  <PlanDetail />
  <div>
    <div class="designCard">
      <div class="blueBlock"></div>
      <a-collapse v-model:activeKey="activeKey" :bordered="false" expand-icon-position="right">
        <a-collapse-panel key="1" header="图形展示" :style="customStyle">
          <Draw />
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>

  <div class="designCard">
    <a-tabs v-model:activeKey="activeTabsKey">
      <a-tab-pane key="1" tab="炮孔布置">
        <hole-deploy :key="Math.random()" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="起爆网络">
        <blast-network :key="Math.random()" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="装药量及装药结构">
        <quantity-structure :key="Math.random()" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="统计表">
        <statistical-table :key="Math.random()" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import holeDeploy from './tabs/holeDeploy.vue'
import blastNetwork from './tabs/blastNetwork.vue'
import quantityStructure from './tabs/quantityStructure.vue'
import statisticalTable from './tabs/statisticalTable.vue'
import PlanDetail from './plan/index.vue'
import Draw from './draw/draw.vue'

export default defineComponent({
  components: { Draw, holeDeploy, blastNetwork, quantityStructure, statisticalTable, PlanDetail },
  setup() {
    const activeKey = ref(['1'])
    const activeTabsKey = ref('1')
    const customStyle = 'background: #fff;border: 0;overflow: hidden'
    return {
      activeKey,
      customStyle,
      activeTabsKey
    }
  }
})
</script>

<style lang="less">
.designCard {
  position: relative;
  padding: 8px;
  margin: 16px;
  background: #fff;
  border-radius: 2px;

  .blueBlock {
    position: absolute;
    top: 22px;
    left: 0;
    z-index: 2000;
    width: 4px;
    height: 18px;
    background-color: #1890ff;
    border-radius: 2px;
  }
}
</style>
