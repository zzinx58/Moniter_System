<template>
  <div class="page-container">
    <div class="header"><Header /></div>
    <div class="side-bar"><Sidebar /></div>
    <div class="main"></div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import useHandleResize from "@/hooks/useHandleResize";
import useTOPOLOGY from "@/hooks/useTOPOLOGY";
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onUpdated,
  onUnmounted,
} from "vue";
export default defineComponent({
  name: "CSSTest",
  setup() {
    useHandleResize();
    useTOPOLOGY(".page-container");
    return {};
  },
});
</script>

<style scoped lang="scss">
.page-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
</style>
