<template>
  <div :style="rectStyle"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: String
    }
  },
  setup(props) {
    const rectStyle = computed(() => {
      return {
        display: 'inline-block',
        lineHeight: '16px',
        backgroundColor: props.color,
        width: '10px',
        height: '10px',
        marginRight: '4px'
      }
    })

    return {
      rectStyle
    }
  }
})
</script>

<style></style>
