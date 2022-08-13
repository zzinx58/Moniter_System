<template>
  <ElDrawer size="25%" v-model="opened" title="系统设置">
    <div>hi,there!</div>
    <div class="setting-item-wrapper">
      <label>显示搜索按钮:</label>
      <ElSwitch v-model="appConfig.actionBar.isShowRefresh" />
    </div>
    <div class="setting-item-wrapper">
      <label>显示全屏按钮:</label>
      <ElSwitch v-model="appConfig.actionBar.isShowFullScreen" />
    </div>
    <ElDivider />
    <div class="setting-item-wrapper">
      <label>主题颜色选择：</label>
      <ElColorPicker
        v-model="appConfig.themeColor"
        v-on:change="appConfig.changePrimarityColor"
      />
    </div>
    <ElDivider />
  </ElDrawer>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Setting",
  setup() {
    const opened = ref(false);
    const appConfig = useAppConfigStore();
    function openDrawer() {
      opened.value = true;
    }
    return { opened, openDrawer, appConfig };
  },
});
</script>
