<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>{{ title }}</h3>
            <button class="close-button" @click="closeModal">×</button>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  title: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--modal-overlay-bg);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}

.modal-container {
  background: var(--card-background);
  border-radius: 20px;
  padding: 25px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--modal-shadow);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  background: var(--card-background);
  border-bottom: 1px solid var(--border-color);
  z-index: 2;
  padding: 15px 0;
}

.modal-header h3 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
}

.close-button {
  background: var(--background-color);
  border: none;
  font-size: 24px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: all 0.3s ease;
  box-shadow: var(--neu-shadow);
}

.close-button:hover {
  background: var(--primary-color);
  color: white;
  transform: rotate(90deg);
}

.close-button:active {
  box-shadow: var(--neu-shadow-inset);
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  margin: 0 -25px;
  padding: 0 25px;
  border-radius: 15px;
  background: var(--card-background);
  position: relative;
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

.modal-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 25px;
  right: 25px;
  bottom: 0;
  pointer-events: none;
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    padding: 20px;
  }

  .modal-header h3 {
    font-size: 1.2rem;
  }
}

.modal-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

@media (max-width: 768px) {
  .modal-controls {
    gap: 8px;
  }

  .toggle-btn {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>
