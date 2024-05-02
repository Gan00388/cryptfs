<template>
    <div>
    <el-table :data="tableData" ref="singleTableRef" highlight-current-row style="font-size: 15px" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <el-table-column type="index" width="50" />
        <el-table-column prop="storageName" label="oss中文件名"></el-table-column>
        <el-table-column prop="senderTelephone" label="发送者电话"></el-table-column>
        <el-table-column prop="receiverTelephone" label="接收者电话"></el-table-column>
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
import { getFileList } from '../../../api/system'
export default{
    name: "FileTransfer",
    setup(){
        let tableData = ref([
        {
            storageName: "111",
            senderTelephone: "3123131",
            receiverTelephone: "43212222231",
        },
        {
            storageName: "filename",
            senderTelephone: "17657435345",
            receiverTelephone: "186786868",
        },
        {
            storageName:"xxxx",
            senderTelephone: "1543645776",
            receiverTelephone: "5887686",
        }
        ])
        let pagesize=ref(10)
        let currentPage=ref(1)
        let tableTotal=ref(100)
        const message:any=inject('message')
        const singleTableRef = ref<InstanceType<typeof ElTable>>()
        function handleSizeChange(size:number) {
            pagesize.value = size;
            flushFileList()
        }
        function handleCurrentChange(page:number) {
            currentPage.value = page;
            flushFileList()
        }
        function flushFileList(){
            // console.log("重新加载文件传输列表列表")
            getFileList(currentPage.value,pagesize.value).then((response:any)=>{
                if (response.code !== 200) {
                throw response
                }
                tableData.value = response.data.userlist;
                tableTotal.value = response.data.total
               
            }).catch((response:any) => {
                message.error('获取文件传输列表失败')
            })
        }
        onMounted(() => {
            flushFileList()
        })
        return{
            flushFileList,
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