<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
// import { Icon } from '#';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const { open } = toRefs(props);

const emit = defineEmits(['update:open']);

const closeModal = () => {
  emit('update:open', false);
};

watch(
  open,
  (newVal) => {
    emit('update:open', newVal);
  },
  { immediate: true }
);
const target = ref(null);

onClickOutside(target, closeModal);
</script>

<template>
  <Teleport to="#dialog">
    <div v-if="open" class="modal-backdrop">
      <dialog :open="open" class="modal">
        <article class="p-4 bg-white rounded-lg shadow-lg" ref="target">
          <header class="flex justify-end">
            <button @click="closeModal" aria-label="Close modal">
              <icon name="mdi:close" />
            </button>
          </header>
          <slot />
        </article>
      </dialog>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  border: none;
  padding: 0;
  background: transparent;
}
</style>
