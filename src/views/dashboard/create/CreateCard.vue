<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-16 09:59:17
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-28 17:50:50
 * @Description: file content
 * @FilePath: /blast-browser/src/views/dashboard/create/CreateCard.vue
-->
<template>
  <div v-show="createType === 'Folder'" class="container">
    <div class="create-container">
      <PlusOutlined style="color: #1890ff; font-size: 70px" />
      <div>新建文件夹</div>
    </div>
  </div>

  <div v-show="createType === 'newScheme'" class="container">
    <div class="create-container">
      <PlusOutlined style="color: #1890ff; font-size: 70px" />
      <div>新建方案</div>
    </div>
  </div>
  <div v-show="createType === 'schemeLib' || createType === 'oldScheme'" class="container">
    <Image
      :width="180"
      :height="120"
      :src="img"
      fallback="data:image/png;base64,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"
    />
    <Divider style="margin-top: 15px; margin-bottom: 15px" />
    <div class="buttton">
      <div class="button-title">{{ planName }}</div>
      <div class="button-container">
        <a-button>预览</a-button>
        <a-button type="primary" @click="handleOpen">应用</a-button>
      </div>
    </div>

    <a-modal v-model:visible="visible" title="确认提交" @ok="handleOk">
      {{ submitData.id }}
      <div><span>项目名称 :</span><a-input v-model:value="submitData.name" /></div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, UnwrapRef } from 'vue'
import { Image, Divider, message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { checkPlanName, copyPlan } from '@/api/system/scheme'

interface State {
  submitData: {
    name: string
    id: number
  }
}
export default defineComponent({
  name: 'CreateCard',
  components: { Image, Divider, PlusOutlined },
  props: {
    img: {
      type: String,
      default: 'http://pic1.win4000.com/wallpaper/4/54191b5fdad8d.jpg'
    },
    planName: {
      type: String,
      default: '方案名称'
    },
    planId: {
      type: Number,
      default: -1
    },
    createType: {
      type: String as PropType<'Folder' | 'newScheme' | 'oldScheme' | 'schemeLib'>
    }
  },
  setup(props) {
    const submitData: UnwrapRef<any> = reactive({
      name: '',
      id: props.planId
    })
    const visible = ref<boolean>(false)

    const handleOpen = () => {
      submitData.name = ''

      visible.value = true
    }
    const handleOk = async (e: MouseEvent) => {
      try {
        if (submitData.name !== '' && submitData.id !== -1) {
          await checkPlanName(submitData.name)
          await copyPlan(submitData)
          message.success('复制成功！')
          visible.value = false
        } else {
          message.warn('数据填写不完整')
        }
      } catch (error) {}
      // console.log(check)
    }
    return { visible, submitData, handleOk, handleOpen }
  }
})
</script>

<style lang="less" scoped>
.create-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.buttton {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
}
.container {
  width: 200px;
  height: 240px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px;
}

.button-title {
  //   padding-top: 5px;
  //   padding-bottom: 5px;
  //
}
.button-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
