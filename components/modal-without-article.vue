<script setup lang="ts">
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const { open } = toRefs(props);
const emit = defineEmits(['update:open']);

watch(
  open,
  (newVal) => {
    emit('update:open', newVal);
  },
  { immediate: true }
);
</script>

<template>
  <!-- Asegúrate de que el contenedor de destino exista -->
  <Teleport to="#dialog">
    <div v-if="open" class="modal-backdrop">
      <dialog :open="open" class="modal">
        <slot />
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
