<template>
  <div class="navbar-container">
    <!-- 导航栏左侧 -->
    <NavBarLeft />
    <!-- 导航栏右侧 -->
    <NavBarRight />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.navbar-container {
  @apply flex-x-between;

  height: $navbar-height;
  background: var(--el-bg-color);
}
</style>
