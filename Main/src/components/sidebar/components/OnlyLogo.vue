<template>
  <div class="logo-wrapper">
    <img class="logo-img" src="@/assets/only_logo_transparent.png" />
    <div class="logo-title">
      <span>{{ projectName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { projectName } from "@/settings";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "OnlyLogo",
  setup() {
    return { projectName };
  },
});
</script>

<style lang="scss" scoped>
.logo-wrapper {
  @apply flex;
  // @apply bg-yellow-200;
  height: $logoHeight;
  max-width: 210px;
  border-bottom: 1px dashed var(--el-border-color);
  .logo-title {
    @apply font-bold ml-1 my-auto mx-auto;
    // @apply bg-green-200;
  }
  .logo-img {
    @apply object-cover ml-1;
    width: 45px;
  }
}
</style>
