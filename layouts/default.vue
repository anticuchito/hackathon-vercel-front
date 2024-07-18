<script setup lang="ts">
// import {  } from "";
</script>

<template>
  <!--TODO: make this  content changes when the user is loggedIn or not  -->
  <header class="bg-background text-foreground py-2 px-4 md:px-6 border-b">
    <div class="flex justify-between items-center max-w-4xl mx-auto">
      <nav class="flex gap-4">
        <a class="hover:underline text-sm" href="#">
          Presupuestos recomendados
        </a>
        <a class="hover:underline text-sm" href="#">
          Presupuestos generados por la comunidad
        </a>
        <a class="hover:underline text-sm" href="#"> Vuelos </a>
        <a class="hover:underline text-sm" href="#"> Hoteles </a>
      </nav>
    </div>
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
</template>
