<template>
  <div class="user-detail-view">
    <div class="view-header">
      <div class="view-toggle">
        <button
          :class="['toggle-btn', { active: !showDetail }]"
          @click="showDetail = false"
        >
          简介
        </button>
        <button
          :class="['toggle-btn', { active: showDetail }]"
          @click="showDetail = true"
        >
          详细
        </button>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="user-profile">
        <div class="avatar-wrapper">
          <img :src="user?.avatar" class="detail-avatar" v-if="user" />
        </div>
        <h3 class="user-name">
          {{ user.nickname }}
          <span v-if="isAuthor" class="author-tag">作者</span>
        </h3>
        <p class="user-tag">{{ user.team ? "团队账号" : "个人账号" }}</p>
        <a :href="userHomeUrl" target="_blank" class="home-link">
          <button class="visit-btn">
            <span class="icon">🏠</span>
            访问主页
          </button>
        </a>
        <div v-if="isAuthor" class="author-menu">
          <a
            href="https://github.com/xiaowine"
            target="_blank"
            class="menu-item"
          >
            <span class="icon">📦</span>
            GitHub
          </a>
          <a
            href="https://space.bilibili.com/393492876"
            target="_blank"
            class="menu-item"
          >
            <span class="icon">📺</span>
            BiliBili
          </a>
          <a
            href="https://oshwhub.com/xiao_wine/"
            target="_blank"
            class="menu-item"
          >
            <span class="icon">🛞</span>
            开源社区
          </a>
        </div>
      </div>

      <div class="user-details-content">
        <div class="basic-info">
          <p><strong>用户名:</strong> {{ user.username }}</p>
          <p><strong>关注者：</strong> {{ user.count.followers }}</p>
          <p><strong>关注数：</strong> {{ user.count.following }}</p>
        </div>

        <div v-if="showDetail" class="detailed-info">
          <div class="info-section">
            <h4>账号信息</h4>
            <p>
              <strong>FB官方：</strong>
              {{ userInfo?.result.is_fp_office_account ? "是" : "否" }}
            </p>
            <p><strong>现有积分：</strong> {{ userInfo?.result.points }}</p>
            <p><strong>得分：</strong> {{ user._score }}</p>
            <p><strong>创建时间：</strong> {{ userInfo?.result.created_at }}</p>
            <p><strong>UUID:</strong> {{ user.uuid }}</p>
          </div>

          <div class="info-section">
            <h4>项目统计</h4>
            <p><strong>公开项目：</strong> {{ user.count.public_projects }}</p>
            <p><strong>所有项目：</strong> {{ user.count.all_projects }}</p>
            <p>
              <strong>归档项目：</strong> {{ user.count.archived_projects }}
            </p>
            <p><strong>参与项目：</strong> {{ user.count.joined_projects }}</p>
          </div>

          <div class="info-section" v-if="!user.team">
            <h4>个人信息</h4>
            <p><strong>职业：</strong> {{ userInfo?.result.info.career }}</p>
            <p>
              <strong>公司：</strong>
              {{ userInfo?.result.info.companycompany }}
            </p>
            <p>
              <strong>学校：</strong>
              {{ userInfo?.result.info.school }}
            </p>
            <p>
              <strong>所在地：</strong>
              {{ userInfo?.result.info.country }}
            </p>
            <p>
              <strong>个人网站：</strong>
              {{ userInfo?.result.info.site }}
            </p>
            <p>
              <strong>个人简介:</strong>
              {{ userInfo?.result.introduction || "用户未填写描述" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { SearchUserInfo, UserInfoResponse } from "../types";
import { getUserInfo } from "../service/services";

const userInfo = ref<UserInfoResponse>();

const props = defineProps<{
  user: SearchUserInfo;
}>();
onMounted(() => {
  get_create_time(props.user.uuid);
});
const get_create_time = async (uuid: string) => {
  try {
    userInfo.value = await getUserInfo(uuid);
  } catch (error) {}
};

const showDetail = ref(false);

const userHomeUrl = computed(() => {
  return `https://oshwhub.com/${props.user.username}`;
});

const isAuthor = computed(() => {
  return props.user.uuid === "755f3465ed2b4338959ff26d671e399b";
});
</script>

<style scoped>
.user-detail-view {
  display: flex;
  flex-direction: column;
}

.view-header {
  position: sticky;
  top: 0;
  background: var(--card-background);
  padding: 10px 0;
  z-index: 1;
  margin: -10px 0 10px;
}

.content-wrapper {
  flex: 1;
  overflow-y: visible;
  padding: 0 20px;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color);
}

.detail-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  box-shadow: var(--neu-shadow);
}

.user-name {
  margin: 0;
  font-size: 1.4em;
  color: var(--text-color);
}

.user-tag {
  margin: 5px 0;
  padding: 2px 8px;
  background: var(--primary-color);
  color: white;
  border-radius: 12px;
  font-size: 0.8em;
}

.user-details-content {
  padding: 20px 0;
}

.info-section {
  margin-bottom: 15px;
  padding: 15px;
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--inset-shadow);
  transition: var(--transition);
  border: 1px solid var(--border-color);
}

.info-section:hover {
  transform: translateY(-2px);
  box-shadow: var(--hover-shadow);
}

.info-section h4 {
  margin: 0 0 10px 0;
  color: var(--primary-color);
  font-size: 1.1em;
}

.info-section p {
  margin: 8px 0;
  line-height: 1.6;
}

.view-toggle {
  display: flex;
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: 4px;
  border: 1px solid var(--border-color);
  gap: 4px;
}

.toggle-btn {
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background: transparent;
  color: var(--text-color);
  transition: var(--transition);
  flex: 1;
  min-width: 80px;
}

.toggle-btn.active {
  background: var(--primary-color);
  color: white;
  box-shadow: none;
}

.toggle-btn:hover:not(.active) {
  color: var(--primary-color);
  background: var(--background-color);
}

.home-link {
  text-decoration: none;
  margin-top: 10px;
}

.visit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.visit-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--hover-shadow);
}

.visit-btn:active {
  transform: translateY(0);
}

.icon {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 15px;
  }

  .user-profile {
    padding: 15px 0;
  }

  .detail-avatar {
    width: 80px;
    height: 80px;
  }

  .user-name {
    font-size: 1.2em;
  }

  .info-section {
    padding: 12px;
    margin-bottom: 15px;
  }
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 15px;
}

.author-tag {
  font-size: 0.6em;
  background: var(--primary-color);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 6px;
  vertical-align: middle;
}

.author-menu {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--border-radius);
  background: var(--background-color);
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  transition: var(--transition);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

.menu-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--hover-shadow);
  color: var(--primary-color);
  background: var(--card-background);
  border-color: var(--primary-color);
}

.menu-item .icon {
  font-size: 1.2em;
}
</style>
