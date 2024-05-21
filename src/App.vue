<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { useAppStore } from "./store";
const appStore = useAppStore();
</script>

<template>
  <el-config-provider :locale="appStore.locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
