<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-14 17:31:51
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-15 11:07:45
 * @Description: file content
 * @FilePath: /blast-browser/src/views/shared/dashboard/create/select-type.vue
-->
<template>
  <div class="create-container">
    <div class="craete-title">还没有内容，快去创建吧！</div>
    <div class="create-tool">
      <div class="create-item" style="background-color: #e7f4ff">
        <div class="create-item-img">
          <svg-icon iconClass="create_folder" className="icon-class" />
        </div>
        <a-button
          type="link"
          block
          style="color: white; background-color: #1890ff"
          @click="createFolder"
          >创建文件夹</a-button
        >
      </div>
      <div class="create-item" style="background-color: #e6f7f6">
        <div class="create-item-img">
          <svg-icon iconClass="create_scheme" className="icon-class" />
        </div>
        <a-button
          type="link"
          block
          style="color: white; background-color: #0db3a6"
          @click="createScheme"
          >创建文件</a-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const createScheme = () => {
      router.push('/dashboard/create')
    }
    return { createScheme }
  }
})
</script>

<style lang="less" scoped>
.craete-title {
  text-align: center;
  padding-bottom: 10px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #1890ff;
}
.create-container {
  display: flex;
  width: 600px;
  height: 300px;
  flex-wrap: wrap;
  flex-direction: column;
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
</style>
