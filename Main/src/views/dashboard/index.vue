<template>
  <div class="flow-data">
    <section class="flow-data">
      <div class="section-title">
        流量监控
        <QuestionCircleIcon class="icon1" />
      </div>
      <div class="flow-data-items">
        <div class="flow-data-item">
          <div class="item-name">浏览量(PV)</div>
          <div class="item-data">{{ Math.round(FlowData.PV) }}</div>
          <div class="compare-data">
            <span>较昨日:</span>
            <PercentageData :trendency-data="FlowDataTrendency.PV" />
          </div>
        </div>
        <div class="flow-data-item">
          <div class="item-name">访客数(UV)</div>
          <div class="item-data">
            <div class="item-data">{{ Math.round(FlowData.UV) }}</div>
          </div>
          <div class="compare-data">
            <span>较昨日:</span>
            <PercentageData :trendency-data="FlowDataTrendency.UV" />
          </div>
        </div>
        <div class="flow-data-item">
          <div class="item-name">新访客数</div>
          <div class="item-data">{{ Math.round(FlowData.newVistor) }}</div>
          <div class="compare-data">
            <span>较昨日:</span>
            <PercentageData :trendency-data="FlowDataTrendency.newVistor" />
          </div>
        </div>
        <div class="flow-data-item">
          <div class="item-name">IP数</div>
          <div class="item-data">{{ Math.round(FlowData.ipTotal) }}</div>
          <div class="compare-data">
            <span>较昨日:</span>
            <PercentageData :trendency-data="FlowDataTrendency.ipTotal" />
          </div>
        </div>
        <div class="flow-data-item">
          <div class="item-name">频次(人均)</div>
          <div class="item-data">{{ Math.round(FlowData.FPP) }}</div>
          <div class="compare-data">
            <span>较昨日:</span>
            <PercentageData :trendency-data="FlowDataTrendency.FPP" />
          </div>
        </div>
        <div class="flow-data-item">
          <div class="item-name">跳出率</div>
          <div class="item-data">{{ Math.round(FlowData.jumpOutRate) }}%</div>
          <div class="compare-data">
            <span>较昨日:</span>
            <PercentageData :trendency-data="FlowDataTrendency.jumpOutRate" />
          </div>
        </div>
      </div>
    </section>
    <section class="charts-scetion-one">
      <div class="section-title">流量趋势图</div>
      <div class="charts-wrapper">
        <FlowDataChart />
        <FlowDataChart />
      </div>
    </section>
    <section class="charts-scetion-one">
      <div class="section-title">异常事件数量</div>
      <div class="charts-wrapper">
        <FlowDataChart />
        <FlowDataChart />
      </div>
    </section>
    <section class="charts-scetion-one">
      <div class="section-title">资源</div>
      <div class="charts-wrapper">
        <FlowDataChart />
        <FlowDataChart />
      </div>
    </section>
    <section class="charts-scetion-one">
      <div class="section-title">访客和地区</div>
      <div class="charts-wrapper">
        <FlowDataChart />
        <FlowDataChart />
      </div>
    </section>
    <section class="charts-scetion-one">
      <div class="section-title">网络请求</div>
      <div class="charts-wrapper">
        <FlowDataChart />
        <FlowDataChart />
      </div>
    </section>
    <section class="charts-scetion-one">
      <div class="section-title">用户设备</div>
      <div class="charts-wrapper">
        <FlowDataChart />
        <FlowDataChart />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { TrendencyDataType } from "@/components/common/datapreview/PercentageData.vue";
import useAppConfigStore from "@/store/AppConfig";
import { useTransition, TransitionPresets } from "@vueuse/core";
import axios from "axios";
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeMount,
  toRefs,
} from "vue";
interface FlowDataObject {
  PV: number;
  UV: number;
  newVistor: number;
  ipTotal: number;
  FPP: number;
  jumpOutRate: number;
}
interface FlowDataTrendencyObject {
  PV: TrendencyDataType;
  UV: TrendencyDataType;
  newVistor: TrendencyDataType;
  ipTotal: TrendencyDataType;
  FPP: TrendencyDataType;
  jumpOutRate: TrendencyDataType;
}

// interface FlowDataTrendencyObject {
//   PV: {
//     type: "up" | "down";
//     rate: number;
//   };
//   UV: {
//     type: "up" | "down";
//     rate: number;
//   };
//   newVistor: {
//     type: "up" | "down";
//     rate: number;
//   };
//   ipTotal: {
//     type: "up" | "down";
//     rate: number;
//   };
//   FPP: {
//     type: "up" | "down";
//     rate: number;
//   };
//   jumpOutRate: {
//     type: "up" | "down";
//     rate: number;
//   };
// }
export const defaultFlowData = {
  PV: 0,
  UV: 0,
  newVistor: 0,
  ipTotal: 0,
  FPP: 0,
  jumpOutRate: 0,
} as FlowDataObject;
export const defaultFlowTrendencyData = {
  PV: {
    type: "up",
    rate: 0,
  },
  UV: {
    type: "up",
    rate: 0,
  },
  newVistor: {
    type: "up",
    rate: 0,
  },
  ipTotal: {
    type: "up",
    rate: 0,
  },
  FPP: {
    type: "up",
    rate: 0,
  },
  jumpOutRate: {
    type: "up",
    rate: 0,
  },
} as FlowDataTrendencyObject;
export default defineComponent({
  name: "DashBoard",
  setup() {
    const test = ref(0);
    const test_output = useTransition(test, {
      duration: 4500,
      transition: TransitionPresets.easeOutExpo,
    });
    test.value = 5006;
    // const FlowDataRef = ref<FlowDataObject>(defaultFlowData);
    // const FlowDataTrendencyRef = ref<FlowDataTrendencyObject>(
    //   defaultFlowTrendencyData
    // );
    const appConfig = useAppConfigStore();
    const FlowData = ref<FlowDataObject>(defaultFlowData);
    const FlowDataTrendency = ref<FlowDataTrendencyObject>(
      defaultFlowTrendencyData
    );
    //使用any类型进行开发提速
    onMounted(async () => {
      const getFlowData = await axios.post("/getFlowData");
      const getFlowDataTrendency = await axios.post("/FlowDataTrendency");
      FlowData.value = reactive(getFlowData.data.data);
      FlowDataTrendency.value = reactive(getFlowDataTrendency.data.data);
      // FlowDataRef.value = reactive(getFlowData.data.data);
      // FlowDataTrendencyRef.value = reactive(getFlowDataTrendency.data.data);
    });
    return { test, test_output, FlowData, FlowDataTrendency, appConfig };
  },
});
</script>

<style lang="scss" scoped>
.charts-scetion-one {
  @apply p-8;
  border-top: 1px solid var(--el-border-color);
  .charts-wrapper {
    @apply flex flex-wrap;
  }
}
.compare-data {
  @apply flex;
}
.section-title {
  @apply flex ml-3;
  font-size: 22px;
  font-weight: 600;
  .icon1 {
    @apply flex my-auto ml-1;
  }
}
.flow-data-items {
  @apply flex justify-around items-center p-3;
  // @apply bg-blue-300;
  width: 100%;
  .flow-data-item {
    @apply flex flex-col py-5;
    font-size: 14px;

    .item-name {
      @apply mx-auto;
    }
    .item-data {
      @apply mx-auto;
      font-weight: 700;
      font-size: 28px;
    }
    .compare-data {
      @apply;
      font-size: 14px;
    }
  }
}
</style>
