<script setup lang="ts"></script>

<template>
  <div
    class="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full space-y-2 text-center">
      <h2 class="text-3xl font-bold tracking-tight">Sign in to your account</h2>
      <p class="text-muted-foreground">
        Enter your email and password below to access your account.
      </p>
    </div>
    <div class="w-full space-y-4">
      <form class="space-y-4">
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="email"
          >
            Email address
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="name@example.com"
            required="true"
            type="email"
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="password"
          >
            Password
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="password"
            required="true"
            type="password"
          />
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          type="submit"
        >
          Sign in
        </button>
        <div class="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a class="font-medium underline underline-offset-4" href="/register">
            Register
          </a>
        </div>
      </form>
      <div
        data-orientation="horizontal"
        role="none"
        class="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>
      <div class="grid grid-cols-3 gap-4">
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 col-span-1"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
