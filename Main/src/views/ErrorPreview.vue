<template>
  <div id="errorPreview-page-wrapper">
    <div
      class="errorPreview-left-side"
      :class="appConfig.deviceType === 'mobile' ? 'is-close' : 'is-open'"
    >
      <ElMenu>
        <ElMenuItem>123</ElMenuItem>
      </ElMenu>
      <div id="event-list-container">
        <!--  -->
        <div class="event-item-container">
          <div class="event-item-line">
            <div class="EventItemType">{{}}</div>
            <div class="EventItemTime">{{}}</div>
          </div>
          <div class="event-item-line">
            <div class="EventItemDescription">{{}}</div>
          </div>
          <div class="event-item-line">
            <div class="EventItemPlatform">{{}}</div>
            <div class="EventItemLocation">{{}}</div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <div id="mobile-menu-wrapper" v-if="appConfig.deviceType === 'mobile'">
      <div class="circle-help">
        <MenuWrapper />
      </div>
    </div>
    <div id="errorPreview-right-side">
      <SourceEventPreview />
      <!--  -->
    </div>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import {
  defineComponent,
  ref,
  reactive,
  provide,
  onMounted,
  computed,
} from "vue";
import axios from "axios";
import useErrorEventItemStore from "@/store/ErrorEventItem";
export default defineComponent({
  name: "ErrorPreview",
  setup() {
    const appConfig = useAppConfigStore();
    const ErrorEventItemStore = useErrorEventItemStore();
    onMounted(async () => {
      const result = await axios.post("/getErrorEventList");
      ErrorEventItemStore.changeErrorEventItemInstance(result.data.data);
    });
    return { appConfig, ErrorEventItemStore };
  },
});
</script>

<style lang="scss" scoped>
.circle-help {
  @apply flex items-center justify-center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 3px solid var(--el-border-color);
  background: var(--el-bg-color);
}
#mobile-menu-wrapper {
  @apply fixed;
  z-index: 999;
  bottom: 60px;
  right: 80px;
  &:hover {
    cursor: pointer;
  }
}

#errorPreview-page-wrapper {
  @apply;
  @apply flex;
  width: 100%;
  min-height: calc(100vh - $headerHeight - 25px);
}
.errorPreview-left-side {
  // @apply bg-yellow-300;
  @apply;
  @apply flex-none;
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color);
  .el-menu {
    border: 0;
  }
}
.is-open {
  transition: width 1s;
  width: 300px;
}
.is-close {
  transition: width 1s;
  width: 8px;
}
#errorPreview-right-side {
  @apply bg-blue-400;
  @apply;
  @apply flex-grow;
  height: 100%;
}
</style>
