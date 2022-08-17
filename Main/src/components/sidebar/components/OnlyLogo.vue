<template>
  <div class="logo-wrapper">
    <img class="logo-img" src="@/assets/only_logo_transparent.png" />
    <div
      class="logo-title"
      :class="[appConfig.isCollapse ? 'is-close' : 'is-open']"
    >
      <span>{{ projectName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { projectName } from "@/settings";
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "OnlyLogo",
  setup() {
    const appConfig = useAppConfigStore();
    return { projectName, appConfig };
  },
});
</script>

<style lang="scss" scoped>
.logo-wrapper {
  @apply flex;
  // @apply bg-yellow-200;
  height: $logoHeight;
  max-width: 210px;
  .logo-title {
    white-space: nowrap;
    @apply font-bold ml-1 my-auto mx-auto;
    // @apply bg-green-200;
  }
  .logo-img {
    @apply object-cover ml-1;
    width: 45px;
  }
}
.is-open {
  transition: visibility 0.3s;
  visibility: visible;
}
.is-close {
  transition: visibility 0.25s;
  visibility: hidden;
}
</style>
