<script setup lang="ts">
import Modal from './modal-without-article.vue';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const { open } = toRefs(props);
const emits = defineEmits(['update:open']);

const anOpenUpdated = (value: boolean) => {
  emits('update:open', value);
};
</script>

<template>
  <Modal v-if="open" :open="open" @update:open="anOpenUpdated">
    <icon name="line-md:loading-loop" size="48" class="bg-white" />
  </Modal>
</template>

<style scoped></style>
