<template>
  <el-menu
    :default-active="currentRoute.path"
    :collapse="!appStore.sidebar.opened"
    :background-color="variables['menu-background']"
    :text-color="variables['menu-text']"
    :active-text-color="variables['menu-active-text']"
    :unique-opened="false"
    :collapse-transition="false"
    :mode="layout === 'top' ? 'horizontal' : 'vertical'"
  >
    <SidebarMenuItem
      v-for="route in menuList"
      :key="route.path"
      :item="route"
      :basePath="resolvePath(route.path)"
      :is-collapse="!appStore.sidebar.opened"
    />
  </el-menu>
</template>

<script setup lang="ts">
import { useSettingsStore, useAppStore } from "@/store";
import { isExternal } from "@/utils";
import path from "path-browserify";
import variables from "@/styles/variables.module.scss";

const props = defineProps({
  menuList: {
    type: Array<any>,
    default: () => [],
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  },
});
const settingsStore = useSettingsStore();
const appStore = useAppStore();
const currentRoute = useRoute();
const layout = computed(() => {
  return settingsStore.layout;
});

/**
 * 解析路径
 *
 * @param routePath 路由路径 /user
 */
function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  // 完整绝对路径 = 父级路径(/system) + 路由路径(/user)
  const fullPath = path.resolve(props.basePath, routePath);
  return fullPath;
}
</script>

<style scoped lang="scss"></style>
