
<template>
  <button data-test="button" @click="bugPromise">Button</button>
</template>
  
<script setup lang='ts'>
const bugPromise = function () {
   return new Promise(function (resolve, reject) {
        window.someVar.error = 'error';
    })
}
</script>
  
<style>
  
</style>