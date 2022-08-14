<template>
  <div
    class="side-bar-container animate__animated animate__slideInLeft"
    v-if="appConfig.deviceType"
  >
    <OnlyLogo />
    <div class="menu-container">
      <ScrollerMenu />
    </div>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "SideBar",
  setup() {
    const appConfig = useAppConfigStore();
    return { appConfig };
  },
});
</script>

<style lang="scss" scoped>
.menu-container {
  // @apply bg-yellow-300;
  height: calc(100vh - $headerHeight);
  // background-color: transparent;
  border-right: 1px solid #414243;
  // border-right: 1px solid var(--el-card-border-color);
}

.side-bar-container {
  @apply fixed;
  // @apply bg-yellow-400;
  top: 0;
  left: 0;
  z-index: 999;
  width: var(--menu-width);
  height: 100%;
  background-color: var(--el-bg-color);
}

.animate__animated.animate__slideInLeft {
  --animate-duration: 1.5s;
}
</style>
