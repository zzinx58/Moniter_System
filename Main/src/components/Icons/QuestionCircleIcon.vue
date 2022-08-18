<template>
  <Icon size="24" color="grey">
    <QuestionCircle16Regular />
  </Icon>
</template>

<script lang="ts">
import { Icon } from "@vicons/utils";
import { defineComponent, ref, reactive } from "vue";
import { QuestionCircle16Regular } from "@vicons/fluent";
export default defineComponent({
  name: "QuestionCircleIcon",
  components: {
    Icon,
    QuestionCircle16Regular,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
