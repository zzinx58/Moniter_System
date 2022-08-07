<template>
  <p>element-plus样式冲突测试:</p>
  <ElButton type="danger">nihao</ElButton>
  <p>WindiCSS测试:</p>
  <div class="bg-yellow-300 pb-10 text-green-500">Hello world!</div>
  <p>pinia测试:</p>
  <div class="bg-indigo-300">{{ userStore.name }}</div>
  <button @click="handleClick" class="bg-indigo-400 rounded-lg h-10 p-1">
    ChangeName
  </button>
  <h1>vite-serve-proxy测试:</h1>
  <div>全局样式测试：</div>
  <div class="test-global">123456789</div>
  <div>全屏测试：</div>
  <ElButton type="primary" plain @click="handleFullScreen">FullScreen</ElButton>
  <br />
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/store/User";
import { useRouter } from "vue-router";
import screenfull from "screenfull";
import {
  Money16Regular,
  Settings16Regular,
  AddCircle16Regular,
} from "@vicons/fluent";
import { Icon, IconConfigProvider } from "@vicons/utils";
export default defineComponent({
  name: "Test",
  components: {
    Settings16Regular,
    Money16Regular,
    Icon,
    IconConfigProvider,
    AddCircle16Regular,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const handleClick = () => userStore.updateName("zzinx");
    const backToApp = () => router.push("/");
    const handleFullScreen = () => {
      if (!screenfull.isEnabled) {
        alert("当前浏览器不支持全屏操作");
        return false;
      }
      screenfull.toggle();
    };
    return {
      handleClick,
      userStore,
      backToApp,
      handleFullScreen,
    };
  },
});
</script>

<style lang="scss" scoped>
.test-global {
  @include test-bg;
  height: $test-height;
}
</style>
