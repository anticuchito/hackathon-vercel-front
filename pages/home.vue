<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useTripStore } from '../store/trip';
import { useAuth } from '../store/auth';
import ModalLoading from '../components/modal-loading.vue';
const AuthStore = useAuth();
const tripStore = useTripStore();
const isLoading = ref(false);
const startFrom = new Date();

const formatter = ref({
  date: 'YYYY-MM-DD',
  month: 'MM',
});

function dDate(date: Date) {
  return date <= startFrom;
}

const formData = reactive<{
  origin: string | undefined;
  destination: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  minBudget: number | undefined;
  maxBudget: number | undefined;
  adults: number | undefined;
  minors: number | undefined;
}>({
  origin: undefined,
  destination: undefined,
  startDate: undefined,
  endDate: undefined,
  minBudget: undefined,
  maxBudget: undefined,
  adults: undefined,
  minors: undefined,
});

const validations = {
  origin: {
    required: helpers.withMessage('Origen es requerido', required),
  },
  destination: {
    required: helpers.withMessage('Destino es requerido', required),
  },
  startDate: {
    required: helpers.withMessage('Fecha de inicio es requerida', required),
  },
  endDate: {
    required: helpers.withMessage('Fecha de termino es requerida', required),
    isEndDateValid: helpers.withMessage(
      'Fecha de termino debe ser mayor a la de inicio',
      (value: string) => {
        if (!formData.startDate) return false;
        return new Date(value) >= new Date(formData.startDate);
      }
    ),
  },
  minBudget: {
    required: helpers.withMessage('Presupuesto es requerido', required),
    // tambien puedo agregar un minimo y maximo
  },
  maxBudget: {
    required: helpers.withMessage('Presupuesto es requerido', required),
    // tambien puedo agregar un minimo y maximo
    isMaxBudgetValid: helpers.withMessage(
      'Presupuesto maximo debe ser mayor al minimo',
      (value: number) => {
        if (!formData.minBudget) return false;
        return value > formData.minBudget;
      }
    ),
  },
  adults: {
    required: helpers.withMessage('Cantidad de adultos es requerida', required),
  },
  minors: {
    required: helpers.withMessage('Cantidad de menores es requerida', required),
  },
};

const v$ = useVuelidate(validations, formData);

const inputMin = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (parseInt(target.value) < 1 && !target.id.includes('cant')) {
    // @ts-ignore
    target.value = 1;

    if (target.id === 'min-budget') formData.minBudget = 1;
    if (target.id === 'max-budget') formData.maxBudget = 1;
  } else if (parseInt(target.value) < 0 && target.id.includes('cant')) {
    // @ts-ignore
    target.value = 0;

    if (target.id === 'cant-adultos') formData.adults = 0;
    if (target.id === 'cant-menores') formData.minors = 0;
  }
};

