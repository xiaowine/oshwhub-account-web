<template>
  <div class="skeleton-card">
    <div class="skeleton-avatar"></div>
    <div class="skeleton-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--background-color);
  margin-bottom: 12px;
}

.skeleton-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.skeleton-title {
  width: 60%;
  height: 20px;
  background: var(--background-color);
  border-radius: 4px;
}

.skeleton-text {
  width: 40%;
  height: 16px;
  background: var(--background-color);
  border-radius: 4px;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .skeleton-avatar {
    width: 60px;
    height: 60px;
  }

  .skeleton-title {
    height: 16px;
  }

  .skeleton-text {
    height: 14px;
  }
}
</style>
