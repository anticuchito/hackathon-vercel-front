<!-- TODO:MAKE itinirarie -->
<script setup lang="ts">
import { useTrips } from '../../store/trips';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import ItineraryDetails from '@/components/trips/itinerary-details.vue';
const tripUser = useTrips();
const route = useRoute();
const tripId = route.params.tripId as string;

const categories = [
  'Itinerary',
  'Accommodation & Restaurants',
  'Points of Interest',
];
console.log(tripId);

const trip = await tripUser.getTrip(tripId);
console.log(trip);

const itineraryDetails = trip.itineraryDetails;
</script>
<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-6">Planificación de Viaje</h1>
    <!-- FIXME: this shiet  sacarlo de v-for y manejarlo manual-->
    <TabGroup :default-index="0">
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          v-for="(category, iDx) in categories"
          as="template"
          :key="iDx"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white text-blue-700 shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          key="itinerary"
          class="relative rounded-md p-3 hover:bg-gray-100"
          :tabIndex="0"
          id="itinerary"
        >
          <ItineraryDetails :itineraryDetails="itineraryDetails" />
        </TabPanel>
        <TabPanel
          key="accommodation"
          class="relative rounded-md p-3 hover:bg-gray-100"
          :tabIndex="1"
          id="accommodation"
        >
          <h3 class="ext-2xl font-bold">Accommodation</h3>

          <div
            v-for="accomodation in trip.accommodations"
            class="grid grid-cols-[1fr_auto] gap-4 items-center"
          >
            <accomodations-details :accomodation="accomodation" />
          </div>

          <h3 class="text-2xl font-bold">Restaurants</h3>
          <div
            v-for="restaurant in trip.restaurants"
            class="grid grid-cols-[1fr_auto] gap-4 items-center"
          >
            <restorants-details :restorant="restaurant" />
          </div>
        </TabPanel>
        <TabPanel
          key="points-of-interest"
          class="relative rounded-md p-3 hover:bg-gray-100"
          :tabIndex="2"
          id="points-of-interest"
        >
          <!-- make component with map
           -->
          <point-interests :trip="trip" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style scoped></style>