const hadleSubmit = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
    // or show error messages
  }
  isLoading.value = true;
  console.log('formData', formData);

  if (!Object.values(formData).some((value) => value)) return;
  // call api

  try {
    const tripId = await tripStore.createTrip({
      origin: formData.origin!,
      destination: formData.destination!,
      startDate: formData.startDate!,
      endDate: formData.endDate!,
      minBudget: formData.minBudget!,
      maxBudget: formData.maxBudget!,
      adults: formData.adults!,
      minors: formData.minors!,
    });
    isLoading.value = false;
    // redirect to trips/:id
    if (tripId) {
      useRouter().push(`/trips/${tripId}`);
    }
  } catch (error) {
    isLoading.value = false;
    console.error(error); //replace with toast
  }
};
</script>
<!-- !Termina de validar la wea y valida el form para mañna empieces con los trips/id y las weas -->
<template>
  <div>
    <div class="w-full max-w-4xl mx-auto py-12 md:py-20">
      <div class="px-4 md:px-6 space-y-8">
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Planifica tu próximo viaje
          </h1>
          <p class="text-muted-foreground md:text-xl">
            Encuentra el itinerario perfecto para tu próxima aventura.
          </p>
        </div>
        <form
          class="grid gap-4 md:grid-cols-2 md:gap-6"
          @submit.prevent="hadleSubmit"
        >
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="origin"
            >
              Origen
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="origin"
              placeholder="Ingresa tu ciudad de origen"
              v-model="formData.origin"
              @change="v$.origin.$touch()"
            />
            <span class="text-xs text-red-500" v-if="v$.origin.$error">{{
              v$.origin.$errors[0].$message
            }}</span>
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="destination"
            >
              Destino
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="destination"
              placeholder="Ingresa tu ciudad de destino"
              v-model="formData.destination"
              @change="v$.destination.$touch()"
            />
            <span class="text-xs text-red-500" v-if="v$.destination.$error">{{
              v$.destination.$errors[0].$message
            }}</span>
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="start-date"
            >
              Fecha de inicio
            </label>
            <VueTailwindDatepicker
              :formatter="formatter"
              v-model.string="formData.startDate"
              as-single
              :start-from="startFrom"
              :disable-date="dDate"
              @change="v$.startDate.$touch()"
            />
            <span class="text-xs text-red-500" v-if="v$.startDate.$error">{{
              v$.startDate.$errors[0].$message
            }}</span>
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="start-date"
            >
              Fecha de termino
            </label>
            <VueTailwindDatepicker
              :formatter="formatter"
              v-model.string="formData.endDate"
              as-single
              :start-from="startFrom"
              :disable-date="dDate"
              @change="v$.endDate.$touch()"
            />
            <span class="text-xs text-red-500" v-if="v$.endDate.$error">{{
              v$.endDate.$errors[0].$message
            }}</span>
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="min-budget"
            >
              Presupuesto minimo
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              v-model="formData.minBudget"
              min="1"
              id="min-budget"
              placeholder="Ingresa la duración"
              @input="(e) => inputMin(e)"
              @change="v$.minBudget.$touch()"
            />
            <span class="text-xs text-red-500" v-if="v$.minBudget.$error">{{
              v$.minBudget.$errors[0].$message
            }}</span>
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="max-budget"
            >
              Presupuesto maximo
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              v-model="formData.maxBudget"
              min="1"
              @input="(e) => inputMin(e)"
              id="max-budget"
              placeholder="Ingresa tu presupuesto"
              @change="v$.maxBudget.$touch()"
            />
            <span class="text-xs text-red-500" v-if="v$.maxBudget.$error">{{
              v$.maxBudget.$errors[0].$message
            }}</span>
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="cant-adultos"
            >
              cantidad de adultos
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              v-model="formData.adults"
              min="0"
              id="cant-adultos"
              placeholder="Ingresa la duración"
              @input="(e) => inputMin(e)"
              @change="v$.adults.$touch()"
            />
            <span class="text-xs text-red-500" v-if="v$.adults.$error">{{
              v$.adults.$errors[0].$message
            }}</span>
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="cant-menores"
            >
              cantidad de menores:
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              v-model="formData.minors"
              min="0"
              id="cant-menores"
              placeholder="Ingresa la duración"
              @input="(e) => inputMin(e)"
              @change="v$.minors.$touch()"
            />
            <span class="text-xs text-red-500" v-if="v$.minors.$error">{{
              v$.minors.$errors[0].$message
            }}</span>
          </div>
          <a class="md:col-span-2" href="#">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              type="submit"
              :disabled="
                v$.origin.$error ||
                v$.destination.$error ||
                v$.startDate.$error ||
                v$.endDate.$error ||
                v$.minBudget.$error ||
                v$.maxBudget.$error ||
                v$.adults.$error ||
                v$.minors.$error
              "
            >
              Buscar itinerario
            </button>
          </a>
        </form>
      </div>
    </div>
  </div>
  <ModalLoading v-if="isLoading" v-model:open="isLoading" />
</template>

<style scoped></style>
