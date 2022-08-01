<template>
  <button data-tests="button" @click="throwError">Button</button>
</template>
  
<script setup lang='ts'>
const throwError = () => {
  window.add.error = 'error'
} 
</script>
  
<style>
  
</style>