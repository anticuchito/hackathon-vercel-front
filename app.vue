<script setup lang="ts">
import { provideUseId } from '@headlessui/vue';
provideHeadlessUseId(provideUseId, {});
</script>
<template>
  <div id="dialog"></div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
