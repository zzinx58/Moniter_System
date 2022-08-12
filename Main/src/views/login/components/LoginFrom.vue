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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "LoginForm",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.form-wraper {
  @apply flex-col mt-0;
}
.input-item {
  @apply mt-0 mx-auto;
  + .input-item {
    @apply mt-3;
  }
  width: 300px;
  label {
    color: #5dacbd;
  }
}
</style>
