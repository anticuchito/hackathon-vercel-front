<script setup lang="ts">
import type { Restaurant } from '@/types/trips';
const props = defineProps({
  restorant: {
    type: Object as PropType<Restaurant>,
    required: true,
  },
});

const { restorant } = toRefs(props);
</script>

<template>
  <div
    class="grid grid-cols-[1fr_auto] gap-4 items-center rounded border rounded-lg border-gray-300 p-4 mt-4"
  >
    <div>
      <h3 class="text-lg font-semibold">
        {{ restorant.restaurant.name }}
      </h3>
      <div class="flex text-muted-foreground align-baseline">
        <p class="mb-0">{{ restorant.restaurant.rating }}</p>
        <Icon
          name="line-md:star-filled"
          class="fill-primary align-middle mt-0.5 ml-1"
          size="20px"
        />
      </div>
      <p class="text-muted-foreground">
        {{ restorant.restaurant.description }}
      </p>
    </div>
    <div class="text-right">
      <div class="text-2xl font-bold">
        {{ restorant.restaurant.priceRange }} $
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
