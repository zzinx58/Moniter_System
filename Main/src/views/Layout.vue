<template>
  <div id="topology-container"></div>
  <div id="page-container">
    <div id="sidebar-wrapper">
      <Sidebar />
    </div>
    <div id="main-layout">
      <div id="header-wrapper">
        <Header />
      </div>
      <div
        id="main-wrapper"
        :class="[appConfig.isFixedHeader ? 'fixed-header' : '']"
      >
        <div class="temp-block"></div>
        <MainLayout />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSlideInDown, useSlideInLeft } from "@/hooks/useAnimate";
import useHandleResize from "@/hooks/useHandleResize";
import useTOPOLOGY from "@/hooks/useTOPOLOGY";
import useAppConfigStore from "@/store/AppConfig";
import useErrorEventItemStore from "@/store/ErrorEventItem";
import axios from "axios";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "Layout",
  setup() {
    useHandleResize();
    const appConfig = useAppConfigStore();
    const ErrorEventItemStore = useErrorEventItemStore();
    onMounted(() => {
      useSlideInDown("#main-layout", "1.5s");
      useSlideInLeft("#sidebar-wrapper", "1s");
    });
    useTOPOLOGY("#topology-container");
    return { appConfig };
  },
});
</script>

<style lang="scss" scoped>
.temp-block {
  height: $headerHeight;
}
#header-wrapper {
  z-index: 2000;
}
#sidebar-wrapper {
  overflow-y: hidden;
}
#main-wrapper {
  @apply p-3;
  box-sizing: border-box;
  // @apply bg-blue-200;
  margin-top: -$headerHeight;
  height: 100vh;
}
.fixed-header {
  // fixed-header style1
  overflow-y: auto;
  position: relative;
  z-index: -10;
  height: calc(100vh - $headerHeight);
}
#main-layout {
  @apply flex-grow;
  z-index: 999;
  // @apply bg-blue-300;
  @apply;
  // no-fixed-header style
  height: 100vh;
  overflow-y: auto;
}
#page-container {
  @apply flex;
  //   @apply bg-yellow-300;
  height: 100vh;
}
#topology-container {
  @apply fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
