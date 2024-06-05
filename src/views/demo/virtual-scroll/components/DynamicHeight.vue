<template>
  <div class="h-125 bg-green overflow-auto" ref="virtualScrollContainer2">
    <div class="list-content" ref="listRef" :style="scrollStyle">
      <div
        class="list-item w-full"
        v-for="item in visibleList"
        :style="{ height: item.realHeight + 'px' }"
        :key="item.id"
      >
        {{ item.id }},高度为{{ item.realHeight }}px
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="
    T extends {
      [x: string]: number;
      id: number;
    }
  "
>
import { CSSProperties } from "vue";
import { throttle } from "lodash";
interface IEstimatedListProps<T> {
  estimatedHeight: number;
  list: T[];
}
const props = defineProps<IEstimatedListProps<T>>();
const emit = defineEmits(["getMoreData"]);

const virtualScrollContainer2 = ref<HTMLElement>();

const containerHeight = computed(() => {
  return virtualScrollContainer2.value?.clientHeight || 0;
});
const listHeight = ref(props.list.length * props.estimatedHeight); //总列表高度
const startIndex = ref(0); //起始索引
const maxCount = ref(0); //最大容纳量
const preLength = ref(0); //上次计算长度
const endIndex = computed(() => {
  return Math.min(startIndex.value + maxCount.value, props.list.length);
});
const visibleList = computed(() => {
  return props.list.slice(startIndex.value, endIndex.value);
});

const offsetDis = computed(() =>
  startIndex.value > 0 ? positionList.value[startIndex.value - 1].bottom : 0
);

const scrollStyle = computed(
  () =>
    ({
      height: `${listHeight.value - offsetDis.value}px`,
      transform: `translate3d(0, ${offsetDis.value}px, 0)`,
    }) as CSSProperties
);

interface IPosInfo {
  // 当前pos对应的元素索引
  index: number;
  // 元素顶部所处位置
  top: number;
  // 元素底部所处位置
  bottom: number;
  // 元素高度
  height: number;
  // 自身对比高度差：判断是否需要更新
  dHeight: number;
}

const positionList = ref<IPosInfo[]>([]);
function initPosition() {
  const pos: IPosInfo[] = [];
  const disLen = props.list.length - preLength.value;
  const currentLen = positionList.value.length;
  const preBottom = positionList.value[currentLen - 1]
    ? positionList.value[currentLen - 1].bottom
    : 0;
  for (let i = 0; i < disLen; i++) {
    const item = props.list[preLength.value + i];
    pos.push({
      index: item.id,
      height: props.estimatedHeight,
      top: preBottom
        ? preBottom + i * props.estimatedHeight
        : item.id * props.estimatedHeight,
      bottom: preBottom
        ? preBottom + (i + 1) * props.estimatedHeight
        : (item.id + 1) * props.estimatedHeight,
      dHeight: 0,
    });
  }
  positionList.value = [...positionList.value, ...pos];
  preLength.value = props.list.length;
}
watch(
  () => props.list.length,
  () => {
    initPosition();
    nextTick(() => {
      setPosition();
    });
  }
);

const listRef = ref<HTMLDivElement | null>(null);
const setPosition = () => {
  const nodes = listRef.value?.children;
  if (!nodes || !nodes.length) return;
  [...nodes].forEach((node) => {
    const rect = node.getBoundingClientRect();
    const item = positionList.value[+node.id];
    const dHeight = item.height - rect.height;
    if (dHeight) {
      item.height = rect.height;
      item.bottom = item.bottom - dHeight;
      item.dHeight = dHeight;
    }
  });
  // start item ~ end item 处理
  const startId = +nodes[0].id;
  const len = positionList.value.length;
  // startHeight 作为 dHeight 的累计值
  let startHeight = positionList.value[startId].dHeight;
  positionList.value[startId].dHeight = 0;
  for (let i = startId + 1; i < len; i++) {
    const item = positionList.value[i];
    item.top = positionList.value[i - 1].bottom;
    item.bottom = item.bottom - startHeight;
    if (item.dHeight !== 0) {
      startHeight += item.dHeight;
      item.dHeight = 0;
    }
  }
  // 设置 list 高度
  listHeight.value = positionList.value[len - 1].bottom;
};

const binarySearch = (list: IPosInfo[], value: number) => {
  let left = 0,
    right = list.length - 1,
    templateIndex = -1;
  while (left < right) {
    const midIndex = Math.floor((left + right) / 2);
    const midValue = list[midIndex].bottom;
    if (midValue === value) return midIndex + 1;
    else if (midValue < value) left = midIndex + 1;
    else if (midValue > value) {
      if (templateIndex === -1 || templateIndex > midIndex)
        templateIndex = midIndex;
      right = midIndex;
    }
  }
  return templateIndex;
};
const throttleScroll = throttle(handleScroll, 500);
function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } =
    virtualScrollContainer2.value!;
  if (scrollTop) {
    startIndex.value = binarySearch(positionList.value, scrollTop);
  }
  // 补充触底操作
  const bottom = scrollHeight - clientHeight - scrollTop;
  console.log(
    "scrollHeight - clientHeight - scrollTop",
    bottom,
    scrollHeight,
    clientHeight,
    scrollTop
  );
  if (bottom <= 20) {
    emit("getMoreData");
  }
}
watch(startIndex, () => {
  setPosition();
});
onMounted(() => {
  maxCount.value = Math.ceil(containerHeight.value / props.estimatedHeight);
  initPosition();
  virtualScrollContainer2.value?.addEventListener("scroll", throttleScroll);
});
onBeforeUnmount(() => {
  virtualScrollContainer2.value?.removeEventListener("scroll", throttleScroll);
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
