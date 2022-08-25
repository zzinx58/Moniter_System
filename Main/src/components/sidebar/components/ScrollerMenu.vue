<template>
  <!-- 滚动栏测试通过 -->
  <ElScrollbar class="scroll-bar">
    <IconConfigProvider size="25">
      <!-- :default-active="'/csstest'" -->
      <ElMenu
        :active-text-color="appConfig.themeColor"
        class="side-menu"
        :default-active="'/index'"
        :router="true"
      >
        <!-- router="true" -->
        <ElMenuItem index="/index">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>zzinx58测试页面</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="/index/dashboard">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>DashBoard</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="/index/helloworld">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>测试页面</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="/index/errorPreview">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>错误预览页面</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="/index/test">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>Test页面</span>
          </template>
        </ElMenuItem>
        <ElMenuItem index="/login">
          <template #title>
            <Icon>
              <Board28Regular />
            </Icon>
            <span>Login页面</span>
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
  border-top: 1px dashed var(--el-border-color);
  span {
    @apply ml-3;
  }
  .el-menu-item:hover {
    // background-color: var(--el-color-primary-light-9);
  }
}
</style>
