<script setup>
const {
  path
} = useRoute();
</script>

<template>
  <UApp>
    <NuxtPage :key="path" />
  </UApp>
</template>

