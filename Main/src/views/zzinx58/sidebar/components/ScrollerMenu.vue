<template>
  <ElScrollbar class="scroll-bar">
    <IconConfigProvider size="25">
      <ElMenu
        noresize="false"
        :active-text-color="appConfig.themeColor"
        default-active="2"
        class="side-menu"
        router="true"
      >
        <ElMenuItem index="/index/zzinx58">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>zzinx58测试页面</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="/">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>主控台</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="/csstest">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>CssTest页面</span>
          </template>
        </ElMenuItem>
      </ElMenu>
    </IconConfigProvider>
  </ElScrollbar>
</template>

<script lang="ts">
import { Icon, IconConfigProvider } from "@vicons/utils";
import { Board28Regular } from "@vicons/fluent";
import { defineComponent } from "vue";
import useAppConfigStore from "@/store/AppConfig";
export default defineComponent({
  name: "ScrollerMenu",
  components: {
    Icon,
    IconConfigProvider,
    Board28Regular,
  },
  setup() {
    const appConfig = useAppConfigStore();
    return { appConfig };
  },
});
</script>

<style lang="scss">
.side-menu {
  span {
    @apply ml-1;
  }
}
.scroll-bar {
}
</style>
