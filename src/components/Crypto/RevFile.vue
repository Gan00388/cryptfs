<template>
    <div class="container">
        <h1>文件列表</h1>
        <!-- 表格组件 -->
        <el-table :data="tableData" highlight-current-row @current-change="handleRowClick">
            <el-table-column label="序号" width="80">
                <template #default="{ $index }">  
                    {{ $index + 1 }} <!-- $index 是当前行的索引，从 0 开始，所以加 1 以得到从 1 开始的序号 -->  
                </template> 
            </el-table-column>
            <el-table-column prop="StorageName" label="文件名" width="120"></el-table-column>
            <el-table-column prop="SenderTelephone" label="发送者电话" width="120"></el-table-column>
        </el-table>
    
        <!-- 分页组件 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="tableTotal">
        </el-pagination>
    </div>
    <div>
        <h1>文件下载</h1>
        <span>{{ storageName }}&nbsp;&nbsp;</span>
        <el-button @click="download">下载文件</el-button>
    </div>
</template>

<style scoped>
    .container {
        display: grid;
        justify-content: center; /* 水平居中对齐子元素，如果需要的话 */
    }
</style>

<script setup lang="ts">

import { ref, Ref, inject, onMounted } from 'vue';
import { downloadFile, getFileList } from '@/../api/crypto.js';
// import { getFileList } from '../../../api/system'

let currentPage = ref(1);
let pageSize = ref(10);
let tableTotal = ref(0);
let localFile = ref('D:gal');
let storageName = ref('');
const message:any=inject('message')

let tableData = ref([
        {
            SenderTelephone: "aaa",
            StorageName: "123456",
        },
        {
            SenderTelephone: "bbb",
            StorageName: "54364676",
        },
        {
            SenderTelephone: "ccc",
            StorageName: "1634575686",
        }
        ])

interface TableRow {
    SenderTelephone: string;
    StorageName: string;
}

let selectedRow: Ref<TableRow[]> = ref([]);

function handleCurrentChange(newPage: number) {
      currentPage.value = newPage;
}

function flushFileList() {
    getFileList(currentPage.value, pageSize.value).then((response:any)=>{     
                if (response.code !== 200) {
                    throw response
                }
                tableData.value = response.data.userlist;
                tableTotal.value = response.data.total
                // loading.value = false
            }).catch((response:any) => {
                message.error('error: ' + response.data.msg)
                // loading.value = false
            })
}
onMounted(()=>{
    flushFileList()
})

function handleRowClick(currentRow: TableRow, _oldCurrentRow: TableRow) {
    selectedRow.value = [currentRow]; // 将当前行设为选中的行
    storageName.value = currentRow.StorageName;
}

function download() {
    downloadFile(localFile.value, storageName.value).then((response:any)=>{
        
        //这串代码是因为json后面附加了东西所以得处理
        // 初始化计数器和索引变量
        let count = 0;
        let index = -1;
        let jsonString = '';
        let fileString = '';

        // 遍历字符串查找第二个`}`
        for (let i = 0; i < response.length; i++) {
            if (response[i] === '}') {
                count++;
                if (count === 2) {
                index = i;
                break;
                }   
            }
        }

        // 如果找到第二个`}`
        if (index !== -1) {
            // 截取到第二个`}`（包括该字符）
            jsonString = response.substring(0, index + 1);
            fileString = response.substring(index + 1);
            console.log(fileString);
            try {
                // 尝试解析JSON字符串
                let jsonData = JSON.parse(jsonString);
                if (jsonData.code !== 200) {
                    throw response
                }
                // 访问code属性
                console.log("Code:", jsonData.code);  // 输出: Code: 200
            } catch (error) {
                console.error("Parsing error:", error);
                throw response
            }
        } else {
            console.log('The second } was not found.');
            throw response
        }

        const url = window.URL.createObjectURL(new Blob([fileString]));
        const link = document.createElement('a');
        link.href = url;
        // 设定下载文件名，你可以从响应中获取或自定义
        link.setAttribute('download', storageName.value);  // 指定下载文件的名称和格式
        document.body.appendChild(link);
        link.click();
        // 清理并移除临时链接
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

                // loading.value = false
        }).catch((response:any) => {
            message.error('error: ' + response.msg)
                // loading.value = false
        })
}


</script>

<script lang="ts">
export default {
    name: 'RevFile',
};
</script>