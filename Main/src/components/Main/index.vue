<template>
  <RouterView v-slot="{ Component }">
    <Transition @enter="onEnter">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script lang="ts">
import useAppConfigStore from "@/store/AppConfig";
import { defineComponent } from "vue";
import { useSlideInUp } from "@/hooks/useAnimate";
export default defineComponent({
  name: "Main",
  setup() {
    const appConfig = useAppConfigStore();
    function onEnter(el: HTMLDivElement) {
      useSlideInUp(el.className, "1.5s");
    }
    return { appConfig, onEnter };
  },
});
</script>

<style lang="scss" scoped></style>
