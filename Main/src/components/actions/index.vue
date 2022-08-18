<template>
  <div
    class="action-items-wraper"
    :class="[
      appConfig.deviceType === 'mobile' ? 'close-status' : 'open-status',
    ]"
  >
    <div class="action-item">
      <div v-if="appConfig.devOptions.showFPS">fps:{{ fps }}</div>
      <ElSwitch
        size="large"
        @click="handleDarkMode()"
        v-model:value="darkMode"
        inline-prompt
        :active-icon="MoonNight"
        :inactive-icon="Sunny"
        v-if="appConfig.actionBar.isShowDarkModeSwitch"
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
      <div class="action-item" v-if="appConfig.actionBar.isShowSettings">
        <Icon>
          <Settings16Regular @click="onShowSetting" />
        </Icon>
      </div>
    </IconConfigProvider>
  </div>
  <Setting ref="settingRef" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from "vue";
import { Settings16Regular, FullScreenMaximize16Regular } from "@vicons/fluent";
import { Refresh } from "@vicons/ionicons5";
import { Icon, IconConfigProvider } from "@vicons/utils";
import { Sunny, MoonNight } from "@element-plus/icons-vue";
import { useDark, useFps, useToggle } from "@vueuse/core";
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
    const fps = useFps();
    const isDark = useDark();
    const handleDarkMode = useToggle(isDark);
    const darkMode = ref(isDark);
    const settingRef = ref();
    const onShowSetting = () => {
      // settingRef.value.openDrawer();
      appConfig.isDrawerOpen = !appConfig.isDrawerOpen;
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
      fps,
    };
  },
});
</script>

<style lang="scss">
.action-items-wraper {
  @apply flex mr-3;
  z-index: 999;
  .action-item {
    @apply flex my-auto ml-2;
    &:hover {
      cursor: pointer;
      color: v-bind("appConfig.themeColor");
    }
  }
}

.open-status {
  transform: translateY(0);
  transition: transform 1s;
}
.close-status {
  transform: translateY(-100%);
  transition: transform 1s;
}
</style>
