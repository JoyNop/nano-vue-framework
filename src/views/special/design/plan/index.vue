<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-28 14:53:33
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 10:28:41
 * @Description: file content
 * @FilePath: /blast-browser/src/views/special/design/plan/index.vue
-->

<template>
  <div class="container">
    <PageHeader
      class="demo-page-header"
      style="border: 1px solid rgb(235, 237, 240)"
      :title="state.step1?.name"
    >
      <template #extra>
        <!-- <a-button key="3">Operation</a-button>
        <a-button key="2">Operation</a-button> -->
        <a-button key="1" type="primary">导出爆破方案</a-button>
      </template>

      <div>
        <div>
          <div>
            <div class="desc-title">
              <Badge color="blue" />
              <div>工程概况</div>
            </div>
          </div>

          <div class="desc-content">
            <!-- {{ state.step1 }}
            {{ state.step2 }} -->
            <div>
              <Text type="secondary">工作面：</Text>
              <Text>{{ state.step1?.workingFace }}</Text>
            </div>
            <div>
              <Text type="secondary">里程桩号：</Text>
              <Text>{{ state.step1?.mileage }}</Text>
            </div>
            <div>
              <Text type="secondary">隧道类型及类别：</Text>
              <Text>{{ state.step1?.projectType }}/{{ state.step1?.sectionType }}</Text>
            </div>
            <div>
              <Text type="secondary">施工方向：</Text>
              <Text>{{ state.step1?.direction }}</Text>
            </div>
            <div>
              <Text type="secondary">施工工法：</Text>
              <Text>{{ state.step1?.excavationMethod1 }}/{{ state.step1?.excavationMethod2 }}</Text>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div class="desc-title">
              <Badge color="blue" />
              <div>围岩条件、炸药与爆破参数</div>
            </div>
          </div>

          <table style="width: 100%">
            <tr>
              <td class="table-header"><Badge color="black" />围岩条件</td>
              <td><span class="table-lable">围岩等级：</span>{{ state.step2?.rockLevel }}</td>

              <td><span class="table-lable">可爆性：</span>{{ state.step2?.blastability }}</td>
              <td><span class="table-lable">级别：</span>{{ state.step2?.blastabilityLevel }}</td>
            </tr>
            <tr>
              <td class="table-header"><Badge color="black" />炸药性质</td>
              <td>
                <span class="table-lable">普通药卷直径(mm)：</span>{{ state.step2?.diameter }}
              </td>
              <td>
                <span class="table-lable">光面炮孔药卷直径(mm)：</span
                >{{ state.step2?.peripheralDiameter }}
              </td>
              <td><span class="table-lable">密度(g/cm3)：</span>{{ state.step2?.density }}</td>
              <td><span class="table-lable">爆速(m/s)：</span>{{ state.step2?.velocity }}</td>
              <td><span class="table-lable">猛度(mm)：</span>{{ state.step2?.brisance }}</td>
            </tr>

            <tr>
              <td class="table-header"><Badge color="black" />爆破参数</td>
              <td>
                <span class="table-lable">循环进尺(m)：</span>{{ state.step2?.cyclicFootage }}
              </td>
              <td>
                <span class="table-lable">炮孔利用率(%)：</span>{{ state.step2?.holeUtilization }}
              </td>
              <td>
                <span class="table-lable">垂直深度(m)：</span>{{ state.step2?.verticalDepth }}
              </td>
              <td>
                <span class="table-lable">炮孔直径(mm)：</span>{{ state.step2?.holeDiameter }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </PageHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { PageHeader, Badge, Space, Descriptions, Typography } from 'ant-design-vue'
import { getStep1Detail, getStep2Detail } from '@/api/system/design/plan'
import { useRoute, useRouter } from 'vue-router'

interface State {
  step1: any
  step2: any
}
export default defineComponent({
  components: {
    PageHeader,
    Typography,
    Badge,
    Space,
    Text: Typography.Text,

    Descriptions,
    [Descriptions.Item.name]: Descriptions.Item
  },

  setup() {
    const currentRoute = useRoute()
    const router = useRouter()
    const state: State = reactive({
      step1: undefined,
      step2: undefined
    })

    watch(
      () => {
        return currentRoute.params
      },
      () => {
        console.log(67676767676, currentRoute.params)

        init(currentRoute.params.planId)
      }
    )

    const init = async (planId) => {
      if (planId) {
        const step1 = await getStep1Detail(planId)

        const step2 = await getStep2Detail(planId)
        state.step1 = step1

        state.step2 = step2
      }
    }

    onMounted(() => {
      console.log('currentRoute', currentRoute.params)

      init(currentRoute.params.planId)
    })
    return { state }
  }
})
</script>

<style lang="less" scoped>
.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}

.container {
  width: 100%;
  background-color: white;
}

.desc-title {
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: Source Han Sans CN;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  flex-wrap: nowrap;
  align-items: baseline;
}

.desc-label {
  font-family: Source Han Sans CN;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}

.desc-content {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.table-header {
  font-family: Source Han Sans CN;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.table-lable {
  font-family: Source Han Sans CN;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}
</style>
