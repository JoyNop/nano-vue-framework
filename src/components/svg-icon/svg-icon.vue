<!--
 * @Author: HanRui(JoyNop)
 * @Date: 2021-07-15 09:25:03
 * @LastEditors: HanRui(JoyNop)
 * @LastEditTime: 2021-07-15 10:07:15
 * @Description: file content
 * @FilePath: /blast-browser/src/components/svg-icon/svg-icon.vue
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

// eslint-disable-next-line no-undef
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext)
try {
  importAll(require.context('@/assets/icons', true, /\.svg$/))
} catch (error) {
  console.log(error)
}

interface SvgIcon {
  iconClass: string
  className?: string
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props: SvgIcon) {
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => `svg-icon ${props.className}`)

    return {
      iconName,
      svgClass
    }
  }
})
</script>

<style lang="less" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
    cursor: pointer;
    content: '';
  }
}
</style>
