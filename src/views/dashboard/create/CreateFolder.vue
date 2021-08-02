<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-22 10:54:26
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-29 10:30:13
 * @Description: file content
 * @FilePath: /blast-browser/src/views/dashboard/create/CreateFolder.vue
-->
<template>
  <div class="create-container">
    <PageHeader class="demo-page-header" title="创建文件夹">
      <template #extra>
        <a-button key="1" type="primary" @click="onSubmit">下一步</a-button>
      </template>

      <template #footer>
        <div class="footer">
          <Alert message="仅支持在根目录创建" type="info" show-icon style="margin-bottom: 20px" />
          <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
            <!-- <a-form-item label="所属文件夹">
            <a-select
              v-model:value="formState.pid"
              style="width: 100%"
              placeholder="请选择所属文件夹"
              @change="handleChange"
            >
              <a-select-option :key="0" :value="0"> 根目录 </a-select-option>
              <a-select-option v-for="(d, index) in state.directorys" :key="index" :value="d.id">
                {{ d.name }}
              </a-select-option>
            </a-select>
          </a-form-item> -->
            <a-form-item label="文件夹名称" :required="true" name="name" style="width: 100%">
              <a-input v-model:value="formState.name" style="width: 100%" />
            </a-form-item>
          </a-form>
        </div>
      </template>
    </PageHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw, UnwrapRef } from 'vue'
import { message, PageHeader, Alert } from 'ant-design-vue'
import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { createDirectory } from '@/api/system/scheme'
import { planMenus } from '@/api/system/menu'
import router from '@/router'

interface State {
  directorys: any[]
}
export default defineComponent({
  components: { PageHeader, Alert },
  setup() {
    const formRef = ref()
    const formState: UnwrapRef<any> = reactive({
      name: '',
      pid: 0
    })

    const state: State = reactive({
      directorys: []
    })

    const rules = {
      name: [{ required: true, message: '请填写文件夹名称', trigger: 'blur' }]
    }
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          const body = toRaw(formState)
          await createDirectory(body)

          message.success('创建成功')
          router.push('/dashboard/welcome')
        })
        .catch((error: ValidateErrorEntity<any>) => {
          console.log('error', error)
        })

      console.log('submit!', toRaw(formState))
    }

    onMounted(async () => {
      const res = await planMenus(0)
      state.directorys = res.directorys
    })
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formRef,
      rules,
      formState,
      state,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.create-container {
  height: calc(100vh - 150px);
}

.form-container {
  max-height: 600px;
  overflow: auto;
}

.footer {
  padding-left: 50px;
  padding-right: 50px;
}
</style>
