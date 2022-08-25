<template>
  <div class="cA m-auto mt-15">
    <div ref="orderChartWrapper" style="height: 100%"></div>
  </div>
</template>
<style>
.cA {
  height: 400px;
  width: 700px;
}
</style>
<script lang="ts">
import useEcharts from "@/hooks/useEcharts";
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { dispose } from "echarts";

export default defineComponent({
  name: "FlowDataChart",
  setup() {
    const loading = ref(true);
    const orderChartWrapper = ref<HTMLDivElement | null>(null);
    const init = () => {
      const option = {
        title: {
          text: "流量趋势图",
          textStyle: {
            color: "#ffffff",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["PV", "UV", "newVistor", "ipTotal", "FPP"],
          textStyle: {
            color: "#ffffff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          // iconStyle: {
          //   color: "#ffffff",
          // },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            textStyle: {
              color: "#ffffff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#ffffff",
            },
          },
        },
        // data: ["PV", "UV", "newVistor", "ipTotal", "FPP"],
        series: [
          {
            name: "PV",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "UV",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "newVistor",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "ipTotal",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "FPP",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      setTimeout(() => {
        loading.value = false;
        nextTick(() => {
          useEcharts(orderChartWrapper.value as HTMLDivElement).setOption(
            option
          );
        });
      }, 100);
    };
    const updateChart = () => {
      useEcharts(orderChartWrapper.value as HTMLDivElement).resize();
    };
    onMounted(init);
    onBeforeUnmount(() => {
      dispose(orderChartWrapper.value as HTMLDivElement);
    });
    return {
      loading,
      orderChartWrapper,
      updateChart,
    };
  },
});
</script>

<style lang="scss"></style>
