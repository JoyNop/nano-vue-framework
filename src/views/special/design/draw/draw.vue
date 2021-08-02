<template>
  <div class="canvas">
    <div class="threedButton">
      <a-button
        v-if="currentGraphics === 'TwoD'"
        type="primary"
        shape="circle"
        @click="setCurrentGraphics('ThreeD')"
      >
        3D
      </a-button>
      <a-button
        v-if="currentGraphics === 'ThreeD'"
        type="primary"
        shape="circle"
        @click="setCurrentGraphics('TwoD')"
      >
        2D
      </a-button>
    </div>

    <div v-if="currentGraphics === 'TwoD'" class="mutationInfo">
      <p>
        <span class="mutationInfoLabel">当前为:</span> <span>{{ computeInfo }}</span>
      </p>
    </div>

    <div class="mutationButton">
      <div class="mutationButtonGroup">
        <a-button type="primary" shape="circle" @click="setCarvingHoleMutation('Add')">
          <template #icon><PlusOutlined /></template>
        </a-button>

        <a-button type="primary" shape="circle" @click="setCarvingHoleMutation('Delete')">
          <template #icon><DeleteOutlined /></template>
        </a-button>

        <a-button type="primary" shape="circle" @click="setCarvingHoleMutation('Done')">
          <template #icon><CheckOutlined /></template>
        </a-button>
      </div>
    </div>

    <div v-if="currentGraphics === 'TwoD'" class="tool" style="display: none">
      <div class="toolTitle">
        <a-badge status="processing" text="钻眼台架形状" />
      </div>
      <div class="toolButton">
        <a-button type="link"
          ><template #icon><UpSquareTwoTone /></template>
        </a-button>
        <a-divider type="vertical" />
        <a-button type="link"
          ><template #icon><DownSquareTwoTone /></template>
        </a-button>
      </div>
      <div class="toolDivider"></div>
      <div class="toolSwitch">
        <a-switch v-model:checked="checked1" checked-children="显示" un-checked-children="关闭" />
      </div>
    </div>

    <div style="padding: 16px">
      <!-- <keep-alive> -->
      <component :is="currentGraphicsComponent" />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, computed, provide } from 'vue'
import { EditTwoTone } from '@ant-design/icons-vue'
import {
  UpSquareTwoTone,
  DownSquareTwoTone,
  PlusOutlined,
  DeleteOutlined,
  CheckOutlined
} from '@ant-design/icons-vue'
import ThreeD from './threed/threed.vue'
import TwoD from './twod/twod.vue'

export default defineComponent({
  components: {
    EditTwoTone,
    UpSquareTwoTone,
    DownSquareTwoTone,
    PlusOutlined,
    DeleteOutlined,
    CheckOutlined,
    ThreeD,
    TwoD
  },
  setup() {
    const checked1 = ref(true)

    const switchGraphics = reactive({
      currentGraphics: 'TwoD'
    })

    const setCurrentGraphics = (GraphicsName: string) => {
      switchGraphics.currentGraphics = GraphicsName
    }

    const currentGraphicsComponent = computed(() => {
      return switchGraphics.currentGraphics
    })

    // 切换崩落孔模式
    const switchCarvingHoleMutation = ref<string>('Done')

    // 提供操作信息
    provide('switchCarvingHoleMutation', switchCarvingHoleMutation)

    const computeInfo = computed(() => {
      switch (switchCarvingHoleMutation.value) {
        case 'Add':
          return '添加崩落孔模式'
        case 'Delete':
          return '删除崩落孔模式'
        case 'Done':
          return '预览崩落孔模式'
        default:
          return ''
      }
    })

    const setCarvingHoleMutation = (mutationName: string) => {
      switchCarvingHoleMutation.value = mutationName
    }

    return {
      computeInfo,
      ...toRefs(switchGraphics),
      setCurrentGraphics,
      setCarvingHoleMutation,
      currentGraphicsComponent,
      checked1
    }
  }
})
</script>

<style lang="less">
.canvas {
  /* width: 1672px; */

  /* height: 688px; */
  position: relative;

  .threedButton {
    position: absolute;
    right: 0;
  }

  .mutationInfo {
    position: absolute;
    top: 50px;
    right: 0;

    .mutationInfoLabel {
      font-weight: bold;
    }
  }

  .mutationButton {
    position: absolute;
    top: 90px;
    right: 0;

    .mutationButtonGroup {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      button {
        margin-bottom: 8px;
      }
    }
  }

  .tool {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 140px;
    height: 162px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;

    .toolTitle {
      height: 39px;
      padding: 8px;
      background: #f7f7f7;
      border-radius: 5px 5px 0 0;
    }

    .toolButton {
      display: flex;
      padding: 16px;
      justify-content: space-around;
    }

    .toolDivider {
      width: 120px;
      height: 1px;
      margin-left: 10px;
      background: #ccc;
    }

    .toolSwitch {
      padding: 16px;
    }
  }
}
</style>
