<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <!--混合布局-->
    <div class="flex w-full" v-if="layout == LayoutEnum.MIX">
      <SidebarLogo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
      <SidebarMixTopMenu class="flex-1" />
      <NavBarRight />
    </div>
    <!--左侧布局 || 顶部布局 -->
    <template v-else>
      <SidebarLogo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
      <el-scrollbar>
        <SidebarMenu :menu-list="permissionStore.routes" base-path="" />
      </el-scrollbar>
      <NavBarRight v-if="layout === LayoutEnum.TOP" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore, useAppStore, usePermissionStore } from "@/store";
import { LayoutEnum } from "@/enums/LayoutEnum";

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const sidebarLogo = computed(() => {
  return settingsStore.sidebarLogo;
});
const layout = computed(() => {
  return settingsStore.layout;
});
</script>

<style scoped lang="scss">
.has-logo {
  .el-scrollbar {
    height: calc(100vh - $navbar-height);
  }
}
</style>
