<template>
  <div class="form-wraper">
    <div class="input-item">
      <label>Username: </label>
      <ElInput />
    </div>
    <div class="input-item">
      <label>password: </label>
      <ElInput show-password />
    </div>
    <div class="input-item">
      <ElButton class="login-button" @click="handleLogin">LOGIN</ElButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "LoginForm",
  setup() {
    const router = useRouter();
    const handleLogin = () => {
      router.push("/index");
    };
    return {
      handleLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-wraper {
  @apply flex-col mt-0;
}
@keyframes animate {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}

.login-button:hover {
  color: #5dacbd;
}

.login-button {
  @apply mt-8 font-bold;
  // background-color: #5dacbd;
  // background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  animation: animate 60s linear infinite;
  background: linear-gradient(90deg, #03a9f4, #ebe295, #03a9f4);
  background-size: 400%;
  width: 100%;
  height: 50px;
}
.input-item {
  @apply mt-0 mx-auto;
  ~ .input-item {
    @apply mt-1;
  }

  width: 300px;
  label {
    color: #5dacbd;
  }
}
</style>
