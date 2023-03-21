<template>
  <div class="toast | absolute z-20 w-20 p-8 bg-gray-400" role="alert">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Toast',
  props: {
    start: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    showToast(): void {
      this.show = true
    },
    hideToast(): void {
      this.show = false
    },
    init(timeout: number = 2000): void {
      this.showToast()
      setTimeout(() => {
        this.hideToast()
      }, timeout);
    },
  },
  watch: {
    start() {
      this.init()
    },
  }
})
</script>

