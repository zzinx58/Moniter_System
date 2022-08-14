<template>
  <ElDrawer size="25%" v-model="opened" title="系统设置">
    <!-- <ElDivider content-position="left">hi,there!</ElDivider> -->
    <ElDivider>按钮显示</ElDivider>
    <div class="setting-item-wrapper">
      <label>显示搜索按钮:</label>
      <ElSwitch v-model="appConfig.actionBar.isShowRefresh" />
    </div>
    <div class="setting-item-wrapper">
      <label>显示全屏按钮:</label>
      <ElSwitch v-model="appConfig.actionBar.isShowFullScreen" />
    </div>
    <div class="setting-item-wrapper">
      <label>显示设置按钮:</label>
      <ElSwitch v-model="appConfig.actionBar.isShowSettings" />
    </div>
    <div class="setting-item-wrapper">
      <label>显示黑暗模式切换按钮:</label>
      <ElSwitch v-model="appConfig.actionBar.isShowDarkModeSwitch" />
    </div>
    <ElDivider>主题颜色</ElDivider>
    <div class="setting-item-wrapper">
      <label>主题颜色选择：</label>
      <ElColorPicker
        v-model="appConfig.themeColor"
        v-on:change="appConfig.changePrimarityColor"
        :predefine="predefineColors"
      />
    </div>
    <ElDivider>菜单设置</ElDivider>
    <div class="setting-item-wrapper">
      <label>菜单宽度:</label>
      <ElInputNumber
        v-model="appConfig.sideWidth"
        @change="appConfig.changeSideWidth(appConfig.sideWidth)"
        size="small"
      />
    </div>
  </ElDrawer>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent, onMounted, ref } from "vue";
import themeColors from "@/assets/styles/MythemColorList";
export default defineComponent({
  name: "Setting",
  setup() {
    const opened = ref(false);
    const appConfig = useAppConfigStore();
    const predefineColors = ref(themeColors);
    function openDrawer() {
      opened.value = true;
    }
    onMounted(() => {
      appConfig.changePrimarityColor(appConfig.themeColor);
      appConfig.changeSideWidth(appConfig.sideWidth);
    });
    return { opened, openDrawer, appConfig, predefineColors };
  },
});
</script>

<style lang="scss" scoped>
.setting-item-wrapper {
  @apply flex mt-2 justify-between;
  label {
    @apply my-auto;
  }
}
</style>
