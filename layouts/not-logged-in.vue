<template>
  <div>
    <header class="bg-background text-foreground py-2 px-4 md:px-6 border-b">
      <notLoggedNavbar />
    </header>
    <main>
      <NuxtPage />
    </main>

    <!-- <footer
    class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
  >
    <p class="text-xs text-muted-foreground">
      © 2024 Acme Inc. All rights reserved.
    </p>
    <nav class="sm:ml-auto flex gap-4 sm:gap-6">
      <a class="text-xs hover:underline underline-offset-4" href="#">
        Terms of Service
      </a>
      <a class="text-xs hover:underline underline-offset-4" href="#">
        Privacy
      </a>
    </nav>
  </footer> -->
  </div>
</template>

<script setup lang="ts">
import notLoggedNavbar from '../components/not-logged-navbar.vue';
</script>

<style scoped></style>
