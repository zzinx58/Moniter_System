<template>
  <Icon size="24" color="green">
    <ChevronDoubleDown16Filled />
  </Icon>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { Icon } from "@vicons/utils";
import { ChevronDoubleDown16Filled } from "@vicons/fluent";
export default defineComponent({
  name: "DoubleUp",
  components: {
    Icon,
    ChevronDoubleDown16Filled,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
