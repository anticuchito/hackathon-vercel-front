<script setup lang="ts">
import Modal from '../../components/modal.vue';

const props = defineProps({
  open: Boolean,
});

const { open } = toRefs(props);

const emits = defineEmits(['update:open']);

const anOpenUpdated = (value: boolean) => {
  emits('update:open', value);
};
</script>

<template>
  <Modal v-if="open" :open="open" @update:open="anOpenUpdated">
    <div>
      <h1>Modal</h1>
      <p>Modal content</p>
    </div>
    <div>
      <input type="text" placeholder="Type something" />
      <input type="text" placeholder="Type something" />
    </div>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Some Action
    </button>
  </Modal>
</template>

<style scoped></style>
