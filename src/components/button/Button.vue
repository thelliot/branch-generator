<template>
  <button></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const buttonTypes = ['primary', 'secondary', 'ghost'] as const

export type ButtonTypes = typeof buttonTypes[number]

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (x: ButtonTypes) => buttonTypes.includes(x),
    },
  },
  computed: {

  },
});
</script>

