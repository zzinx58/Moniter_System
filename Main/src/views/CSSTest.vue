<template>
  <div class="header">123</div>
  <div class="main"></div>
  <div class="footer"></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "CSSTest",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.header {
  @apply bg-yellow-200;
  width: 100%;
  height: $headerHeight;
}
</style>
