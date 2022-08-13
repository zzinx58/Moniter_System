<template>
  <div class="page-container">
    <div class="right"></div>
    <div class="form-container">
      <div class="logo-wrapper">
        <FullLogo />
      </div>
      <div class="form-wrapper">
        <LoginFrom />
      </div>
    </div>
    <div class="actions-wrapper">
      <Actions :showDarkModeSwitch="false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import useAppConfigStore from "@/store/AppConfig";
import useTOPOLOGY from "@/hooks/useTOPOLOGY";
export default defineComponent({
  name: "Login",
  setup() {
    const appConfig = useAppConfigStore();
    onMounted(() => {
      useTOPOLOGY(".right");
    });
    document.addEventListener("fullscreenchange", (document) => {
      useTOPOLOGY(".right");
    });
    return {
      appConfig,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-container {
  @apply absolute;
  width: 45%;
  height: 60%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(15, 29, 58, 0.85);
  box-shadow: 8px 8px 32px 8px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.page-container {
  @apply flex;
  width: 100vw;
  .right {
    @apply flex-1;
    background-color: #234384;
  }
  height: 100vh;
}

.actions-wrapper {
  position: absolute;
  // bottom: 0px;
  top: 10px;
  right: 10px;
  color: #234384;
}
</style>
