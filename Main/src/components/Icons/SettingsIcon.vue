<template>
  <Icon>
    <Settings16Regular />
  </Icon>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { Icon } from "@vicons/utils";
import { Settings16Regular } from "@vicons/fluent";
export default defineComponent({
  name: "SettingsIcon",
  components: {
    Icon,
    Settings16Regular,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
