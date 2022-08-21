<template>
  <RouterView v-slot="{ Component }">
    <!-- <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutRight"
    > -->
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
    <!-- </Transition> -->
  </RouterView>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Main",
  setup() {
    const appConfig = useAppConfigStore();
    return { appConfig };
  },
});
</script>

<style lang="scss"></style>
