<template>
  <div class="header-layout">
    <div class="logo-wrapper">
      <Logo />
    </div>
    <div class="right-wrapper">
      <Acitons v-if="appConfig.deviceType !== 'mobile'" />
      <Avatar />
    </div>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Header",
  setup() {
    const appConfig = useAppConfigStore();
    return { appConfig };
  },
});
</script>

<style lang="scss">
.header-layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  box-sizing: border-box;
  @apply flex justify-between;
  // @apply bg-red-200;
  border-bottom: 1px solid var(--el-border-color);
  width: 100%;
  height: $headerHeight;
  background-color: var(--el-bg-color);
  .logo-wrapper {
  }
  .right-wrapper {
    @apply flex my-auto justify-end;
  }
}
</style>
