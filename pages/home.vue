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
        <form class="grid gap-4 md:grid-cols-2 md:gap-6">
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
            />
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
            />
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
              v-model="date"
              as-single
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="duration"
            >
              Duración (días)
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              id="duration"
              placeholder="Ingresa la duración"
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="budget"
            >
              Presupuesto
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              id="budget"
              placeholder="Ingresa tu presupuesto"
            />
          </div>
          <a class="md:col-span-2" href="#">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              type="submit"
            >
              Buscar itinerario
            </button>
          </a>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const date = ref('');

const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM',
});

// watchEffect(() => {
//   console.log('date', date.value);
// });
</script>

<style scoped></style>
