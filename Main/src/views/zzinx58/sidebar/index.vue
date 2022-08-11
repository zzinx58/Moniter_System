<template>
  <div class="side-bar" v-if="appConfig.deviceType !== 'mobile'">
    <ElCard
      :style="{ borderRadius: '0px' }"
      :body-style="{ padding: 0 }"
      class="menu-card"
    >
      <ScrollerMenu />
    </ElCard>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  setup() {
    const appConfig = useAppConfigStore();

    return {
      appConfig,
    };
  },
});
</script>

<style lang="scss">
.side-bar {
  // @apply bg-yellow-500;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 200px;
  // height: calc(100vh - #{$headerHeight});
  height: 100%;
  margin-top: $headerHeight;
  .menu-card {
    height: 100%;
  }
}
</style>
