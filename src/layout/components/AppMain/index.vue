<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          mode="out-in"
        >
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { useTagsViewStore } from "@/store/modules/tagsView";

const cachedViews = computed(() => {
  return useTagsViewStore().cachedViews;
});
</script>

<style scoped lang="scss"></style>
