<script setup lang="ts">
import { useAuth } from '@/store/auth';
import useVuelidate from '@vuelidate/core';
import { required, email as vEmail, helpers } from '@vuelidate/validators';

definePageMeta({
  layout: 'not-logged-in',
});

const auth = useAuth();

const isLoading = ref(false);

const formData = reactive({
  email: '',
  password: '',
});

const handleLogin = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
    // or show error messages
  }
  isLoading.value = true;

  try {
    await auth.login(formData.email, formData.password);
    // maybe function login will toast error if not success
    isLoading.value = false;
  } catch (error) {
    // handle error
    // maybe function login will toast error if not success
    console.error(error);
    isLoading.value = false;
  }
};

const validations = {
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Email is invalid', vEmail),
  },
  password: {
    required: helpers.withMessage('Password is required', required),
  },
  // for register
  // passwordConfirmation: {
  //   required,
  //   sameAs: helpers.withMessage('Passwords do not match', sameAs('password')),
  // },
};

const v$ = useVuelidate(validations, formData);
</script>

<!-- TODO add validation -->
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
      <form class="space-y-4" @submit.prevent="handleLogin">
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
            type="email"
            required="false"
            :class="{ 'border-red-500': v$.email.$error }"
            v-model="formData.email"
            @change="v$.email.$touch()"
          />

          <span class="text-xs text-red-500" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
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
            type="password"
            v-model="formData.password"
            :class="{ 'border-red-500': v$.password.$error }"
            @change="v$.password.$touch()"
          />

          <span class="text-xs text-red-500" v-if="v$.password.$error">{{
            v$.password.$errors[0]?.$message
          }}</span>
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          :disabled="v$.email.$error || v$.password.$error"
        >
          <span v-if="!isLoading">Sign in</span>
          <icon v-else name="line-md:loading-loop" size="24" />
        </button>
        <div class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <a class="font-medium underline underline-offset-4" href="/register">
            Register
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
