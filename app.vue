<script setup>
const {
  path
} = useRoute();
</script>

<template>
  <div>
    <NuxtPage :key="path" />
  </div>
</template>

