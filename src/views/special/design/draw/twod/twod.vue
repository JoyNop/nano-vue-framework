<template>
  <div class="pixiWrapper">
    <div ref="pixiRef"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
  reactive,
  computed,
  inject
} from 'vue'
import * as PIXI from 'pixi.js'
import { useRoute } from 'vue-router'
import { getOutline } from '@/api/system/design/draw'
import { useStore } from '@/store'

export function toDigital(strDu: number, strFen: number, strMiao: number) {
  return Number((strDu + strFen / 60 + strMiao / 3600).toFixed(6))
}

export const rad = (angle: number): number => {
  return (angle / 180) * Math.PI
}

const radio = 3

// 画图坐标转换
export const calculateDrawData = (drawObject) => {
  return {
    r: drawObject.radius / radio,
    start: drawObject.startTheta,
    end: drawObject.endTheta,
    x: drawObject.x / radio,
    y: drawObject.y / radio
  }
}

export const calculateHoleData = (holeData) => {
  return {
    x: holeData.x / radio,
    y: holeData.y / radio
  }
}

export default defineComponent({
  setup(props, ctx) {
    const route = useRoute()

    const store = useStore()

    const pixiRef = ref<any>(null)

    // 注入操作信息
    const switchCarvingHoleMutation = inject<any>('switchCarvingHoleMutation')

    // Pixi
    let app: PIXI.Application

    // Pixi 根容器
    let rootContainer: PIXI.Container

    // Pixi 轮廓线容器
    let outlineContainer: PIXI.Container

    // Pixi 掏槽孔容器
    let cutHoleContainer: PIXI.Container

    // Pixi 扩槽孔容器
    let spreaderHoleContainer: PIXI.Container

    // Pixi 周边孔容器
    let borderHoleContainer: PIXI.Container

    // Pixi 底板孔容器
    let bottomHoleContainer: PIXI.Container

    // Pixi 内圈孔容器
    let paddingHoleContainer: PIXI.Container

    // Pixi 崩落孔容器
    let cavingHoleContainer: PIXI.Container

    // 掏槽孔数据
    const cutHoleTableData = computed(() => store.getters['design/getCutHoleTableData'])

    // 画掏槽孔
    watch(
      cutHoleTableData,
      (state, prevState) => {
        drawHoles(cutHoleContainer, state, 0xff0033)
      },
      {
        deep: true
      }
    )

    // 扩槽孔数据
    const spreaderHoleTableData = computed(() => store.getters['design/getSpreaderHoleTableData'])

    // 画扩槽孔
    watch(
      spreaderHoleTableData,
      (state, prevState) => {
        drawHoles(spreaderHoleContainer, state, 0xcc00ff)
      },
      {
        deep: true
      }
    )

    // 周边孔数据
    const borderHoleTableData = computed(() => store.getters['design/getBorderHoleTableData'])

    // 画周边孔
    watch(
      borderHoleTableData,
      (state, prevState) => {
        drawHoles(borderHoleContainer, state, 0x3300ff)
      },
      {
        deep: true
      }
    )

    // 底板孔数据
    const bottomHoleTableData = computed(() => store.getters['design/getBottomHoleTableData'])

    // 画底板孔
    watch(
      bottomHoleTableData,
      (state, prevState) => {
        drawHoles(bottomHoleContainer, state, 0xccae33)
      },
      {
        deep: true
      }
    )

    // 内圈孔数据
    const paddingHoleTableData = computed(() => store.getters['design/getPaddingHoleTableData'])

    // 画内圈孔
    watch(
      paddingHoleTableData,
      (state, prevState) => {
        drawHoles(paddingHoleContainer, state, 0x00ff00)
      },
      {
        deep: true
      }
    )

    // 客户端崩落孔数据
    const clientSideCarvingHoleData = computed(
      () => store.getters['design/getCarvingHoleTableData']
    )

    // 画客户端崩落孔
    watch(
      clientSideCarvingHoleData,
      (state, prevState) => {
        drawCarvingHoles(cavingHoleContainer, state)
      },
      {
        deep: true
      }
    )

    onMounted(async () => {
      console.log('8888')
      // 获取孔的数据
      store.dispatch('design/getHoleExceptCarvingTableData', route.params.planId)
      store.dispatch('design/getCarvingHoleTableData', route.params.planId)

      // 画布大小
      const canvasWidth = 800
      const canvasHeight = 800

      // 初始化
      const canvas = pixiRef.value

      app = new PIXI.Application({
        width: canvasWidth,
        height: canvasHeight,
        transparent: true,
        antialias: true,
        resolution: 1
      })

      // 原点
      const Ox = canvasWidth / 2
      const Oy = canvasHeight / 2

      app.stage.interactive = true

      canvas.appendChild(app.view)

      app.start()

      // 获取后端轮廓线数据
      const { computedParam } = await getOutline(+route.params.planId)

      // 根容器
      rootContainer = new PIXI.Container()
      app.stage.addChild(rootContainer)

      rootContainer.setTransform(Ox, Oy, 0, -1)

      // 初始化子容器

      // 轮廓线容器
      outlineContainer = new PIXI.Container()
      rootContainer.addChild(outlineContainer)

      // 掏槽孔容器
      cutHoleContainer = new PIXI.Container()
      rootContainer.addChild(cutHoleContainer)
      cutHoleContainer.setTransform(0, 0, 0, 0)

      // 扩槽孔容器
      spreaderHoleContainer = new PIXI.Container()
      rootContainer.addChild(spreaderHoleContainer)
      spreaderHoleContainer.setTransform(0, 0, 0, 0)

      // 周边孔容器
      borderHoleContainer = new PIXI.Container()
      rootContainer.addChild(borderHoleContainer)
      borderHoleContainer.setTransform(0, 0, 0, 0)

      // 底板孔容器
      bottomHoleContainer = new PIXI.Container()
      rootContainer.addChild(bottomHoleContainer)
      bottomHoleContainer.setTransform(0, 0, 0, 0)

      // 内圈孔容器
      paddingHoleContainer = new PIXI.Container()
      rootContainer.addChild(paddingHoleContainer)
      paddingHoleContainer.setTransform(0, 0, 0, 0)

      // 崩落孔容器
      cavingHoleContainer = new PIXI.Container()
      rootContainer.addChild(cavingHoleContainer)
      cavingHoleContainer.setTransform(0, 0, 0, 0)

      // 检查是否有崩落孔
      function hasCarvingHole(holeData) {
        return holeData.value.length > 0 ? true : false
      }

      // 初始化崩落孔
      if (hasCarvingHole(clientSideCarvingHoleData)) {
        drawCarvingHoles(cavingHoleContainer, clientSideCarvingHoleData.value)
      }

      // 画轮廓线
      // 顶
      const top = calculateDrawData(computedParam.upArc)
      const arcTop = new PIXI.Graphics()
      arcTop.lineStyle(1, 0x000000, 1)
      arcTop.arc(top.x, top.y, top.r, top.start, top.end, true)
      outlineContainer.addChild(arcTop)

      // 左拱腰
      const left = calculateDrawData(computedParam.leftArc)
      const arcLeft = new PIXI.Graphics()
      arcLeft.lineStyle(1, 0x000000, 1)
      arcLeft.arc(left.x, left.y, left.r, left.start, left.end, true)
      outlineContainer.addChild(arcLeft)

      // 右拱腰
      const right = calculateDrawData(computedParam.rightArc)
      const arcRight = new PIXI.Graphics()
      arcRight.lineStyle(1, 0x000000, 1)
      arcRight.arc(right.x, right.y, right.r, right.start, right.end, true)
      outlineContainer.addChild(arcRight)

      // 拱底
      const bottom = calculateDrawData(computedParam.downArc)
      const arcBottom = new PIXI.Graphics()
      arcBottom.lineStyle(1, 0x000000, 1)
      arcBottom.arc(bottom.x, bottom.y, bottom.r, bottom.start, bottom.end)
      outlineContainer.addChild(arcBottom)

      // 轮廓线函数 后端更改算法后使用
      // function drawOutline(outline) {
      //   const arc = new PIXI.Graphics()
      //   arc.lineStyle(1, 0xba00cb, 1)
      //   arc.arc(outline.x, outline.y, outline.r, outline.start, outline.end)
      //   outlineContainer.addChild(arc)
      // }
      // drawOutline(calculateDrawData(computedParam.upArc))
      // drawOutline(calculateDrawData(computedParam.leftArc))
      // drawOutline(calculateDrawData(computedParam.rightArc))
      // drawOutline(calculateDrawData(computedParam.downArc))

      // 画炮孔
      const drawHole = (e) => {
        // 判断鼠标左键
        const clickButton = e.data.originalEvent.button
        if (clickButton === 0) {
          const { x, y } = e.data.global
          // 计算坐标
          const calX = x - 400
          const calY = 400 - y

          // 添加崩落孔
          const lastValue =
            clientSideCarvingHoleData.value[clientSideCarvingHoleData.value.length - 1]

          store.dispatch('design/addOneCarvingHoleClientTableData', {
            name: lastValue ? Number(lastValue.name) + 1 : 1,
            holePosition: '',
            key: calX * calY * Math.random(),
            x: calX,
            y: calY,
            is: 'client'
          })
        }
      }

      // 删炮孔
      const deleteHole = (e) => {
        // 判断鼠标左键
        const clickButton = e.data.originalEvent.button
        if (clickButton === 0) {
          const { x, y } = e.data.global

          // 计算坐标
          const pointObj = {
            x: x - 400,
            y: 400 - y
          }

          // 勾股定理
          const distance = (pos1: any, pos2: any) => {
            return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))
          }

          // 寻找附近的点
          const adsorption = (endpoint: any) => {
            for (const iterator of clientSideCarvingHoleData.value) {
              if (distance(endpoint, iterator) <= 10) {
                return iterator
              }
            }
          }

          // 附近的点
          const point = adsorption(pointObj)

          point.planId = +route.params.planId

          if (point !== undefined) {
            store.dispatch('design/deleteOneCarvingHoleClientTableData', point)
          } else {
            alert('没有找到这个崩落孔！')
          }
        }
      }

      // 监听事件
      const addOrDeleteOrDone = (e) => {
        if (switchCarvingHoleMutation.value === 'Add') {
          drawHole(e)
        } else if (switchCarvingHoleMutation.value === 'Delete') {
          deleteHole(e)
        } else if (switchCarvingHoleMutation.value === 'Done') {
          app.renderer.plugins.interaction.on('pointerdown', () => {})
        }
      }

      app.renderer.plugins.interaction.on('pointerdown', addOrDeleteOrDone)
    })

    onUnmounted(() => {
      app.stop()
    })

    // 画单个孔
    const drawSingleHole = (container: PIXI.Container, holeData, color) => {
      const hole = new PIXI.Graphics()
      hole.lineStyle(1, color, 1)
      hole.arc(holeData.x, holeData.y, 4, 0, Math.PI * 2)
      container.addChild(hole)
    }

    // 画崩落孔文字
    const drawText = (container: PIXI.Container, holeData) => {
      const style = new PIXI.TextStyle({
        fontSize: 10
      })
      const basicText = new PIXI.Text(String(holeData.name), style)
      basicText.x = holeData.x - 2
      basicText.y = holeData.y + 2
      basicText.setTransform(holeData.x + 5, holeData.y + 5, 0, -1)
      container.addChild(basicText)
    }

    // 画崩落孔函数
    const drawCarvingHoles = (container: PIXI.Container, carvingHoleData) => {
      if (container) {
        // 清空所有崩落孔
        container.removeChildren()
        // 添加崩落孔
        carvingHoleData.forEach((holeData) => {
          // 画崩落孔
          drawSingleHole(container, holeData, 0xbaaacb)
          // 画崩落文字
          drawText(container, holeData)
        })
      }
    }

    // 画除了掏槽孔的孔
    const drawHoles = (container: PIXI.Container, HoleDatas, color) => {
      if (container) {
        // 清空孔
        container.removeChildren()
        // 添加孔
        HoleDatas.forEach((holeDataItem) => {
          holeDataItem.children.forEach((holeData) => {
            drawSingleHole(container, calculateHoleData(holeData), color)
          })
        })
      }
    }

    return { pixiRef }
  }
})
</script>

<style>
.pixiWrapper {
  display: flex;
  justify-content: center;
}
</style>
