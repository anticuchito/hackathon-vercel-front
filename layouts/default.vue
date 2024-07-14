<script setup lang="ts">
// import {  } from "";
</script>

<template>
  <!--TODO: make this  content changes when the user is loggedIn or not  -->
  <header class="px-4 lg:px-6 h-14 flex items-center border-b">
    <a class="flex items-center justify-center" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
      </svg>
      <span class="sr-only">Acme App</span>
    </a>
    <nav
      aria-label="Main"
      data-orientation="horizontal"
      dir="ltr"
      class="relative z-10 max-w-max flex-1 items-center justify-center ml-auto hidden lg:flex"
    >
      <div style="position: relative">
        <ul
          data-orientation="horizontal"
          class="group flex flex-1 list-none items-center justify-center space-x-1"
          dir="ltr"
        >
          <a
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            data-radix-collection-item=""
            href="#"
          >
            Home
          </a>
          <li>
            <button
              id="radix-:r0:-trigger-radix-:r1:"
              data-state="closed"
              aria-expanded="false"
              aria-controls="radix-:r0:-content-radix-:r1:"
              class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group"
              data-radix-collection-item=""
            >
              Features
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          <a
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            data-radix-collection-item=""
            href="#"
          >
            Pricing
          </a>
          <a
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            data-radix-collection-item=""
            href="#"
          >
            Contact
          </a>
        </ul>
      </div>
      <div class="absolute left-0 top-full flex justify-center"></div>
    </nav>
    <div class="ml-auto flex gap-2">
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
      >
        Sign in
      </button>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Sign Up
      </button>
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
