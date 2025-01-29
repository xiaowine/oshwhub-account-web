<template>
  <div class="container">
    <SearchInputControl
      class="card"
      v-model:keywords="keywords"
      v-model:pageSize="pageSize"
      v-model:fuzzySearch="fuzzySearch"
      @handleSearchEvent="handleSearch"
    />
    <UserList :users="searchResults" :error="error" class="card" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SearchInputControl from "./components/SearchInputControl.vue";
import UserList from "./components/UserList.vue";
import { searchUsers } from "./service/services";
import type { SearchUserInfo } from "./types";

const keywords = ref("xiao_wine");
const pageSize = ref(10);
const fuzzySearch = ref(true);
const searchResults = ref<SearchUserInfo[]>([]);
const error = ref<string>("");

onMounted(() => {
  handleSearch();
});
const handleSearch = async () => {
  error.value = "";
  searchResults.value = [];

  try {
    const data = await searchUsers(keywords.value, pageSize.value);

    if (data.result.lists.length === 0) {
      error.value = "无搜索结果";
    } else if (fuzzySearch.value) {
      searchResults.value = data.result.lists;
    } else {
      if (data.result.lists[0].nickname === keywords.value) {
        searchResults.value = [data.result.lists[0]];
      } else {
        error.value = "未找到完全匹配的用户";
      }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "搜索失败";
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
