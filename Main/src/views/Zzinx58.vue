<template>
  <ElButton type="danger">nihao</ElButton>
  <p>element-plus样式冲突测试:</p>
  <p>WindiCSS测试:</p>
  <div class="bg-yellow-300 pb-10 text-green-500">Hello world!</div>
  <p>pinia测试:</p>
  <div class="bg-indigo-300">{{ userStore.nickName }}</div>
  <button @click="handleClick" class="bg-indigo-400 rounded-lg h-10 p-1">
    ChangeName
  </button>
  <h1>vite-serve-proxy测试:</h1>
  <div>全局样式测试：</div>
  <div class="test-global">123456789</div>
  <div>
    <div v-if="appConfig.actionBar.isShowRefresh">刷新按钮测试:</div>
    <ElButton v-if="appConfig.actionBar.isShowRefresh" @click="handleRefresh"
      >Refresh</ElButton
    >
  </div>
  <div>
    <div v-if="appConfig.actionBar.isShowFullScreen">全屏按钮与功能测试:</div>
    <Transition name="el-zoom-in-top">
      <ElButton
        v-if="appConfig.actionBar.isShowFullScreen"
        type="primary"
        plain
        @click="handleFullScreen"
        >FullScreen</ElButton
      >
    </Transition>
  </div>
  <br />
  <div>样式测试：</div>
  <div>黑暗模式测试: 当前状态是：{{ isDark }}</div>
  <ElButton class="!bg-green-200" type="warning" @click="toggleDark()"
    >黑暗模式</ElButton
  >
  <ElButton :style="{ backgroundColor: appConfig.themeColor }"
    >全局样式颜色设置</ElButton
  >
  <div>ElDrawer测试:</div>
  <ElButton @click="opened = true" plain type="warning">open drawer</ElButton>
  <ElDrawer size="25%" v-model="opened" title="系统设置">
    <div>hi,there!</div>
    <div class="setting-item-wrapper">
      <label>显示全屏按钮:</label>
      <ElSwitch v-model="appConfig.actionBar.isShowFullScreen" />
    </div>
    <div class="setting-item-wrapper">
      <label>显示搜索按钮:</label>
      <ElSwitch v-model="appConfig.actionBar.isShowRefresh" />
    </div>
    <ElDivider />
    <div class="setting-item-wrapper">
      <label>主题颜色选择：</label>
      <ElColorPicker v-model="appConfig.themeColor" />
    </div>
    <ElDivider />
  </ElDrawer>
  <div>xicons测试:</div>
  <a href="https://www.xicons.org/#/" class="bg-red-300"
    >xicons链接(clickable)</a
  >
  <br />
  <Icon size="48">
    <!-- <SettingsIcon /> -->
    <Money16Regular />
  </Icon>
  <Icon size="35">
    <Settings16Regular />
  </Icon>
  <IconConfigProvider size="48" color="brown">
    <Icon>
      <Settings16Regular />
    </Icon>
    <Icon>
      <Money16Regular />
    </Icon>
    <Icon>
      <AddCircle16Regular />
    </Icon>
  </IconConfigProvider>
  <br />
  <ElButton type="success" @click="backToApp">返回主页</ElButton>
  <OrderChart />
  <Footer />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/store/User";
import { useRouter } from "vue-router";
import screenfull from "screenfull";
import {
  Money16Regular,
  Settings16Regular,
  AddCircle16Regular,
} from "@vicons/fluent";
import { useDark, useToggle } from "@vueuse/core";
import { Icon, IconConfigProvider } from "@vicons/utils";
import useAppConfigStore from "@/store/AppConfig";
export default defineComponent({
  name: "Zzinx58",
  components: {
    Settings16Regular,
    Money16Regular,
    Icon,
    IconConfigProvider,
    AddCircle16Regular,
  },
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const router = useRouter();
    const userStore = useUserStore();
    const appConfig = useAppConfigStore();
    const handleClick = () => userStore.updateName("zzinx");
    const backToApp = () => router.push("/");
    const handleRefresh = () => location.reload();
    const handleFullScreen = () => {
      if (!screenfull.isEnabled) {
        alert("当前浏览器不支持全屏操作");
        return false;
      }
      screenfull.toggle();
    };
    const opened = ref(false);

    return {
      handleClick,
      userStore,
      backToApp,
      handleFullScreen,
      opened,
      appConfig,
      toggleDark,
      isDark,
      handleRefresh,
    };
  },
});
</script>

<style lang="scss" scoped>
.test-global {
  @include test-bg;
  height: $test-height;
}

.setting-item-wrapper {
  @apply justify-between flex;
}
</style>
