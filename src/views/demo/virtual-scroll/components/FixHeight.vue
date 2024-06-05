<template>
  <div
    ref="virtualScrollContainer1"
    class="h-125 bg-blue overflow-auto position-relative"
  >
    <div
      class="placeholder-dom position-absolute"
      :style="{ height: currentOffset + 'px' }"
    ></div>
    <div
      class="list-content"
      :style="{ transform: `translate3d(0, ${currentOffset}px, 0)` }"
    >
      <div
        v-for="item in visibleList"
        :key="item"
        :style="{ height: itemHeight + 'px' }"
        class="w-full list-item"
      >
        {{ item }}
      </div>
    </div>
    <div
      class="placeholder-dom"
      :style="{ height: endPlaceholderHeight + 'px' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { throttle } from "lodash";
const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const itemCount = ref(1000);
const itemHeight = ref(50);
const bigList = computed(() => {
  return props.list as any[];
});

const virtualScrollContainer1 = ref<HTMLElement>();

const containerHeight = computed(() => {
  //容器高度
  return virtualScrollContainer1.value?.clientHeight || 0;
});
const listHeight = computed(() => {
  //列表总高度
  return itemCount.value * itemHeight.value;
});
const visibleCount = computed(() => {
  return Math.ceil(containerHeight.value / itemHeight.value) + 2;
});

const startIndex = ref(0);
const endIndex = computed(() => {
  let calcIndex = startIndex.value + visibleCount.value;
  return calcIndex < itemCount.value ? calcIndex : itemCount.value;
});

const visibleList = computed(() => {
  return bigList.value.slice(startIndex.value, endIndex.value);
});
const currentOffset = ref(0);
const endPlaceholderHeight = computed(() => {
  return listHeight.value - containerHeight.value - currentOffset.value;
});

const scrollEvent = (e: Event) => {
  const scrollTop = (e.target as HTMLElement).scrollTop;
  startIndex.value = Math.floor(scrollTop / itemHeight.value);

  currentOffset.value = scrollTop;
};
onMounted(() => {
  virtualScrollContainer1.value?.addEventListener("scroll", (e) => {
    return throttle(scrollEvent, 500)(e);
  });
});

onBeforeUnmount(() => {
  virtualScrollContainer1.value?.removeEventListener("scroll", (e) => {
    return throttle(scrollEvent, 500)(e);
  });
});
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1px 0 inset #141617;
}
</style>
