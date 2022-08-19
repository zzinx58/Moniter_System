<template>
  <div class="avatar-container">
    <div class="avatar">
      <ElAvatar :src="userStore.avatar" shape="circle" :size="40" />
    </div>
    <ElDropdown @command="handleCommand">
      <div class="nick-name">
        {{ userStore.nickName }}
        <Icon class="tip">
          <CaretDownOutline />
        </Icon>
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="a">团队管理</ElDropdownItem>
          <ElDropdownItem command="b"><SettingsIcon />系统设置</ElDropdownItem>
          <ElDropdownItem>退出登录</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { useUserStore } from "@/store/User";
import { defineComponent, ref } from "vue";
import { CaretDownOutline } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Avatar",
  components: {
    Icon,
    CaretDownOutline,
  },
  setup() {
    const router = useRouter();
    const handleCommand = (command: string | number | object) => {
      switch (command) {
        case "b":
          appConfig.isDrawerOpen = true;
        case "a":
          router.push("/index/teamManage");
      }
    };
    const userStore = useUserStore();
    const appConfig = useAppConfigStore();

    return { userStore, appConfig, handleCommand };
  },
});
</script>

<style lang="scss" scoped>
.avatar-container {
  @apply flex items-center;
  // @apply bg-green-500;
  .nick-name {
    @apply pr-3 flex pl-2 items-center;
    // @apply bg-yellow-400;
    .tip {
      transform: rotate(0);
      transition: transform $transitionTime;
      margin-left: 4px;
    }
    .avatar {
    }
  }
}

.avatar-container:hover {
  cursor: pointer;
  color: v-bind("appConfig.themeColor");
  border-radius: 5%;

  .nick-name .tip {
    transform: rotate(180deg);
    transition: transform $transitionTime;
  }
  .el-dropdown {
    color: v-bind("appConfig.themeColor");
  }
}
:global(.el-dropdown__popper) {
  --el-dropdown-menuItem-hover-color: var(--my-theme-color);
}
</style>
