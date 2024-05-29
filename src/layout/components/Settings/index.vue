<template>
  <el-drawer
    v-model="settingVisible"
    size="300"
    :title="$t('settings.project')"
  >
    <el-divider>{{ $t("settings.theme") }}</el-divider>
    <div class="flex-center">
      <el-switch
        v-model="isDark"
        active-icon="Moon"
        inactive-icon="Sunny"
        @change="changeTheme"
      />
    </div>
    <el-divider>{{ $t("settings.interface") }}</el-divider>
    <div class="settings-option">
      <span class="text-xs">{{ $t("settings.themeColor") }}</span>
      <ThemeColorPicker
        v-model="settingsStore.themeColor"
        @update:model-value="changeThemeColor"
      />
    </div>

    <div class="settings-option">
      <span class="text-xs">{{ $t("settings.tagsView") }}</span>
      <el-switch v-model="settingsStore.tagsView" />
    </div>

    <div class="settings-option">
      <span class="text-xs">{{ $t("settings.fixedHeader") }}</span>
      <el-switch v-model="settingsStore.fixedHeader" />
    </div>

    <div class="settings-option">
      <span class="text-xs">{{ $t("settings.sidebarLogo") }}</span>
      <el-switch v-model="settingsStore.sidebarLogo" />
    </div>
    <el-divider>{{ $t("settings.navigation") }}</el-divider>
    <LayoutSelect
      v-model="settingsStore.layout"
      @update:modelValue="changeLayout"
    />
  </el-drawer>
</template>

<script setup lang="ts">
import { LayoutEnum } from "@/enums/LayoutEnum";
import { ThemeEnum } from "@/enums/ThemeEnum";
import { useAppStore, usePermissionStore, useSettingsStore } from "@/store";

const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const settingVisible = computed({
  get() {
    return settingsStore.settingsVisible;
  },
  set(val) {
    settingsStore.settingsVisible = val;
  },
});

const isDark = ref(settingsStore.theme === ThemeEnum.DARK);
const changeTheme = (val: any) => {
  isDark.value = val;
  settingsStore.changeTheme(isDark.value ? ThemeEnum.DARK : ThemeEnum.LIGHT);
};

const changeLayout = (layout: string) => {
  settingsStore.changeLayout(layout);
  if (layout === LayoutEnum.MIX) {
    route.name && againActiveTop(route.name as string);
  }
};

function againActiveTop(newVal: string) {
  const parent = findOutermostParent(permissionStore.routes, newVal);
  if (appStore.activeTopMenu !== parent.path) {
    appStore.activeTopMenu(parent.path);
  }
}

function findOutermostParent(tree: any[], findName: string) {
  let parentMap: any = {};

  function buildParentMap(node: any, parent: any) {
    parentMap[node.name] = parent;

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        buildParentMap(node.children[i], node);
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    buildParentMap(tree[i], null);
  }

  let currentNode = parentMap[findName];
  while (currentNode) {
    if (!parentMap[currentNode.name]) {
      return currentNode;
    }
    currentNode = parentMap[currentNode.name];
  }

  return null;
}

const changeThemeColor = (color: string) => {
  settingsStore.changeThemeColor(color);
};
</script>

<style scoped lang="scss">
.settings-option {
  @apply py-1 flex-x-between;
}
</style>
