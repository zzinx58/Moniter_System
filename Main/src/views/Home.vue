<template>
  <ul class="router-links text-center">
    <li class="bg-indigo-300">
      <RouterLink to="/zzinx58" class="router-link">zzinx58</RouterLink>
    </li>
    <li class="bg-indigo-300">
      <RouterLink to="/zzinx58" class="router-link bg-yellow-300"
        >zzinx58</RouterLink
      >
    </li>
    <li class="bg-indigo-300">
      <RouterLink to="/show" 
        >数据展示区</RouterLink
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  setup() {},
});
</script>

<style lang="scss" scoped>
.router-links {
  li {
    margin-bottom: 10px;
  }
}
.router-link {
  padding-inline: 50%;
}
</style>
