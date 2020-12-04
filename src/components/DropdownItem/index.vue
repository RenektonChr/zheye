<template>
  <li
    class="dropdown-option"
    :class="{ 'is-disabled': disabled }"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.dropdown-option.is-disabled {
  color: #6c757d !important;
  pointer-events: none !important;
  background-color: transparent !important;
  cursor: not-allowed;
}
</style>
