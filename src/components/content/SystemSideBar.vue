<template>
    <el-row class="asb">
        <el-col>
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="transparent" active-text-color="#1E90FF">
            <el-submenu index="1">
            <template #title>
                <i class="el-icon-menu"></i>
                <span>系统管理</span>
            </template>
            <el-menu-item index="/system/users">用户管理</el-menu-item>
            <el-menu-item index="/system/log">日志</el-menu-item>
            <el-menu-item index="/system/file_transfer">文件传输列表</el-menu-item>
            </el-submenu>
        </el-menu>
        </el-col>
    </el-row>
</template>
  
<script>
export default {
  name: "SystemSideBar"
}
</script>
  
<style scoped></style>