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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
//@ts-ignore
import TOPOLOGY from "vanta/dist/vanta.topology.min";
export default defineComponent({
  name: "Login",
  setup() {
    onMounted(() => {
      TOPOLOGY({
        el: ".right",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x628fe8,
      });
    });
    return {};
  },
});
</script>

<style lang="scss" scoped>
/* 
登录页面响应式设计思想：
- 为了方便思考的话,写出三类展示后再进行公共部分逻辑提取
PC端大屏展示:俩栏展示,白黑色系分屏
  左侧部署透明logo全,下方登录表单
PAD端展示:单栏展示
notice:
  - //windi @apply 在嵌套的样式中不生效
 */
.logo-wrapper {
  @apply mt-0;
}

.form-container {
  @apply absolute;
  // @apply bg-yellow-100;
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

.left-content {
  @apply flex-1;
  background: rgba(251, 251, 251, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.right-content {
  @apply flex-1;
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
  .left {
    @apply flex-1;
    background-color: #ffffff;
  }
  .right {
    @apply flex-1;
    background-color: #234384;
  }
  height: 100vh;
}
</style>
