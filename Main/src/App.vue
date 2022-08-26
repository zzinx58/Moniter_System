<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    localStorage.setItem("vueuse-color-scheme", "dark");
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
