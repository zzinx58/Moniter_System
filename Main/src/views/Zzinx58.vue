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

  <!-- 全局样式测试 -->
  <button class="test">123456789</button>

  <ElButton type="success" @click="backToApp">返回主页</ElButton>
  <OrderChart />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/store/User";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Test",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const handleClick = () => userStore.updateName("zzinx");
    const backToApp = () => router.push("/");
    return {
      handleClick,
      userStore,
      backToApp,
    };
  },
});
</script>

<style scoped lang="scss">
.test {
  @include test-bg;
  height: $test-height;
}
</style>
