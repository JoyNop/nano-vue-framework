<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-09 10:09:16
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-08-02 16:41:50
 * @Description: file content
 * @FilePath: /blast-web/src/views/dashboard/welcome/index.vue
-->
<template>
  <div class="box">
    <div class="create-container">
      <div class="create-tool">
        <div class="craete-title">请在右侧选择项目</div>

        <!--   <div class="create-item" style="background-color: #e7f4ff">
          <div class="create-item-img">
            <svg-icon iconClass="create_folder" className="icon-class" />
          </div>
          <a-button
            type="link"
            block
            style="color: white; background-color: #1890ff"
            @click="$router.push('/dashboard/create')"
            >创建文件夹</a-button
          >
        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { Descriptions, Empty } from 'ant-design-vue'
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import SelectType from '../create/select-type.vue'
import { useStore } from '@/store'
// import performanceMonitor from '@/utils/performanceMonitor'

export default defineComponent({
  name: 'Welcome',
  components: {
    Empty,
    [Descriptions.name]: Descriptions,
    [Descriptions.Item.name]: Descriptions.Item,
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
    SelectType
  },
  setup() {
    const userInfo = useStore().getters['user/userInfo']
    const state = reactive({
      visible: false
    })

    const handleOk = () => {
      state.visible = false
    }
    return {
      userInfo,
      state,
      handleOk
    }
  }
})
</script>

<style lang="less" scoped>
.box {
  display: flex;
  width: 100%;
  height: calc(100vh - 140px);
  flex-direction: column;

  img {
    min-height: 0;
    flex: 1;
  }

  .ant-form {
    flex: 2;
  }

  .empty {
    height: 100%;
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .craete-title {
    text-align: center;
    padding-bottom: 10px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1890ff;
    height: 100%;
  }
  .create-container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    height: 100%;
    align-content: center;
    justify-content: center;
  }

  .create-tool {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
  }

  .create-item {
    display: flex;
    width: 200px;
    height: 240px;
    border-radius: 10px;
    align-content: space-between;
    justify-content: center;
    flex-wrap: wrap;
    .create-item-img {
      height: 80%;
      display: flex;

      align-items: center;
      justify-content: center;
    }
  }
  .icon-class {
    width: 150px;
    height: 150px;
  }
}
</style>
