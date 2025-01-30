<template>
  <div class="search-box">
    <div class="search-header">
      <h2 class="search-title">用户搜索</h2>
      <div class="search-tabs">
        <button class="search-button" @click="handleSearch">
          <svg class="search-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          搜索
        </button>
      </div>
    </div>

    <div class="search-body">
      <div class="input-wrapper">
        <div class="input-group">
          <input
            id="keywords"
            :value="keywords"
            @input="
              $emit(
                'update:keywords',
                ($event.target as HTMLInputElement).value
              )
            "
            @keyup.enter="handleSearch"
            type="text"
            placeholder="输入用户昵称"
          />
          <label for="keywords" class="floating-label">用户昵称</label>
        </div>

        <div class="select-group">
          <select
            id="sortType"
            :value="sortType"
            @change="
              $emit(
                'update:sortType',
                ($event.target as HTMLSelectElement).value
              )
            "
          >
            <option value="">综合排序</option>
            <option value="follower_count">粉丝数</option>
          </select>
          <label for="sortType" class="floating-label">排序方式</label>
        </div>
      </div>

      <div class="checkbox-wrapper">
        <label class="checkbox-label">
          <input
            type="checkbox"
            :checked="fuzzySearch"
            @change="
              $emit(
                'update:fuzzySearch',
                ($event.target as HTMLInputElement).checked
              )
            "
          />
          <span class="checkbox-text">模糊搜索</span>
        </label>
        <span class="checkbox-desc">关闭则只显示完全匹配的第一个结果</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SortType } from "../types";

const emit = defineEmits([
  "update:keywords",
  "update:fuzzySearch",
  "update:sortType",
  "handleSearchEvent",
]);
defineProps<{
  keywords: string;
  fuzzySearch: boolean;
  sortType: SortType;
}>();

const handleSearch = () => {
  emit("handleSearchEvent");
};
</script>

<style scoped>
.search-box {
  padding: 24px;
  border-radius: var(--border-radius);
  background: var(--card-background);
  box-shadow: var(--shadow);
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.search-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  position: relative;
}

.search-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 40px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
}

.search-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-wrapper {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: start;
}

.input-group,
.select-group {
  position: relative;
  width: 100%;
}

input,
select {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  outline: none;
}

input:focus,
select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
}

.floating-label {
  position: absolute;
  left: 12px;
  top: -10px;
  padding: 0 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  background: var(--card-background);
  pointer-events: none;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-text {
  font-weight: 500;
  color: var(--text-color);
}

.checkbox-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--primary-color);
}

.search-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--hover-shadow);
}

.search-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .search-box {
    padding: 16px;
  }

  .input-wrapper {
    grid-template-columns: 1fr;
  }

  .search-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .search-button {
    width: 100%;
    justify-content: center;
  }

  input,
  select {
    padding: 10px 14px;
    font-size: 16px;
  }
}

@media (max-width: 375px) {
  .search-box {
    padding: 12px;
  }

  .search-title {
    font-size: 1.2rem;
  }
}
</style>
