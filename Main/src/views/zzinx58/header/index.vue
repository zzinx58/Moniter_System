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
  box-sizing: border-box;
  @apply flex justify-between;
  // @apply bg-red-200;
  width: 100%;
  height: $headerHeight;
  .logo-wrapper {
  }
  .right-wrapper {
    @apply flex my-auto;
  }
}
</style>
