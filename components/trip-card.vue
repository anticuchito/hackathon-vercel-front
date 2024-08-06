<script setup lang="ts">
import type { Trip } from '@/types/trips';

const props = defineProps({
  trip: {
    type: Object as PropType<Trip>,
    required: true,
  },
  isFromFavorite: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const { trip, isFromFavorite } = toRefs(props);

const formatDate = (date: string | number) => {
  return new Date(date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const handleRedirectToTrip = () => {
  useRouter().push(`/trips/${trip.value.id}`);
};
</script>

<template>
  <div
    class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
  >
    <div
      class="flex-row space-y-1.5 bg-primary text-primary-foreground p-6 rounded-t-lg flex items-center justify-between"
    >
      <h2 class="text-2xl font-bold">Madrid</h2>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background"
      >
        <Icon
          :name="isFromFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
          size="28px"
        />
      </button>
    </div>
    <img
      :src="trip.itineraryDetails[0].activities[0].activity.images[0]"
      width="600"
      height="400"
      alt="Madrid"
      class="object-cover w-full aspect-[6/3]"
    />
    <div class="p-6 grid gap-4">
      <div class="flex items-center justify-between">
        <div class="text-muted-foreground">
          <Icon name="mdi:calendar" />
          {{ trip.duration }} dias
        </div>
        <div class="text-muted-foreground">
          <Icon name="mdi:calendar" />
          {{ `${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}` }}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-muted-foreground">
          <Icon name="mdi:flight" />
          {{ trip.origin }}
        </div>
        <div class="text-muted-foreground">
          <Icon name="mdi:flight" />
          {{
            `${trip.flights[0].flight.airline} ${
              trip.flights[0].flight.flightNumber
            } | ${
              trip.flights[0].flight.departureTime.split('T')[1].split('.')[0]
            }`
          }}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-muted-foreground">
          <Icon name="mdi:currency-usd" />
          {{ trip.minBudget }} - {{ trip.maxBudget }}
        </div>
        <div class="text-muted-foreground">
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            @click="handleRedirectToTrip"
          >
            ver mas detalles
            <Icon name="mdi:arrow-right" class="ml-2" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
