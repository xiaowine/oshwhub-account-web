<template>
  <div class="container">
    <SearchInputControl
      class="card"
      v-model:keywords="keywords"
      v-model:fuzzySearch="fuzzySearch"
      v-model:sortType="sortType"
      @handleSearchEvent="handleSearch"
    />
    <UserList
      :users="searchResults"
      :error="error"
      :loading="loading"
      :hasMore="hasMore"
      @loadMore="loadMore"
      class="card"
    />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SearchInputControl from "./components/SearchInputControl.vue";
import UserList from "./components/UserList.vue";
import { searchUsers } from "./service/services";
import type { SearchUserInfo, SortType } from "./types";
import BackToTop from "./components/BackToTop.vue";

const keywords = ref("xiao_wine");
// 模糊搜索
const fuzzySearch = ref(true);

const searchResults = ref<SearchUserInfo[]>([]);
// 错误信息
const error = ref<string>("");

const pageSize = 20;
const currentPage = ref(1);
// 正在加载数据
const loading = ref(false);
// 是否还有更多数据
const hasMore = ref(true);

const sortType = ref<SortType>("");

onMounted(() => {
  handleSearch();
});

const handleSearch = async () => {
  error.value = "";
  searchResults.value = [];
  currentPage.value = 1;
  hasMore.value = true;
  await loadMore(); // 直接调用 loadMore，统一处理加载逻辑
};

const loadMore = async () => {
  if (!hasMore.value || error.value || loading.value) return;

  loading.value = true;

  try {
    // 添加小延迟以便看到骨架屏效果(可选)
    // await new Promise((resolve) => setTimeout(resolve, 300));

    const data = await searchUsers(
      keywords.value,
      pageSize,
      currentPage.value,
      sortType.value
    );

    if (data.result.lists.length === 0) {
      if (currentPage.value === 1) {
        error.value = "无搜索结果";
      }
      hasMore.value = false;
    } else if (fuzzySearch.value) {
      searchResults.value = [...searchResults.value, ...data.result.lists];
      hasMore.value = currentPage.value * pageSize < data.result.total;
      currentPage.value++;
    } else {
      if (data.result.lists[0].nickname === keywords.value) {
        searchResults.value = [data.result.lists[0]];
      } else {
        error.value = "未找到完全匹配的用户";
      }
      hasMore.value = false;
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "搜索失败";
  } finally {
    loading.value = false;
  }
};
</script>

<style>
@import "./styles/variables.css";

body {
  margin: 0;
  background: var(--background-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

* {
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .container {
    margin: 20px auto;
    padding: 0 15px;
  }
}

@media (max-width: 375px) {
  .container {
    margin: 15px auto;
    padding: 0 10px;
  }
}
</style>
