<template>
  <div>
    <HelloWorld
      :msg="'123456'"
      :erroreventitemtestone="ErrorEventItemTestOne"
    />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, reactive, provide, onMounted } from "vue";
export default defineComponent({
  name: "Test",
  setup() {
    provide("provideTest", "provideTesting");
    const ErrorEventItemTestOne = ref();
    const ErrorEventItemTestTwo = ref();

    const testData = new Promise((resolve, reject) => {
      onMounted(async () => {
        const result = await axios.post("/getErrorEventList");
        ErrorEventItemTestOne.value = result.data.data[0];
        ErrorEventItemTestTwo.value = result.data.data[0];
        resolve(result.data.data[0]);
      });
    });
    // provide("ErrorEventItem", testData);
    provide("ErrorEventItemTestTwo", ErrorEventItemTestTwo);
    provide("ErrorEventItemTestThree", testData);
    return { ErrorEventItemTestOne };
  },
});
</script>

<style lang="scss" scoped></style>
