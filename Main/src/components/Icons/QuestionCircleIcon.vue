<template>
  <div class="question-icon-class">
    <Icon>
      <QuestionCircle16Regular />
    </Icon>
  </div>
</template>

<script lang="ts">
import { Icon } from "@vicons/utils";
import { defineComponent, ref, reactive } from "vue";
import { QuestionCircle16Regular } from "@vicons/fluent";
import useAppConfigStore from "@/store/AppConfig";
export default defineComponent({
  name: "QuestionCircleIcon",
  components: {
    Icon,
    QuestionCircle16Regular,
  },
  setup() {
    const appConfig = useAppConfigStore();
    return { appConfig };
  },
});
</script>

<style lang="scss" scoped>
.question-icon-class {
  color: v-bind("appConfig.themeColor");
}
</style>
