<template>
  <div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="users.length" class="user-grid">
      <div
        v-for="user in users"
        :key="user.uuid"
        class="user-card"
        @click="showUserDetails(user)"
      >
        <img
          :src="
            user.avatar.startsWith('//') ? 'https:' + user.avatar : user.avatar
          "
          class="avatar"
          :alt="user.nickname"
        />
        <div class="user-info">
          <h3>{{ user.nickname }}</h3>
          <p>@{{ user.username }}</p>
        </div>
      </div>
    </div>
    <div v-else class="no-data">暂无数据</div>
    <ModalWrapper v-model="showModal" title="用户详情" v-if="showModal">
      <UserDetailView :user="selectedUser!" />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { SearchUserInfo } from "../types";
import ModalWrapper from "./ModalWrapper.vue";
import UserDetailView from "./UserDetailView.vue";

defineProps<{
  users: SearchUserInfo[];
  error?: string;
}>();

const showModal = ref(false);
const selectedUser = ref<SearchUserInfo>();

const showUserDetails = (user: SearchUserInfo) => {
  selectedUser.value = user;
  showModal.value = true;
};
</script>

<style scoped>
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 20px;
}

.user-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: var(--shadow);
  margin-bottom: 12px;
}

.user-info {
  text-align: center;
}

.user-info h3 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.1em;
  font-weight: 600;
}

.user-info p {
  margin: 5px 0 0;
  color: var(--text-secondary);
  font-size: 0.9em;
}

.error-message {
  background: #fef2f2;
  color: var(--error-color);
  padding: 16px;
  border-radius: var(--border-radius);
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-message::before {
  content: "⚠";
}

.no-data {
  text-align: center;
  padding: 40px;
  color: var(--text-color);
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-top: 20px;
}

@media (max-width: 768px) {
  .user-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    padding: 15px;
  }

  .user-card {
    padding: 15px;
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .user-info h3 {
    font-size: 1em;
  }

  .user-info p {
    font-size: 0.8em;
  }

  .error-message {
    margin: 15px 0;
    padding: 12px;
    font-size: 14px;
  }

  .no-data {
    padding: 30px 15px;
    font-size: 14px;
  }
}

@media (max-width: 375px) {
  .user-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 10px;
    padding: 10px;
  }
}

.user-details {
  padding: 20px;
}

.detail-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  box-shadow: 4px 4px 8px #d0d0d0, -4px -4px 8px #ffffff;
}

.detail-info {
  line-height: 1.6;
}

.detail-info p {
  margin: 8px 0;
}
</style>
