<template>
  <div class="export-card" ref="exportCardRef">
    <div class="watermark">OshwHub<br />用户卡片</div>
    <div class="qr-code" v-if="qrDataUrl">
      <img :src="qrDataUrl" alt="QR Code" />
    </div>
    <div class="card-content" :class="{ 'with-detail': showDetail }">
      <!-- 左侧基础信息部分 -->
      <div class="basic-section">
        <img
          :src="currentAvatar"
          class="card-avatar"
          :alt="user?.nickname"
          @error="handleAvatarError"
        />
        <h3 class="card-title">{{ user.nickname }}</h3>
        <p class="card-username">@{{ user.username }}</p>
        <p class="user-tag">{{ user.team ? "团队账号" : "个人账号" }}</p>

        <!-- 基础统计信息 -->
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

        <!-- 添加账号基本信息到左侧 -->
        <div v-if="showDetail" class="basic-info-group">
          <div class="info-item">
            <span class="info-label">积分</span>
            <span class="info-value">{{ userInfo?.result.points }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">得分</span>
            <span class="info-value">{{ user?._score }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">FB官方</span>
            <span class="info-value">{{
              userInfo?.result.is_fp_office_account ? "是" : "否"
            }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">注册时间</span>
            <span class="info-value">{{ userInfo?.result.created_at }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧详细信息部分 -->
      <div v-if="showDetail" class="detail-section">
        <div class="detail-group">
          <h4 class="detail-title">项目统计</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">所有项目</span>
              <span class="detail-value">{{ user.count.all_projects }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">归档项目</span>
              <span class="detail-value">{{
                user.count.archived_projects
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">参与项目</span>
              <span class="detail-value">{{ user.count.joined_projects }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">公开项目</span>
              <span class="detail-value">{{ user.count.public_projects }}</span>
            </div>
          </div>
        </div>

        <div class="detail-group" v-if="!user.team && userInfo?.result">
          <h4 class="detail-title">个人信息</h4>
          <div class="detail-grid">
            <div class="detail-item" v-if="userInfo.result.info.career">
              <span class="detail-label">职业</span>
              <span class="detail-value">{{
                userInfo.result.info.career
              }}</span>
            </div>
            <div class="detail-item" v-if="userInfo.result.info.companycompany">
              <span class="detail-label">公司</span>
              <span class="detail-value">{{
                userInfo.result.info.companycompany
              }}</span>
            </div>
            <div class="detail-item" v-if="userInfo.result.info.school">
              <span class="detail-label">学校</span>
              <span class="detail-value">{{
                userInfo.result.info.school
              }}</span>
            </div>
            <div class="detail-item" v-if="userInfo.result.info.country">
              <span class="detail-label">所在地</span>
              <span class="detail-value">{{
                userInfo.result.info.country
              }}</span>
            </div>
            <div
              class="detail-item description"
              v-if="userInfo.result.info.site"
            >
              <span class="detail-label">个人网站</span>
              <span class="detail-value">{{ userInfo.result.info.site }}</span>
            </div>
            <div
              class="detail-item description"
              v-if="userInfo.result.introduction"
            >
              <span class="detail-label">个人简介</span>
              <span class="detail-value">{{
                userInfo.result.introduction
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watchEffect } from "vue";
import type { SearchUserInfo, UserInfoResponse } from "../types";
import { defaultAvatar } from "../service/services";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

const props = defineProps<{
  user: SearchUserInfo;
  showDetail: boolean;
  userInfo: UserInfoResponse;
}>();

const emit = defineEmits(["update:modelValue"]);

const exportCardRef = ref<HTMLElement | null>(null);

const currentAvatar = ref(defaultAvatar);

const qrDataUrl = ref("");

const handleAvatarError = () => {
  currentAvatar.value = defaultAvatar;
};

const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve();
    img.onerror = () => {
      console.error("Image load failed:", url);
      reject();
    };
    img.src = url;
  });
};

const exportAsImage = async () => {
  try {
    if (currentAvatar.value !== defaultAvatar) {
      await preloadImage(currentAvatar.value);
    }

    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!exportCardRef.value) return;

    const canvas = await html2canvas(exportCardRef.value, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: false,
    });

    const link = document.createElement("a");
    link.download = `${props.user.nickname}-oshwhub${
      props.showDetail ? "" : "-simple"
    }.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Export failed:", error);
  }
};

const generateQR = async () => {
  try {
    const url = `https://oshwhub.com/${props.user.username}`;
    const style = getComputedStyle(document.documentElement);
    qrDataUrl.value = await QRCode.toDataURL(url, {
      width: 100,
      margin: 1,
      color: {
        dark: style.getPropertyValue("--text-color").trim(),
        light: style.getPropertyValue("--card-background").trim(),
      },
    });
  } catch (err) {
    console.error("QR Code generation failed:", err);
  }
};
// 添加监听和处理逻辑
watchEffect(() => {
  const avatarUrl = props.user?.avatar;
  if (!avatarUrl || avatarUrl.includes("u.lceda.cn/images/avatar-default")) {
    currentAvatar.value = defaultAvatar;
  } else {
    currentAvatar.value = avatarUrl;
  }
  if (props.user?.username) {
    generateQR();
  }
});
defineExpose({
  exportAsImage,
});
</script>

<style scoped>
.export-card {
  position: fixed;
  left: -9999px;
  background: var(--card-background);
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  box-shadow: var(--shadow);
  width: v-bind("showDetail ? 'min(700px, 95vw)' : '300px'");
  position: relative;
}

.card-content {
  display: flex;
  gap: 20px;
  flex-wrap: v-bind("showDetail ? 'wrap' : 'nowrap'");
}

.card-content.with-detail {
  flex-direction: row;
}

.basic-section {
  flex: 1;
  min-width: 280px;
  max-width: v-bind("showDetail ? '100%' : '300px'");
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
}

.detail-section {
  flex: 1;
  min-width: 280px;
  padding: v-bind("showDetail ? '20px 0 0 0' : '0 0 0 20px'");
  border-left: v-bind("showDetail ? 'none' : '1px solid var(--border-color)'");
  padding-bottom: 0;
}

.detail-group {
  margin-bottom: 20px;
}

.detail-group:last-child {
  margin-bottom: 0;
}

.detail-title {
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
  color: var(--primary-color);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.detail-item {
  background: var(--background-color);
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-item.description {
  grid-column: 1 / -1;
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
.detail-label {
  color: var(--text-secondary);
  font-size: 0.8em;
}

.detail-value {
  color: var(--text-color);
  font-weight: 500;
  font-size: 0.9em;
}

.basic-info-group {
  width: 100%;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed var(--border-color);
}

.info-label {
  color: var(--text-secondary);
  font-size: 0.9em;
}

.info-value {
  color: var(--text-color);
  font-weight: 500;
}

.user-tag {
  margin: 5px 0;
  padding: 2px 8px;
  background: var(--primary-color);
  color: white;
  border-radius: 12px;
  font-size: 0.8em;
}

.watermark {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.7em;
  opacity: 0.9;
  z-index: 1;
  box-shadow: var(--shadow);
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
}

.qr-code {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px;
  width: 60px;
  height: 60px;
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

.qr-code img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
