<script setup lang="ts">
definePageMeta({
  layout: 'not-logged-in',
});
import { useAuth } from '../store/auth';
const Auth = useAuth();

const formatter = ref({
  date: 'YYYY-MM-DD',
  month: 'MM',
});

const dataRegister = ref({
  name: '',
  surname: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '', // Update the type to null or the appropriate type for 'dateOfBirth'
  password: '',
  address: '',
});

const passwordConfirmation = ref('');

const handleRegister = async () => {
  console.log('called');
  if (
    dataRegister.value.email === '' ||
    dataRegister.value.password === '' ||
    dataRegister.value.name === '' ||
    dataRegister.value.surname === '' ||
    dataRegister.value.phoneNumber === '' ||
    dataRegister.value.dateOfBirth === ''
    // dataRegister.value.address === ''
  )
    return;
  if (passwordConfirmation.value !== dataRegister.value.password) return;

  await Auth.register(dataRegister.value);
};
</script>

<template>
  <div class="mx-auto max-w-md space-y-6">
    <div class="space-y-2 text-center">
      <h1 class="text-3xl font-bold">Register</h1>
      <p class="text-muted-foreground">Create your account to get started.</p>
    </div>

    <form class="space-y-4" @submit.prevent="handleRegister">
      <div class="grid gap-2 md:grid-cols-2 md:gap-2">
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="name"
          >
            Name
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="name"
            placeholder="John Doe"
            required="true"
            v-model="dataRegister.name"
          />
        </div>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="name"
          >
            Surname
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="surname"
            placeholder="John Doe"
            required="true"
            v-model="dataRegister.surname"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="email"
        >
          Email
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          id="email"
          placeholder="m@example.com"
          required="true"
          v-model="dataRegister.email"
        />
      </div>
      <div class="grid gap-2 md:grid-cols-2 md:gap-2">
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Birth Date
          </label>
          <VueTailwindDatepicker
            :formatter="formatter"
            v-model="dataRegister.dateOfBirth"
            as-single
          />
        </div>
        <div class="space-y-2">
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="phone"
          >
            Phone Number
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="phone"
            placeholder="+56912314124"
            required="true"
            v-model="dataRegister.phoneNumber"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="password"
        >
          Password
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="password"
          id="password"
          required="true"
          v-model="dataRegister.password"
        />
      </div>

      <div class="space-y-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="password"
        >
          Confirm Password
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="password"
          id="password-confirm"
          required="true"
          v-model="passwordConfirmation"
        />
      </div>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        type="submit"
      >
        Register
      </button>
    </form>
    <div class="text-center text-sm text-muted-foreground">
      Already have an account?
      <a class="underline" href="/login"> Login </a>
    </div>
  </div>
</template>

<style scoped></style>
