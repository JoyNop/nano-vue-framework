/*
 * @Author: HanRui(JoyNop)
 * @Date: 2021-06-07 09:53:35
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-06-09 09:07:59
 * @Description: file content
 * @FilePath: /vue3-ts/src/hooks/useOnline.ts
 */
import { ref, onMounted, onUnmounted, watch } from 'vue'

/**
 * @description 用户网络是否可用
 * */
export function useOnline() {
  const online = ref(true)

  const showStatus = (val: any) => {
    online.value = typeof val == 'boolean' ? val : val.target.online
  }

  // 在页面加载后，设置正确的网络状态
  navigator.onLine ? showStatus(true) : showStatus(false)

  onMounted(() => {
    // 开始监听网络状态的变化
    window.addEventListener('online', showStatus)

    window.addEventListener('offline', showStatus)
  })
  onUnmounted(() => {
    // 移除监听网络状态的变化
    window.removeEventListener('online', showStatus)

    window.removeEventListener('offline', showStatus)
  })

  return { online }
}
