<template>
  <div>
    <el-container>
      <el-header >SM9密钥管理系统</el-header>
      <el-container>
        <el-aside width="200px"><SystemSideBar></SystemSideBar></el-aside>
        <el-main style="overflow: hidden;"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import SystemSideBar from "@/components/content/SystemSideBar.vue"

export default {
    name: "System",
    components: {
        SystemSideBar
    }
}
</script>

<style scoped>
.el-header {
    --el-header-padding: 12 6px;
    --el-header-height: 59px;
    padding: var(--el-header-padding);
    box-sizing: border-box;
    height: var(--el-header-height);
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(238 241 246);

}

.el-container {
  padding:10px 0px;
}

</style>