<template>
  <ElButton type="primary">123456</ElButton>
  <el-button type="danger">456789</el-button>
  <RouterView></RouterView>
  <OrderChart/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Test1",
});
</script>

<style scoped></style>
