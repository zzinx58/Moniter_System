<template>
  <ElCard class="footer-container"> Copyright © {{ projectName }} 2022 </ElCard>
</template>

<script lang="ts">
import { projectName } from "@/settings";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Footer",
  setup() {
    return { projectName };
  },
});
</script>

<style lang="scss" scoped>
.footer-container {
  @apply absolute;
  bottom: 0;
  right: 0;
  height: $footerHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>
