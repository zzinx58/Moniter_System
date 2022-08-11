<template>
  <div class="avatar-container">
    <div class="avatar">
      <ElAvatar :src="userStore.avatar" shape="circle" :size="40" />
    </div>
    <div class="nick-name">
      {{ userStore.nickName }}
      <Icon class="tip">
        <CaretDownOutline />
      </Icon>
    </div>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { useUserStore } from "@/store/User";
import { defineComponent } from "vue";
import { CaretDownOutline } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
export default defineComponent({
  name: "Avatar",
  components: {
    Icon,
    CaretDownOutline,
  },
  setup() {
    const userStore = useUserStore();
    const appConfig = useAppConfigStore();
    return { userStore, appConfig };
  },
});
</script>

<style lang="scss">
.avatar-container {
  @apply flex items-center;
  // @apply bg-green-500;
  height: 100%;

  .nick-name {
    @apply pr-3 flex pl-2 items-center;
    // @apply bg-yellow-400;
    .tip {
      transform: rotate(0);
      transition: transform $transitionTime;
      margin-left: 4px;
    }
  }
  .avatar {
    @apply flex;
  }
}
.avatar-container:hover {
  cursor: pointer;
  color: v-bind("appConfig.themeColor");
  .nick-name .tip {
    transform: rotate(180deg);
    transition: transform $transitionTime;
  }
}
</style>
