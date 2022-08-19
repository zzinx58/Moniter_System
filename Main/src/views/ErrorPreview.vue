<template>
  <div id="errorPreview-page-wrapper">
    <div
      class="errorPreview-left-side"
      :class="appConfig.deviceType === 'mobile' ? 'is-close' : 'is-open'"
    >
      <ElMenu>
        <ElMenuItem>123</ElMenuItem>
      </ElMenu>
    </div>
    <div id="mobile-menu-wrapper" v-if="appConfig.deviceType === 'mobile'">
      <div class="circle-help">
        <MenuWrapper />
      </div>
    </div>
    <div id="errorPreview-right-side">
      <ElTabs type="border-card" :style="{ height: 100 + '%' }">
        <ElTabPane label="基本信息">
          <div
            class="Info-container"
            :class="appConfig.deviceType !== 'pc' ? 'show-two-columns' : ''"
          >
            <div id="Info-content-one">
              <div class="Info-section-one">
                <ElDescriptions title="概要信息" :column="1">
                  <ElDescriptions-item label="时间" label-align="left"
                    >1231</ElDescriptions-item
                  >
                  <ElDescriptions-item
                    label="Title"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="类型"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="URL"
                    label-align="left"
                  ></ElDescriptions-item>
                </ElDescriptions>
              </div>
              <ElDivider />
              <div class="Info-section-two">
                <ElDescriptions title="资源信息" :column="1">
                  <ElDescriptions-item label="outerHTML" label-align="left"
                    >123456</ElDescriptions-item
                  >
                  <ElDescriptions-item
                    label="src"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="tagName"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="XPath"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="selector"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="timeStamp"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="status"
                    label-align="left"
                  ></ElDescriptions-item>
                </ElDescriptions>
              </div>
              <ElDivider />
              <div class="Info-section-three">
                <ElDescriptions title="设备信息" :column="1">
                  <ElDescriptions-item label="浏览器" label-align="left"
                    >123456</ElDescriptions-item
                  >
                  <ElDescriptions-item
                    label="JS引擎"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="操作系统"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="设备"
                    label-align="left"
                  ></ElDescriptions-item>
                </ElDescriptions>
              </div>
              <ElDivider v-if="appConfig.deviceType !== 'pc'" />
            </div>
            <div id="Info-content-two">
              <div class="Info-section-four">
                <ElDescriptions title="位置信息" :column="1">
                  <ElDescriptions-item label="IP" label-align="left">
                    work for them work for themwork for themwork for themwork
                    for themwork for themwork for themwork for themwork for
                    themwork for themwork for them
                  </ElDescriptions-item>
                  <ElDescriptions-item label="地点" label-align="left">
                  </ElDescriptions-item>
                  <ElDescriptions-item
                    label="运营商"
                    label-align="left"
                  ></ElDescriptions-item>
                </ElDescriptions>
              </div>
              <ElDivider />
              <div class="Info-section-five">
                <ElDescriptions title="其他信息" :column="1">
                  <ElDescriptions-item label="插件版本" label-align="left"
                    >123456</ElDescriptions-item
                  >
                  <ElDescriptions-item
                    label="事件ID"
                    label-align="left"
                  ></ElDescriptions-item>
                  <ElDescriptions-item
                    label="userAgent"
                    label-align="left"
                  ></ElDescriptions-item>
                </ElDescriptions>
              </div>
            </div>
          </div>
        </ElTabPane>
        <ElTabPane label="场景重现">场景重现</ElTabPane>
        <ElTabPane label="用户行为">用户行为</ElTabPane>
        <ElTabPane label="性能表现">性能表现</ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "ErrorPreview",
  setup() {
    const appConfig = useAppConfigStore();
    return { appConfig };
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
.Info-container {
  @apply;
  @apply flex;
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
#errorPreview-page-wrapper {
  @apply;
  @apply flex;
  width: 100%;
  height: calc(100vh - $headerHeight - 25px);
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
