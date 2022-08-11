<template>
  <div class="logo-wrapper">
    <img
      v-if="showLogo"
      class="logo-img"
      src="@/assets/only_logo_transparent.png"
    />
    <div v-if="showTitle" :class="[!appConfig.isCollapse]" class="logo-title">
      <span>{{ projectName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent } from "vue";
import { projectName } from "@/settings";
export default defineComponent({
  name: "Logo",
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const appConfig = useAppConfigStore();
    return {
      appConfig,
      projectName,
    };
  },
});
</script>

<style lang="scss">
.logo-wrapper {
  height: $logoHeight;
  @apply flex;
  .logo-title {
    @apply my-auto ml-1;
    font-weight: bold;
  }
  .logo-img {
    width: 45px;
    object-fit: cover;
  }
}
</style>
