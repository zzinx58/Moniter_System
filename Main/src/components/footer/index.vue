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
  @apply flex justify-center items-center mt-3;
  height: $footerHeight;
  box-sizing: border-box;
  background: rgba(131, 206, 226, 0.4);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
}
</style>
