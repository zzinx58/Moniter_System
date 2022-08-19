<template>
  <ElDrawer
    size="250px"
    v-model="appConfig.isDrawerOpen"
    title="系统设置"
    :append-to-body="true"
  >
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
    <ElDivider>系统设置</ElDivider>
    <div class="setting-item-wrapper">
      <label>固定导航栏:</label>
      <ElSwitch v-model="appConfig.isFixedHeader" />
    </div>
    <div class="setting-item-wrapper">
      <label>显示FPS:</label>
      <ElSwitch v-model="appConfig.devOptions.showFPS" />
    </div>
    <div class="setting-item-wrapper">
      <label>显示DevOptions:</label>
      <ElSwitch v-model="appConfig.showDevOptions" />
    </div>
    <div class="setting-item-wrapper">
      <ElButton
        @click="handleReset"
        type="danger"
        class="mx-auto"
        :style="{ width: 100 + '%' }"
        >重置所有设置</ElButton
      >
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
        :step="10"
        :min="210"
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
    const handleReset = () => {
      appConfig.$reset();
      ElMessage.success("系统设置初始化成功，准备刷新页面");
      setInterval(() => {
        location.reload();
      }, 1000);
    };
    onMounted(() => {
      appConfig.changePrimarityColor(appConfig.themeColor);
      appConfig.changeSideWidth(appConfig.sideWidth);
    });
    return { opened, openDrawer, appConfig, predefineColors, handleReset };
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
