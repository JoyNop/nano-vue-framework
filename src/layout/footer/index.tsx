/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 09:53:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 09:11:55
 * @Description: file content
 * @FilePath: /vue3-ts/src/layout/footer/index.tsx
 */
import { defineComponent, ref } from 'vue'

import { Layout } from 'ant-design-vue'
import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons-vue'
import styles from './index.module.less'

const { Footer: ALayoutFooter } = Layout

export default defineComponent({
  name: 'PageFooter',
  components: { ALayoutFooter },
  setup() {
    return () => (
      <>
        <a-layout-footer class={styles.page_footer}>
          <div class={styles.page_footer_link}>
            <a href="https://github.com/vuejs/vue-next" target="_blank">
              vue 3.0
            </a>

            <a href="https://github.com/vueComponent/ant-design-vue" target="_blank">
              {' '}
              ant-design-vue 2.0
            </a>
          </div>
          <div class={styles.copyright}>
            Copyright <CopyrightOutlined /> 2020{' '}
            <a href="https://www.joynop.com" target="_blank">
              JoyNop
            </a>
          </div>
        </a-layout-footer>
      </>
    )
  }
})
