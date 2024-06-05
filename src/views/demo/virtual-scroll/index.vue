<template>
  <div class="page-container">
    <h1>虚拟滚动</h1>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>固定高度方案</template>
          <FixHeight :list="bigList" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>动态高度方案</template>
          <DynamicHeight
            :list="dynamicHeightList"
            :estimated-height="50"
            @getMoreData="addData"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const bigList = Array.from({ length: 1000 }, (_, i) => i + 1);

const dynamicHeightList = ref(
  Array.from({ length: 10 }, (_, i) => {
    return {
      id: i + 1,
      realHeight: Math.floor(Math.random() * 100) + 50,
    };
  })
);

const addData = () => {
  const newData = Array.from({ length: 10 }, (_, i) => {
    return {
      id: dynamicHeightList.value.length + i + 1,
      realHeight: Math.floor(Math.random() * 100) + 50,
    };
  });
  setTimeout(() => {
    dynamicHeightList.value.push(...newData);
  });
};
</script>

<style scoped lang="scss"></style>
