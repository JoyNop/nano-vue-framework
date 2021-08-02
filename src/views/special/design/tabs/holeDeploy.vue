<template>
  <div>
    <div v-if="hasCurrentTemplate === null" class="holeDeploy">
      <a-card
        v-for="template in templateArray"
        :key="template.id"
        hoverable
        style="width: 240px"
        title="模板一"
        :headStyle="{ fontWeight: 'bold', fontSize: '16px' }"
      >
        <template #cover>
          <img alt="example" src="" />
          <!-- <img alt="example" :src="template.image" /> -->
        </template>
        <a-card-meta title="" :description="template.description" />
        <template #actions class="ant-card-actions">
          <a-button key="setting" type="text">预览</a-button>
          <a-button key="edit" type="link" @click="setCurrentTemplate(template)">应用</a-button>
        </template>
      </a-card>
    </div>

    <div v-if="hasCurrentTemplate !== null">
      <!-- 下载上传模板 -->
      <div class="holeParameter">
        <div class="holeParameterDescription">
          <span class="holeParameterDescriptionTitle">炮孔布置参数</span>
          <span class="holeParameterDescriptionSubtitle"
            >（说明：此功能为参数化建模，下载模板后上传数据，可在此基础上进行修改。）</span
          >
        </div>
        <div class="holeParameterAction">
          <a-button type="primary" style="margin-right: 8px" @click="downloadTemplate">
            下载模板
          </a-button>
          <input type="file" @change="uploadTemplate" />
        </div>
      </div>

      <!-- 切换表格按钮 -->
      <div style="padding: 16px">
        <a-radio-group v-model:value="value1">
          <a-radio-button
            v-for="table in tables"
            :key="table.value"
            :value="table.value"
            @click="setCurrentTab(table.value)"
          >
            <color-rect :color="table.color" />
            {{ table.name }}
          </a-radio-button>
        </a-radio-group>
      </div>
      <!-- 切换表格组件 -->
      <div style="padding: 16px">
        <component :is="currentTabComponent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, reactive, toRefs, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import { uploadHoleTemplate } from '@/api/system/design/table'

import CutHoleTable from '../tables/CutHoleTable.vue'
import SpreaderHoleTable from '../tables/SpreaderHoleTable.vue'
import BorderHoleTable from '../tables/BorderHoleTable.vue'
import PaddingHoleTable from '../tables/PaddingHoleTable.vue'
import BottomHoleTable from '../tables/BottomHoleTable.vue'
import CavingHoleTable from '../tables/caving/CavingHoleTable.vue'

import ColorRect from './component/colorRect.vue'

interface TemplateData {
  blastHoleTypes: string
  createDate: string
  cutPattern: string
  description: string
  excavationPattern: string
  id: number
  image: string
  shape: string
  templateFile: string
}
export default defineComponent({
  components: {
    CutHoleTable,
    SpreaderHoleTable,
    BorderHoleTable,
    PaddingHoleTable,
    BottomHoleTable,
    CavingHoleTable,
    ColorRect
  },
  setup() {
    const value1 = ref<string>('CutHoleTable')

    const tableData = reactive({
      currentTab: 'CutHoleTable',
      tables: [
        {
          name: '掏槽孔',
          value: 'CutHoleTable',
          color: '#FF0033'
        },
        {
          name: '扩槽孔',
          value: 'SpreaderHoleTable',
          color: '#CC00FF'
        },
        {
          name: '周边孔',
          value: 'BorderHoleTable',
          color: '#3300FF'
        },
        {
          name: '内圈孔',
          value: 'PaddingHoleTable',
          color: '#00FF00'
        },
        {
          name: '底板孔',
          value: 'BottomHoleTable',
          color: '#CCAE33'
        },
        {
          name: '崩落孔',
          value: 'CavingHoleTable',
          color: '#baaacb'
        }
      ]
    })

    const store = useStore()

    const route = useRoute()

    const templateArray = computed(() => store.getters['design/getTemplates'])

    // 当前模板
    const hasCurrentTemplate = computed(() => store.getters['design/getCurrentTemplate'])

    const setCurrentTab = (tableName: string) => {
      tableData.currentTab = tableName
    }

    const currentTabComponent = computed(() => {
      return tableData.currentTab
    })

    const setCurrentTemplate = async (currentTemplate: any) => {
      const ids: any = {}
      ids.planId = route.params.planId
      ids.holeTemplateId = currentTemplate.id
      await store.dispatch('design/setCurrentTemplate', ids)
      getHasHoleTemplateData()
    }

    onMounted(() => {
      getHasHoleTemplateData()
      getAllHoleTemplateData()
    })

    const getHasHoleTemplateData = async () => {
      store.dispatch('design/getCurrentTemplateInfo', route.params.planId)
    }

    const getAllHoleTemplateData = async () => {
      store.dispatch('design/getTemplateInfo', route.params.planId)
    }

    const downloadTemplate = () => {
      var link = document.createElement('a')
      link.download = `${hasCurrentTemplate.value.shape}-炮孔模板`
      link.href = hasCurrentTemplate.value.templateFile
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const uploadTemplate = async (e: any) => {
      const file = e.target.files
      if (file !== null) {
        const data = new FormData()
        data.append('file', file[0])
        await uploadHoleTemplate(route.params.planId, hasCurrentTemplate.value.id, data)
        e.target.value = null
      }
    }
    return {
      ...toRefs(tableData),
      value1,
      setCurrentTemplate,
      setCurrentTab,
      currentTabComponent,
      templateArray,
      hasCurrentTemplate,
      downloadTemplate,
      uploadTemplate
    }
  }
})
</script>

<style lang="less">
.holeDeploy {
  padding: 16px;
}

.holeParameter {
  display: flex;
  height: 64px;
  padding: 16px;
  margin: 16px;
  background: rgba(0, 195, 255, 0.212);
  border-radius: 5px;
  justify-content: space-between;

  .holeParameterDescription {
    line-height: 36px;

    .holeParameterDescriptionTitle {
      font-family: Source Han Sans CN;
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }

    .holeParameterDescriptionSubtitle {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
