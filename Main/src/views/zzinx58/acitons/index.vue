import { ElMessage } from "element-plus"; import { ElMessage } from
"element-plus";
<template>
  <div class="action-items-wraper">
    <div class="action-item">
      <ElSwitch
        size="large"
        @click="handleDarkMode()"
        v-model:value="darkMode"
        inline-prompt
        :active-icon="MoonNight"
        :inactive-icon="Sunny"
      />
    </div>
    <IconConfigProvider size="24">
      <div class="action-item" v-if="appConfig.actionBar.isShowRefresh">
        <Icon>
          <Refresh @click="handleRefresh" />
        </Icon>
      </div>
      <div class="action-item" v-if="appConfig.actionBar.isShowFullScreen">
        <Icon>
          <FullScreenMaximize16Regular @click="handleFullScreen" />
        </Icon>
      </div>
      <div class="action-item">
        <Icon>
          <Settings16Regular @click="onShowSetting" />
        </Icon>
      </div>
      <div class="action-item">
        <Icon>
          <Settings16Regular @click="handleTest" />
        </Icon>
      </div>
    </IconConfigProvider>
  </div>
  <Setting ref="settingRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Settings16Regular, FullScreenMaximize16Regular } from "@vicons/fluent";
import { Refresh } from "@vicons/ionicons5";
import { Icon, IconConfigProvider } from "@vicons/utils";
import { Sunny, MoonNight } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";
import useAppConfigStore from "@/store/AppConfig";
import screenfull from "screenfull";
export default defineComponent({
  name: "ActionItems",
  components: {
    Settings16Regular,
    Icon,
    IconConfigProvider,
    FullScreenMaximize16Regular,
    Refresh,
  },
  setup() {
    const appConfig = useAppConfigStore();
    const handleRefresh = () => {
      location.reload();
    };
    const isDark = useDark();
    const handleDarkMode = useToggle(isDark);
    const darkMode = ref(isDark);
    const settingRef = ref();
    const onShowSetting = () => {
      settingRef.value.openDrawer();
    };
    const handleFullScreen = () => {
      if (!screenfull.isEnabled) {
        ElMessage({
          type: "error",
          message: "该浏览器不支持全屏展示",
        });
        return false;
      }
      screenfull.toggle();
    };
    const handleTest = () => {
      ElMessage({
        type: "error",
        message: "该浏览器不支持全屏展示",
      });
    };
    return {
      handleRefresh,
      handleDarkMode,
      isDark,
      darkMode,
      Sunny,
      MoonNight,
      appConfig,
      onShowSetting,
      settingRef,
      handleFullScreen,
      handleTest,
    };
  },
});
</script>

<style lang="scss">
.action-items-wraper {
  position: relative;
  height: 100%;
  @apply flex mr-3;

  .action-item {
    @apply flex my-auto ml-2;
    &:hover {
      cursor: pointer;
      color: v-bind("appConfig.themeColor");
    }
  }
}
</style>
