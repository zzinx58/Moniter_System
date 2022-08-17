<template>
  <div
    class="sidebar-container"
    :class="[appConfig.isCollapse ? 'is-close' : 'is-open']"
  >
    <OnlyLogo />
    <ScrollerMenu />
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "Sidebar",
  setup() {
    const appConfig = useAppConfigStore();
    return { appConfig };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-container {
  @apply;
  //   @apply bg-blue-300;
  z-index: 999;
  width: $menuWidth;
  height: 100vh;
  border-right: 1px solid var(--el-border-color);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
}

.is-open {
  transition: width 1s;
  width: $menuWidth;
}
.is-close {
  transition: width 1s;
  width: 0px;
}
</style>
