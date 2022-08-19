<template>
  <Icon size="30">
    <Menu />
  </Icon>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { Menu } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
export default defineComponent({
  name: "MenuWrapper",
  components: {
    Icon,
    Menu,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
