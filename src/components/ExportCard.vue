<template>
  <div class="export-card" ref="exportCardRef">
    <div class="card-content">
      <img
        :src="user?.avatar"
        class="card-avatar"
        :alt="user?.nickname"
        @error="handleAvatarError"
      />
      <h3 class="card-title">{{ user.nickname }}</h3>
      <p class="card-username">@{{ user.username }}</p>
      <div class="card-stats">
        <div class="stat-item">
          <span class="stat-value">{{ user.count.followers }}</span>
          <span class="stat-label">关注者</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ user.count.following }}</span>
          <span class="stat-label">关注</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ user.count.public_projects }}</span>
          <span class="stat-label">项目</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import type { SearchUserInfo } from "../types";
import { defaultAvatar } from "../service/services";
import html2canvas from "html2canvas";

const props = defineProps<{
  user: SearchUserInfo;
}>();

const emit = defineEmits(["update:modelValue"]);

const exportCardRef = ref<HTMLElement | null>(null);

const handleAvatarError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = defaultAvatar;
};

const exportAsImage = async () => {
  try {
    // 等待组件渲染完成
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!exportCardRef.value) return;

    const canvas = await html2canvas(exportCardRef.value, {
      backgroundColor: null,
      scale: 2,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `${props.user.nickname}-oshwhub.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Export failed:", error);
  }
};

defineExpose({
  exportAsImage,
});
</script>

<style scoped>
.export-card {
  position: fixed;
  left: -9999px;
  width: 300px;
  background: var(--card-background);
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  box-shadow: var(--shadow);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.card-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color);
}

.card-title {
  margin: 0;
  font-size: 1.5em;
  color: var(--text-color);
}

.card-username {
  margin: 0;
  color: var(--text-secondary);
}

.card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--text-color);
}

.stat-label {
  font-size: 0.9em;
  color: var(--text-secondary);
}
</style>
