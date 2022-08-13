<template>
  <div class="header"><Header /></div>
  <div class="main"></div>
  <div class="footer"></div>
</template>

<script lang="ts">
import useHandleResize from "@/hooks/useHandleResize";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "CSSTest",
  setup() {
    useHandleResize();
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
