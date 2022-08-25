<template>
  <Icon>
    <ChevronDoubleUp16Filled />
  </Icon>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { Icon } from "@vicons/utils";
import { ChevronDoubleUp16Filled } from "@vicons/fluent";
export default defineComponent({
  name: "DoubleUp",
  components: {
    Icon,
    ChevronDoubleUp16Filled,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
