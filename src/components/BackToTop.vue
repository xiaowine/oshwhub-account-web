<template>
  <Transition name="fade">
    <button
      v-show="show"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="返回顶部"
    >
      <svg class="icon" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M13 20h-2V8l-5.5 5.5-1.42-1.42L12 4.16l7.92 7.92-1.42 1.42L13 8v12z"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const show = ref(false);
let timer: number | null = null;

const checkScroll = () => {
  if (timer === null) {
    timer = window.setTimeout(() => {
      show.value = window.pageYOffset > 300;
      timer = null;
    }, 100);
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(var(--primary-color-rgb), 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  padding: 0;
}

.icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  background: var(--primary-color);
  box-shadow: var(--hover-shadow);
}

.back-to-top:hover .icon {
  transform: translateY(-2px);
}

.back-to-top:active {
  transform: translateY(0) scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .back-to-top {
    right: 16px;
    bottom: 16px;
    width: 40px;
    height: 40px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}

/* 减少触摸设备的悬浮效果 */
@media (hover: none) {
  .back-to-top:hover {
    transform: none;
    background: rgba(var(--primary-color-rgb), 0.9);
  }

  .back-to-top:hover .icon {
    transform: none;
  }
}
</style>
