<script setup lang="ts">
import ExampleModal from './example-modal.vue';

definePageMeta({
  layout: 'not-logged-in',
});

const open = ref(false);
const openModal = () => {
  console.log('Open Modal');
  open.value = !open.value;
};
</script>

<template>
  <button @click="openModal">Open Modal</button>
  <ExampleModal v-model:open="open" />
</template>

<style scoped></style>
