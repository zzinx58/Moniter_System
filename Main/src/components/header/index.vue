<template>
  <div id="header-container">
    <div id="collapse-menu">
      <div
        id="sidebar-icon-wrapper"
        :class="[appConfig.isCollapse ? 'is-active' : 'is-deactive']"
        @click="toggleCollapse"
      >
        <Icon size="28">
          <LayoutSidebarLeftCollapse />
        </Icon>
      </div>
    </div>
    <div id="right-wrapper">
      <Actions />
      <Avatar />
    </div>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent } from "vue";
import { Icon, IconConfigProvider } from "@vicons/utils";
import { LayoutSidebarLeftCollapse } from "@vicons/tabler";
export default defineComponent({
  name: "Header",
  components: {
    Icon,
    IconConfigProvider,
    LayoutSidebarLeftCollapse,
  },
  setup() {
    const appConfig = useAppConfigStore();
    const toggleCollapse = () => {
      appConfig.isCollapse = !appConfig.isCollapse;
    };
    return { appConfig, toggleCollapse };
  },
});
</script>

<style lang="scss" scoped>
#right-wrapper {
  @apply;
  // @apply bg-red-200;
  @apply flex;
  height: $headerHeight;
}
#collapse-menu {
  // @apply bg-red-200;
  @apply flex ml-3 flex-grow;
  height: $headerHeight;
  #sidebar-icon-wrapper {
    @apply my-auto;
    &:hover {
      cursor: pointer;
    }
  }
  #sidebar-icon-wrapper.is-active {
    transform: rotate(-180deg);
    transition: transform $transitionTime;
  }
  #sidebar-icon-wrapper.is-deactive {
    transform: rotate(0deg);
    transition: transform $transitionTime;
  }
}
#header-container {
  @apply justify-between flex;
  // @apply bg-green-200;
  height: $headerHeight;
  width: 100%;
  border-bottom: 1px solid var(--el-border-color);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
}
</style>
