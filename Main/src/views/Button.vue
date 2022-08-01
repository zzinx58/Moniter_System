<template>
  <button data-tests="button" @click="throwError">Button</button>
</template>
  
<script setup lang='ts'>
const throwError = () => {
  throw new Error('Test error');
} 
</script>
  
<style>
  
</style>