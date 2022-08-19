<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "Test",
  setup() {
    const testRef = ref({
      name: "123",
      age: "1234",
    });
    return { testRef };
  },
});
</script>

<style lang="scss" scoped></style>
