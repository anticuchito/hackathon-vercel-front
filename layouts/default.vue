<script setup lang="ts">
// import {  } from "";
import ChatBox from '@/components/ChatBox.vue';
import Nav from '~/components/Nav.vue';
</script>

<template>
  <!--TODO: make this  content changes when the user is loggedIn or not  -->
<header>

  <Nav />
</header>

  
  <main>
    <NuxtPage />
  </main>
 <!-- ChatBox Component -->
 <ChatBox />
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
</template>
