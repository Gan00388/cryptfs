<template>
  <h1>进程规则管理</h1>
  <!-- 初始隐藏的表单 -->
  <el-dialog :title="addOrUpdateText" v-model="dialogFormVisible" width="500px">
    <el-form :model="personRuleInfo" label-width="80px">
    
    <el-form-item label="规则序号" prop="id">
      <el-input 
        v-model="personRuleInfo.id" 
        :disabled="dialogIsUpdate" 
        placeholder="请输入规则序号" 
        style="width:300px"></el-input>
    </el-form-item>
    
    <el-form-item label="进程名" prop="process">
      <el-input v-model="personRuleInfo.process" placeholder="请输入进程名" style="width:300px"></el-input>
    </el-form-item>
    
    <el-form-item label="文件路径" prop="path">
      <el-input v-model="personRuleInfo.path" placeholder="请输入文件路径" style="width:300px"></el-input>
    </el-form-item>

    <div style="text-align:right;">
        <el-button type="primary" round @click="dialogIsUpdate ? updateRule() : addRule()">{{addOrUpdateText}}</el-button>
    </div>
  </el-form>
  </el-dialog>

  <el-table :data="tableData.filter(
    (data) =>
      !search ||
      data.path.includes(search) ||
      data.process.includes(search)
  )
    " border style="width: 80%; margin: 0 auto">
    <el-table-column prop="id" label="规则序号" width="195"></el-table-column>
    <el-table-column prop="process" label="进程名" width="195"></el-table-column>
    <el-table-column prop="path" label="文件路径"></el-table-column>
    <el-table-column label="操作">
      <template v-slot:header>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button size="meduim" type="primary" @click="handleAdd">添加进程规则</el-button>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { getProcessList, addProcess, delProcess, updateProcess } from "@/api/process";

let dialogFormVisible=ref(false)
let dialogIsUpdate=ref(false)
let addOrUpdateText=ref("添加规则")
let search = ref("");
const message: any = inject('message')
let tableData = ref( [
  {
    path: "/root/code/sample1.txt",
    id: 4877,
    process: "sshd",
  },
  {
    path: "/home/user1/desktop/sample2.txt",
    id: 5412,
    process: "dockerd",
  },
  {
    path: "/home/user2/files/sample3.txt",
    id: 5539,
    process: "mysqld",
  },
  {
    path: "/home/user3/code/sample4.txt",
    id: 126784,
    process: "node",
  },
])
let personRuleInfo=ref({
  process:"",
  id:"",
  path:""
})

function handleEdit(row: any) {
  personRuleInfo.value = row
  dialogFormVisible.value = !dialogFormVisible.value
  dialogIsUpdate.value = true
  addOrUpdateText.value="修改规则"

}

function handleAdd() {
  personRuleInfo.value = {process:"", id:"", path:""}
  dialogFormVisible.value = !dialogFormVisible.value
  dialogIsUpdate.value = false
  addOrUpdateText.value="添加规则"
}

function handleDelete(id: any) {
  delProcess(id).then((response: any) => {
        if (response.code !== 200) {
            //console.log("flushProcessList11")
            throw response
        }
        flushProcessList()
        //console.log("flushProcessList2")
        // loading.value = false
    }).catch((response: any) => {
        message.error('error: ' + response.data)
        //console.log("flushProcessList3")
        // loading.value = false
    })
}

//获取进程列表
function flushProcessList() {
    //console.log("flushProcessList")
    getProcessList().then((response: any) => {
        if (response.code !== 200) {
            //console.log("flushProcessList11")
            throw response
        }
        tableData.value = response.data;
        //console.log("flushProcessList2")
        // loading.value = false
    }).catch((response: any) => {
        message.error('error: ' + response.data)
        //console.log("flushProcessList3")
        // loading.value = false
    })
}

onMounted(() => {
    flushProcessList()
})

//更新进程信息
function updateRule() {
  updateProcess(personRuleInfo.value.id, personRuleInfo.value).then((response: any) => {
    if (response.code !== 200) {
      //console.log("flushProcessList11")
      throw response
    }
      flushProcessList()
      //console.log("flushProcessList2")
      // loading.value = false
  }).catch((response: any) => {
    message.error('error: ' + response.data)
    //console.log("flushProcessList3")
    // loading.value = false
  })
  dialogFormVisible.value = !dialogFormVisible.value
}

function addRule() {
  addProcess(personRuleInfo.value).then((response: any) => {
    if (response.code !== 200) {
      //console.log("flushProcessList11")
      throw response
    }
      flushProcessList()
      //console.log("flushProcessList2")
      // loading.value = false
  }).catch((response: any) => {
    message.error('error: ' + response.data)
    //console.log("flushProcessList3")
    // loading.value = false
  })
  dialogFormVisible.value = !dialogFormVisible.value
}



</script>

<style scoped></style>
