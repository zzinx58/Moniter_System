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
                {{ SummaryInfo.timeStamp }}
              </ElDescriptions-item>
              <ElDescriptions-item label="Title" label-align="left">
                {{ SummaryInfo.description }}
              </ElDescriptions-item>
              <ElDescriptions-item label="类型" label-align="left">
                {{ SummaryInfo.eventType }}
              </ElDescriptions-item>
              <ElDescriptions-item label="URL" label-align="left">
                {{ SummaryInfo.URL }}
              </ElDescriptions-item>
            </ElDescriptions>
          </div>
          <ElDivider />
          <div class="Info-section-two">
            <ElDescriptions title="资源信息" :column="1">
              <ElDescriptions-item label="outerHTML" label-align="left">{{
                SourceInfo.outerHTML
              }}</ElDescriptions-item>
              <ElDescriptions-item label="src" label-align="left">{{
                SourceInfo.src
              }}</ElDescriptions-item>
              <ElDescriptions-item label="tagName" label-align="left">{{
                SourceInfo.tagName
              }}</ElDescriptions-item>
              <ElDescriptions-item label="XPath" label-align="left">{{
                SourceInfo.XPath
              }}</ElDescriptions-item>
              <ElDescriptions-item label="selector" label-align="left">{{
                SourceInfo.selector
              }}</ElDescriptions-item>
              <ElDescriptions-item label="timeStamp" label-align="left">{{
                SourceInfo.timeStamp
              }}</ElDescriptions-item>
              <ElDescriptions-item label="status" label-align="left">{{
                SourceInfo.status
              }}</ElDescriptions-item>
            </ElDescriptions>
          </div>
          <ElDivider />
          <div class="Info-section-three">
            <ElDescriptions title="设备信息" :column="1">
              <ElDescriptions-item label="浏览器" label-align="left">{{
                DeviceInfo.browser
              }}</ElDescriptions-item>
              <ElDescriptions-item label="JS引擎" label-align="left">{{
                DeviceInfo.JSEngine
              }}</ElDescriptions-item>
              <ElDescriptions-item label="操作系统" label-align="left">{{
                DeviceInfo.operationSystem
              }}</ElDescriptions-item>
              <ElDescriptions-item label="设备" label-align="left">{{
                DeviceInfo.device
              }}</ElDescriptions-item>
            </ElDescriptions>
          </div>
          <ElDivider v-if="appConfig.deviceType !== 'pc'" />
        </div>
        <div id="Info-content-two">
          <div class="Info-section-four">
            <ElDescriptions title="位置信息" :column="1">
              <ElDescriptions-item label="IP" label-align="left">
                {{ LocationInfo.IP }}
              </ElDescriptions-item>
              <ElDescriptions-item label="地点" label-align="left">
                {{ LocationInfo.location }}
              </ElDescriptions-item>
              <ElDescriptions-item label="运营商" label-align="left">{{
                LocationInfo.supplier
              }}</ElDescriptions-item>
            </ElDescriptions>
          </div>
          <ElDivider />
          <div class="Info-section-five">
            <ElDescriptions title="其他信息" :column="1">
              <ElDescriptions-item label="插件版本" label-align="left">{{
                OtherInfo.pluginVersion
              }}</ElDescriptions-item>
              <ElDescriptions-item label="事件ID" label-align="left">{{
                OtherInfo.eventID
              }}</ElDescriptions-item>
              <ElDescriptions-item label="userAgent" label-align="left">{{
                OtherInfo.userAgent
              }}</ElDescriptions-item>
            </ElDescriptions>
          </div>
        </div>
      </div>
    </ElTabPane>
    <ElTabPane label="场景重现">场景重现</ElTabPane>
    <ElTabPane label="用户行为">用户行为</ElTabPane>
    <ElTabPane label="性能表现">性能表现</ElTabPane>
  </ElTabs>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import useErrorEventItemStore from "@/store/ErrorEventItem";
import { defineComponent, ref, reactive, inject } from "vue";
export default defineComponent({
  name: "SourceEventPreview",
  setup() {
    const appConfig = useAppConfigStore();
    const ErrorEventItem = useErrorEventItemStore().ErrorEventItemInstance;
    const OtherInfo = ErrorEventItem.otherInfo;
    const SummaryInfo = ErrorEventItem.summaryInfo;
    const SourceInfo = ErrorEventItem.sourceInfo;
    const LocationInfo = ErrorEventItem.locationInfo;
    const DeviceInfo = ErrorEventItem.deviceInfo;
    // const {deviceInfo, locationInfo, ...} = ErrorEventItem;
    return {
      appConfig,
      ErrorEventItem,
      OtherInfo,
      SummaryInfo,
      SourceInfo,
      LocationInfo,
      DeviceInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
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
