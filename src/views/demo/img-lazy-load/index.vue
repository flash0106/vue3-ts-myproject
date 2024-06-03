<template>
  <div class="img-lazy-load page-container">
    <h1>图片懒加载</h1>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card>
          <template #header>方式1（原生JS）</template>
          <div class="container h-2xl overflow-scroll method-1-container">
            <template v-for="(item, index) in imgList" :key="index">
              <img :data-src="item" alt="" class="w-full" />
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>方式2（Intersection Observer API）</template>
          <div class="container h-2xl overflow-scroll method-2-container">
            <template v-for="(item, index) in imgList" :key="index">
              <img :data-src="item" alt="" class="w-full" />
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>方式3（img标签新属性load）</template>
          <div class="container h-2xl overflow-scroll method-3-container">
            <template v-for="(item, index) in imgList" :key="index">
              <img :src="item" alt="" class="w-full" loading="lazy" />
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import throttle from "lodash/throttle";

const imgList: string[] = reactive([]);
for (let i = 0; i < 100; i++) {
  imgList.push(`https://picsum.photos/id/${i}/200/100`);
}
const loadCount = ref(0);
function lazyLoad() {
  const lazyLoadImgList = document.querySelectorAll(".method-1-container img");
  const lazyLoadContainer = document.querySelector(".method-1-container");
  const clientHeight = (lazyLoadContainer as HTMLElement).clientHeight;
  const scrollTop = (lazyLoadContainer as HTMLElement).scrollTop;

  for (let i = loadCount.value; i < lazyLoadImgList.length; i++) {
    let element = lazyLoadImgList[i] as HTMLElement;
    if (element.offsetTop < clientHeight + scrollTop) {
      element.setAttribute("src", element.getAttribute("data-src") as string);
      loadCount.value = i + 1;
    }
  }
}
const observer = new IntersectionObserver(ObserverCb);

function ObserverCb(entries: any) {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      const image = entry.target;
      image.setAttribute("src", image.getAttribute("data-src") as string);
      observer.unobserve(image);
    }
  });
}
onMounted(() => {
  lazyLoad();
  const container1 = document.querySelector(
    ".method-1-container"
  ) as HTMLElement;
  container1.addEventListener("scroll", throttle(lazyLoad, 1000));
  const lazyLoadImgList2 = document.querySelectorAll(".method-2-container img");
  lazyLoadImgList2.forEach((item) => {
    observer.observe(item);
  });
});
onBeforeUnmount(() => {
  const container1 = document.querySelector(
    ".method-1-container"
  ) as HTMLElement;
  container1.removeEventListener("scroll", throttle(lazyLoad, 1000));
});
</script>

<style scoped lang="scss"></style>
