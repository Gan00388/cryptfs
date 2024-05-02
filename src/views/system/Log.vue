<template>
    <div>
    <el-table :data="tableData" ref="singleTableRef" highlight-current-row style="font-size: 15px" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <el-table-column type="index" width="50" />
        <el-table-column label="日志内容">
            <template v-slot="scope">
                {{ scope.row }}
            </template>
        </el-table-column>
    </el-table>
    
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10]"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="tableTotal"
        style="margin-top:20px">
    </el-pagination>
</div>
</template>

<script lang="ts">
import {ref,onMounted,inject} from 'vue'
import { ElTable } from 'element-plus'
import {getLogList} from '../../../api/system'
export default{
    name: "Log",
    setup(){
        let tableData = ref(["日志内容dcbsakuibcLKAJhdciokaBCK",
        "日志内容dcdsbuoiaFBDKSAkaBCK",
        "日志内容DBASKIOuJRWUIOQFB CJKLWHOIHO"
        ])
        let pagesize=ref(10)
        let currentPage=ref(1)
        let tableTotal=ref(100)
        const message:any=inject('message')
        const singleTableRef = ref<InstanceType<typeof ElTable>>()
        function handleSizeChange(size:number) {
            pagesize.value = size;
            flushLogList()
        }
        function handleCurrentChange(page:number) {
            currentPage.value = page;
            flushLogList()
        }
        function flushLogList(){
            // console.log("重新加载日志列表")
            getLogList().then((response:any)=>{
                if (response.code !== 200) {
                throw response
                }
                tableData.value = response.data;
                tableTotal.value = response.data.length
               
            }).catch((response:any) => {
                message.error('获取日志信息失败')
            })
        }
        onMounted(() => {
            flushLogList()
            console.log(tableData.value)
        })
        return{
            flushLogList,
            handleSizeChange,
            handleCurrentChange,
            tableData,
            tableTotal,
            pagesize,
            currentPage,
            singleTableRef
        }
    }
}
    

</script>

<style scoped>
    button {
        font-weight: bold;
    }
</style>