<script setup lang="ts">
definePageMeta({
  layout: 'not-logged-in',
});
</script>

<!-- this is home page for landing -->
<template>
  <div class="flex flex-col min-h-[100dvh]">
    <main class="flex-1">
      <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div class="container px-4 md:px-6">
          <div
            class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
          >
            <div class="flex flex-col justify-center space-y-4">
              <div class="space-y-2">
                <h1
                  class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                >
                  Unlock the Power of Acme App
                </h1>
                <!-- change this -->
                <p class="max-w-[600px] text-muted-foreground md:text-xl">
                  Acme App is a powerful tool that helps you streamline your
                  workflow and boost your productivity. Get started today!
                </p>
              </div>
              <div class="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Get Started
                </a>
              </div>
            </div>
            <!-- ? here maybe put a video how interact with the app -->
            <img
              src="https://generated.vusercontent.net/placeholder.svg"
              width="550"
              height="550"
              alt="Hero"
              class="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
