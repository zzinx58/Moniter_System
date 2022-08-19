<script setup lang="ts">
import { inject, reactive, Ref, toRaw } from "vue";
import { ref } from "vue";
import { ErrorEventItemType } from "./eventPreview/types";
const count = ref(0);
const provideTest = inject("provideTest");

//Test-Start(大型Bug现场)
const props = defineProps<{
  msg: string;
  erroreventitemtestone: ErrorEventItemType;
  // erroreventitemtestone: Ref<ErrorEventItemType>;
  //加了Ref外框反而取不了值,被提示要加.value,之后虽然有提示，但是会报错。
}>();
const ErrorEventItemTestTwo = ref();
ErrorEventItemTestTwo.value = inject("ErrorEventItemTestTwo");
// ErrorEventItemTestTwo.value = inject<ErrorEventItemType>(
//   "ErrorEventItemTestTwo"
// );
const ErrorEventItemTestThree = ref();
const ReactiveThree = reactive(ErrorEventItemTestThree);
// const ErrorEventItemTestThreePromise = inject("ErrorEventItemTestThree") as ErrorEventItemType;
const ErrorEventItemTestThreePromise = inject(
  "ErrorEventItemTestThree"
) as Promise<ErrorEventItemType>;
// as Promise<ErrorEventItemType>
ErrorEventItemTestThreePromise.then((res) => {
  ErrorEventItemTestThree.value = res;
});
// const resultData = async function getResultData() {
//   console.log(await ErrorEventItem);
//   return await ErrorEventItem;
// };
// resultData();
</script>

<template>
  <div class="test-anime">
    <h1>{{ props.msg }}</h1>
    <div>{{ provideTest }}</div>
    <!-- <div>{{ props.erroreventitemtestone }}</div>
    <div>{{ ErrorEventItemTestTwo }}</div> -->
    <div>{{ ErrorEventItemTestThree }}</div>
    <!-- <div>{{ ReactiveThree }}</div> -->
    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p>
      Install
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
