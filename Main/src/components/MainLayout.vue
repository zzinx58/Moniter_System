<template>
  <!-- <Suspense>
    <template #default>
      <Main />
    </template>
    <template #fallback>
      <div class="flex">
        <span class="mx-auto">Loading...</span>
      </div>
    </template>
  </Suspense> -->
  <Main />
  <Footer />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "MainLayout",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
