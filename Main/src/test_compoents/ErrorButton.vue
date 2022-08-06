<template>
  <button data-test="button" @click="throwError">Button</button>
  <button data-test="button1" @click="bugPromise">Button</button>
</template>
  
<script setup lang='ts'>
const throwError = () => {
  window.add.error = 'error'
} 
const bugPromise = function () {
  new Promise(function (resolve, reject) {
    window.someVar.error = 'error';
  })
}

</script>
  
<style>
  
</style>