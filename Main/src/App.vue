<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
