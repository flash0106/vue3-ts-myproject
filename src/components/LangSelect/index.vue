<template>
  <el-dropdown
    trigger="click"
    placement="bottom"
    @command="handleLanguageChange"
  >
    <div class="lang-select-trigger">
      <svg-icon icon-class="language" :size="size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :disabled="appStore.language === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/store/modules/app";
import { LanguageEnum } from "@/enums/LanguageEnum";
defineProps({
  size: {
    type: String,
    required: false,
  },
});
const appStore = useAppStore();
const { locale, t } = useI18n();
const langOptions = [
  { label: "中文", value: LanguageEnum.ZH_CN },
  { label: "English", value: LanguageEnum.EN },
];

function handleLanguageChange(lang: string) {
  locale.value = lang;
  appStore.changeLanguage(lang);

  ElMessage.success(t("langSelect.message.success"));
}
</script>

<style scoped lang="scss"></style>
