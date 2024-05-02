<template>
    <div class="container">
        <h1>用户列表</h1>
        <!-- 表格组件 -->
        <el-table :data="tableData" highlight-current-row @current-change="handleRowClick">
            <el-table-column prop="id" label="序号" width="80"></el-table-column>
            <el-table-column prop="telephone" label="电话号码" width="120"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        </el-table>
    
        <!-- 分页组件 -->
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
            layout="total, prev, pager, next, jumper" :total="tableTotal">
        </el-pagination>
        <p>选中的用户电话: {{ selectedUser }}</p>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    justify-content: center; 
    /* 水平居中对齐子元素，如果需要的话 */
}
</style>

<script setup lang="ts">

import { ref, Ref, computed, inject, onMounted } from 'vue';
import { useStore } from 'vuex';
import {
    getUsrList
} from "@/../api/system.js"

const store = useStore();
let currentPage = ref(1);
let pageSize = ref(10);
let tableTotal = ref(0);

let tableData = ref([
    {
        id: 1,
        name: "aaa",
        telephone: "123456",
    },
    {
        id: 2,
        name: "bbb",
        telephone: "54364676",
    },
    {
        id: 3,
        name: "ccc",
        telephone: "1634575686",
    }
])

interface TableRow {
    id: number;
    name: string;
    telephone: string;
}
let selectedRow: Ref<TableRow[]> = ref([]);

function handleCurrentChange(newPage: number) {
    currentPage.value = newPage;
}

function handleRowClick(currentRow: TableRow, _oldCurrentRow: TableRow) {
    selectedRow.value = [currentRow]; // 将当前行设为选中的行
    store.dispatch('updateSelectedUserTelephone', currentRow.telephone); // 更新 Vuex 中的状态
}


const message: any = inject('message')

function flushUserList() {
    //console.log("flushUserList")
    getUsrList(currentPage.value, pageSize.value).then((response: any) => {
        if (response.code !== 200) {
            //console.log("flushUserList11")
            throw response
        }
        tableData.value = response.data.userlist;
        tableTotal.value = response.data.total
        //console.log("flushUserList2")
        // loading.value = false
    }).catch((response: any) => {
        message.error('error: ' + response.data.msg)
        //console.log("flushUserList3")
        // loading.value = false
    })
}
onMounted(() => {
    flushUserList()
})

// 访问 Vuex state
let selectedUser = computed(() => store.state.selectedUserTelephone);
</script>

<script lang="ts">
export default {
    name: 'NameList',
}
</script>