<template>
  <div :class="trendencyData.type === 'up' ? 'is-rise' : 'is-decline'">
    {{ trendencyData.rate }}%
    <div class="trendency-type">
      <DoubleDown v-if="trendencyData.type === 'down'" />
      <DoubleUp v-if="trendencyData.type === 'up'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType } from "vue";
export enum UpOrDownType {
  UP = "up",
  DOWN = "down",
}
export interface TrendencyDataType {
  type: UpOrDownType;
  rate: Number;
}
export default defineComponent({
  name: "PercentageData",
  props: {
    trendencyData: {
      type: Object as PropType<TrendencyDataType>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.is-rise {
  @apply flex;
  color: #71efa3;
  .trendency-type {
    @apply flex my-auto;
  }
}
.is-decline {
  @apply flex;
  color: #ff3d68;
  .trendency-type {
    @apply flex my-auto;
  }
}
</style>
