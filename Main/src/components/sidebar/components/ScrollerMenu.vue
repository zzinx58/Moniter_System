<template>
  <!-- 滚动栏测试通过 -->
  <ElScrollbar class="scroll-bar">
    <IconConfigProvider size="25">
      <ElMenu :active-text-color="appConfig.themeColor" class="side-menu">
        <!-- router="true" -->
        <ElMenuItem>
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>zzinx58测试页面</span>
          </template>
        </ElMenuItem>
      </ElMenu>
    </IconConfigProvider>
  </ElScrollbar>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { Board28Regular } from "@vicons/fluent";
import { Icon, IconConfigProvider } from "@vicons/utils";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "ScrollMenu",
  components: {
    IconConfigProvider,
    Icon,
    Board28Regular,
  },
  setup() {
    const appConfig = useAppConfigStore();
    return { appConfig };
  },
});
</script>

<style lang="scss" scoped>
.side-menu {
  border-right: 0px;
  span {
    @apply ml-3;
  }
}
</style>
