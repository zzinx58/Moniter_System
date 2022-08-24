<template>
  <div id="errorPreview-page-wrapper">
    <div
      class="errorPreview-left-side"
      :class="
        appConfig.deviceType === 'mobile'
          ? 'is-close'
          : appConfig.deviceType === 'pad'
          ? 'is-pad'
          : 'is-open'
      "
    >
      <ElMenu>
        <ElMenuItem>12231</ElMenuItem>
      </ElMenu>
      <div id="event-list-container" class="is-open">
        <!--  -->
        <div
          class="event-item-container"
          v-for="(item, index) in ErrorEventList"
        >
          <!-- :key="index" -->
          <div class="event-item" @click="onSelect(index)">
            <div class="event-item-line">
              <div class="EventItemType">
                Type:{{ item.summaryInfo.eventType }}
              </div>
              <div class="EventItemTime">
                Time:{{ item.summaryInfo.timeStamp }}
              </div>
            </div>
            <div class="event-item-line">
              <div class="EventItemDescription">
                Desc:{{ item.summaryInfo.description }}
              </div>
            </div>
            <div class="event-item-line">
              <div class="EventItemPlatform">Chrome</div>
              <div class="EventItemLocation">
                {{ item.locationInfo.location }}
              </div>
            </div>
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
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import useErrorEventItemStore from "@/store/ErrorEventItem";
import { ErrorEventItemType } from "./eventPreview/types";
export default defineComponent({
  name: "ErrorPreview",
  setup() {
    const appConfig = useAppConfigStore();
    const ErrorEventItemStore = useErrorEventItemStore();
    const ErrorEventList = ref<Array<ErrorEventItemType>>();
    onMounted(async () => {
      const ErrorEventItemStore = useErrorEventItemStore();
      const reqResult = async () => {
        const result = await axios.post("/getErrorEventList");
        // ErrorEventList = result.data.data;
        ErrorEventList.value = result.data.data as Array<ErrorEventItemType>;
        return result.data.data[0];
      };
      const data: ErrorEventItemType = await reqResult();
      ErrorEventItemStore.changeErrorEventItemInstance(data);
    });
    const onSelect = (ind: number) => {
      console.log(ind);
      ErrorEventList.value?.forEach((item: ErrorEventItemType, index) => {
        if (ind == index) {
          ErrorEventItemStore.changeErrorEventItemInstance(item);
          console.log(ind, index);
          const EventItemList = document.getElementsByClassName("event-item");
          if (EventItemList[ind].className == "event-item") {
            for (let i = 0; i < EventItemList.length; i++) {
              EventItemList[i].className = "event-item";
            }
            EventItemList[ind].classList.add("test-class");
          }
        }
      });
    };
    return { appConfig, ErrorEventItemStore, ErrorEventList, onSelect };
  },
});
</script>

<style lang="scss" scoped>
.test-class {
  // @apply bg-red-300;
  border-left: 3px solid v-bind("appConfig.themeColor");
  // border-style: inset;
  background-color: var(--el-menu-hover-bg-color);
  margin: -8px;
  padding: 8px;
  padding-left: 4px;
}
.errorPreview-left-side {
  // @apply bg-yellow-300;
  @apply flex-none;
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color);
  overflow: auto;
  .el-menu {
    border: 0;
  }
  .event-item-container {
    width: 300px;
    &:hover {
      background-color: var(--el-menu-hover-bg-color);
    }
  }
}
.event-item-container {
  @apply flex flex-col p-2;
  border: 1px solid var(--el-border-color);
  box-sizing: border-box;
  .event-item-line {
    @apply flex justify-between;
    // @apply bg-yellow-400;
  }
}

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
  min-height: calc(100vh - $headerHeight - 25px);
}

.is-open {
  height: calc(100vh - $headerHeight - 25px);
}
.is-pad {
  // @apply bg-blue-200;
  transition: width 1s;
  width: 300px;
}
.is-close {
  transition: width 1s;
  width: 0px;
}
#errorPreview-right-side {
  // @apply bg-blue-400;
  @apply flex-grow;
  // height: 100%;
}
</style>
