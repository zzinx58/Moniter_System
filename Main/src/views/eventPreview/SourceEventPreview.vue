<template>
  <ElTabs type="border-card" :style="{ height: 100 + '%' }">
    <ElTabPane label="基本信息">
      <div
        class="Info-container"
        :class="appConfig.deviceType !== 'pc' ? 'show-two-columns' : ''"
      >
        <div id="Info-content-one">
          <div class="Info-section-one">
            <ElDescriptions title="概要信息" :column="1">
              <ElDescriptions-item label="时间" label-align="left">
                {{ main.summaryInfo.timeStamp }}
              </ElDescriptions-item>
              <ElDescriptions-item label="Title" label-align="left">
                {{ main.summaryInfo.description }}
              </ElDescriptions-item>
              <ElDescriptions-item label="类型" label-align="left">
                {{ main.summaryInfo.eventType }}
              </ElDescriptions-item>
              <ElDescriptions-item label="URL" label-align="left">
                {{ main.summaryInfo.URL }}
              </ElDescriptions-item>
            </ElDescriptions>
          </div>
          <ElDivider />
          <div class="Info-section-two">
            <ElDescriptions title="资源信息" :column="1">
              <ElDescriptions-item label="outerHTML" label-align="left">{{
                main.sourceInfo.outerHTML
              }}</ElDescriptions-item>
              <ElDescriptions-item label="src" label-align="left">{{
                main.sourceInfo.src
              }}</ElDescriptions-item>
              <ElDescriptions-item label="tagName" label-align="left">{{
                main.sourceInfo.tagName
              }}</ElDescriptions-item>
              <ElDescriptions-item label="XPath" label-align="left">{{
                main.sourceInfo.XPath
              }}</ElDescriptions-item>
              <ElDescriptions-item label="selector" label-align="left">{{
                main.sourceInfo.selector
              }}</ElDescriptions-item>
              <ElDescriptions-item label="timeStamp" label-align="left">{{
                main.sourceInfo.timeStamp
              }}</ElDescriptions-item>
              <ElDescriptions-item label="status" label-align="left">{{
                main.sourceInfo.status
              }}</ElDescriptions-item>
            </ElDescriptions>
          </div>
          <ElDivider />
          <div class="Info-section-three">
            <ElDescriptions title="设备信息" :column="1">
              <ElDescriptions-item label="浏览器" label-align="left">{{
                main.deviceInfo.browser
              }}</ElDescriptions-item>
              <ElDescriptions-item label="JS引擎" label-align="left">{{
                main.deviceInfo.JSEngine
              }}</ElDescriptions-item>
              <ElDescriptions-item label="操作系统" label-align="left">{{
                main.deviceInfo.operationSystem
              }}</ElDescriptions-item>
              <ElDescriptions-item label="设备" label-align="left">{{
                main.deviceInfo.device
              }}</ElDescriptions-item>
            </ElDescriptions>
          </div>
          <ElDivider v-if="appConfig.deviceType !== 'pc'" />
        </div>
        <div id="Info-content-two">
          <div class="Info-section-four">
            <ElDescriptions title="位置信息" :column="1">
              <ElDescriptions-item label="IP" label-align="left">
                {{ main.locationInfo.IP }}
              </ElDescriptions-item>
              <ElDescriptions-item label="地点" label-align="left">
                {{ main.locationInfo.location }}
              </ElDescriptions-item>
              <ElDescriptions-item label="运营商" label-align="left">{{
                main.locationInfo.supplier
              }}</ElDescriptions-item>
            </ElDescriptions>
          </div>
          <ElDivider />
          <div class="Info-section-five">
            <ElDescriptions title="其他信息" :column="1">
              <ElDescriptions-item label="插件版本" label-align="left">{{
                main.otherInfo.pluginVersion
              }}</ElDescriptions-item>
              <ElDescriptions-item label="事件ID" label-align="left">{{
                main.otherInfo.eventID
              }}</ElDescriptions-item>
              <ElDescriptions-item label="userAgent" label-align="left">{{
                main.otherInfo.userAgent
              }}</ElDescriptions-item>
            </ElDescriptions>
          </div>
        </div>
      </div>
    </ElTabPane>
    <ElTabPane label="场景重现">场景重现</ElTabPane>
    <ElTabPane label="用户行为">
      <ElTimeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :type="(activity.type as any)"
          :color="activity.color"
          :size="(activity.size as any)"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </ElTimeline>
    </ElTabPane>
    <ElTabPane label="性能表现">
      <div class="json-content" v-html="'<pre>' + JSONContent + '</pre>'"></div>
    </ElTabPane>
  </ElTabs>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import useErrorEventItemStore from "@/store/ErrorEventItem";
import { storeToRefs } from "pinia";
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeMount,
  onMounted,
  ref,
} from "vue";
export default defineComponent({
  name: "SourceEventPreview",
  setup() {
    const appConfig = useAppConfigStore();
    const ErrorEventItemStore = useErrorEventItemStore();
    const { ErrorEventItemInstance: main } = storeToRefs(ErrorEventItemStore);
    const JSONContent = computed(() => JSON.stringify(main.value, null, " "));
    const activities = [
      {
        content: "Custom icon",
        timestamp: "2018-04-12 20:46",
        size: "large",
        type: "primary",
      },
      {
        content: "Custom color",
        timestamp: "2018-04-03 20:46",
        color: "#0bbd87",
      },
      {
        content: "Custom size",
        timestamp: "2018-04-03 20:46",
        size: "large",
      },
      {
        content: "Custom hollow",
        timestamp: "2018-04-03 20:46",
        type: "primary",
        hollow: true,
      },
      {
        content: "Default node",
        timestamp: "2018-04-03 20:46",
      },
    ];
    return {
      appConfig,
      ErrorEventItemStore,
      main,
      JSONContent,
      activities,
    };
  },
});
</script>

<style lang="scss" scoped>
.json-content {
  @apply flex;
  font-size: 14px;
  :deep(pre) {
    white-space: pre-wrap;
  }
}

.Info-container {
  @apply;
  @apply flex;
  min-height: calc(100vh - $headerHeight - 95px);
}

.show-two-columns {
  @apply;
  @apply flex-col;
}

#Info-content-one {
  @apply;
  @apply pr-5;
  flex: 3;
}

#Info-content-two {
  @apply;
  @apply;
  flex: 3;
}
</style>
