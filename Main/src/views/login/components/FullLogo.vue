<template>
  <div class="full-logo"></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "FullLogo",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.full-logo {
  @apply mx-auto;
  background: url("@/assets/logo_transparent.png") no-repeat;
  background-size: cover;
  width: 300px;
  height: 300px;
}
</style>
