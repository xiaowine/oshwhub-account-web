<template>
  <div class="search-box">
    <h2 class="search-title">用户搜索</h2>
    <div class="search-container">
      <div class="input-group">
        <label for="keywords">用户昵称</label>
        <input
          id="keywords"
          :value="keywords"
          @input="
            $emit('update:keywords', ($event.target as HTMLInputElement).value)
          "
          type="text"
          placeholder="请输入用户名或昵称"
        />
        <span class="input-description">昵称搜索，至少2个字符</span>
      </div>

      <div class="checkbox-group">
        <label class="checkbox-label">
          <input
            :checked="fuzzySearch"
            @change="
              $emit(
                'update:fuzzySearch',
                ($event.target as HTMLInputElement).checked
              )
            "
            type="checkbox"
          />
          模糊搜索
        </label>
        <span class="input-description"
          >开启后将显示所有结果<br />关闭则只显示第一个完全匹配</span
        >
      </div>

      <div class="select-group">
        <label for="sortType">排序方式</label>
        <select
          id="sortType"
          :value="sortType"
          @change="
            $emit('update:sortType', ($event.target as HTMLSelectElement).value)
          "
        >
          <option value="">综合排序</option>
          <option value="follower_count">粉丝数</option>
        </select>
        <span class="input-description">选择结果的排序方式</span>
      </div>

      <button @click="handleSearch">
        <span class="search-icon">🔍</span>
        搜索
      </button>
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
  background: var(--card-background);
  padding: 24px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.search-title {
  margin: 0 0 20px 0;
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 500;
}

.search-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 500;
  color: var(--text-color);
}

.input-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

input[type="text"],
input[type="number"] {
  padding: 8px 12px;
  background: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  transition: var(--transition);
  outline: none;
  width: 100%;
}

input[type="text"]:focus,
input[type="number"]:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-color), 0.2);
  background: var(--card-background);
}

input[type="number"] {
  width: 100px;
}

label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  color: var(--text-color);
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--primary-color);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  color: var(--text-color);
  font-weight: 500;
}

.checkbox-label input[type="checkbox"] {
  background: var(--background-color);
  border-color: var(--border-color);
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 500;
  height: 40px;
  align-self: flex-end;
}

button:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--hover-shadow);
}

button:active {
  transform: translateY(0);
}

.search-icon {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .search-container {
    grid-template-columns: 1fr;
  }

  button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .search-box {
    padding: 16px;
  }

  .search-title {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  .search-container {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .input-group {
    gap: 6px;
  }

  input[type="text"],
  input[type="number"] {
    padding: 10px;
    font-size: 16px; /* 防止 iOS 自动缩放 */
  }

  input[type="number"] {
    width: 100%;
  }

  .checkbox-group {
    margin: 8px 0;
  }

  button {
    width: 100%;
    height: 44px; /* 增加移动端按钮点击区域 */
    font-size: 16px;
    margin-top: 8px;
  }

  .input-description {
    font-size: 12px;
  }
}

/* 适配超小屏幕 */
@media (max-width: 375px) {
  .search-box {
    padding: 12px;
  }

  .search-title {
    font-size: 1.1rem;
  }
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

select {
  padding: 8px 12px;
  background: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
  transition: var(--transition);
  outline: none;
  cursor: pointer;
  width: 100%;
}

select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
  background: var(--card-background);
}
</style>
