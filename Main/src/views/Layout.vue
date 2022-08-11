<template>
  <div>
    <div>
      <Header />
    </div>
    <Sidebar />
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useHandleResize from "@/hooks/useHandleResize";
import useAppConfigStore from "@/store/AppConfig";
export default defineComponent({
  name: "Home",
  setup() {
    const appConfig = useAppConfigStore();
    useHandleResize();
    return {
      appConfig,
    };
  },
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
.main {
  position: absolute;
  top: $headerHeight;
  left: 200px;
  right: 0;
  margin: 10px;
}
</style>
