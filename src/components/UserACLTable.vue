<template>
  <h1>用户规则管理</h1>
  <!-- 初始隐藏的表单 -->
  <el-dialog :title="addOrUpdateText" v-model="dialogFormVisible" width="500px">
    <el-form :model="personRuleInfo" label-width="80px">
    
    <el-form-item label="用户ID" prop="id">
      <el-input 
        v-model="personRuleInfo.id" 
        :disabled="dialogIsUpdate" 
        placeholder="请输入用户ID" 
        style="width:300px"></el-input>
    </el-form-item>
    
    <el-form-item label="用户名" prop="usr">
      <el-input v-model="personRuleInfo.usr" placeholder="请输入用户名" style="width:300px"></el-input>
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
      data.usr.includes(search)
  )
    " border style="width: 80%; margin: 0 auto">
    <el-table-column prop="id" label="序号" width="150">
      <template #default="{ $index }">  
        {{ $index + 1 }} <!-- $index 是当前行的索引，从 0 开始，所以加 1 以得到从 1 开始的序号 -->  
      </template> 
    </el-table-column>
    <el-table-column prop="id" label="用户ID" width="120"></el-table-column>
    <el-table-column prop="usr" label="用户名" width="120"></el-table-column>
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
  <el-button size="meduim" type="primary" @click="handleAdd">添加用户规则</el-button>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { getUsrList, addUsr, delUsr, updateUsr } from "@/api/usr";

let dialogFormVisible=ref(false)
let dialogIsUpdate=ref(false)
let addOrUpdateText=ref("添加规则")
let search = ref("");
const message: any = inject('message')
let tableData = ref( [
  {
    path: "/root/code/sample1.txt",
    id: 0,
    usr: "root",
  },
  {
    path: "/home/user1/desktop/sample2.txt",
    id: 1000,
    usr: "user1",
  },
  {
    path: "/home/user2/files/sample3.txt",
    id: 1001,
    usr: "user2",
  },
  {
    path: "/home/user3/code/sample4.txt",
    id: 1002,
    usr: "user3",
  },
])
let personRuleInfo=ref({
  usr:"",
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
  personRuleInfo.value = {usr:"", id:"", path:""}
  dialogFormVisible.value = !dialogFormVisible.value
  dialogIsUpdate.value = false
  addOrUpdateText.value="添加规则"
}

function handleDelete(id: any) {
  delUsr(id).then((response: any) => {
        if (response.code !== 200) {
            //console.log("flushUserList11")
            throw response
        }
        flushUserList()
        //console.log("flushUserList2")
        // loading.value = false
    }).catch((response: any) => {
        message.error('error: ' + response.data)
        //console.log("flushUserList3")
        // loading.value = false
    })
}

//获取用户列表
function flushUserList() {
    //console.log("flushUserList")
    getUsrList().then((response: any) => {
        if (response.code !== 200) {
            //console.log("flushUserList11")
            throw response
        }
        tableData.value = response.data;
        //console.log("flushUserList2")
        // loading.value = false
    }).catch((response: any) => {
        message.error('error: ' + response.data)
        //console.log("flushUserList3")
        // loading.value = false
    })
}

onMounted(() => {
    flushUserList()
})

//更新用户信息
function updateRule() {
  updateUsr(personRuleInfo.value.id, personRuleInfo.value).then((response: any) => {
    if (response.code !== 200) {
      //console.log("flushUserList11")
      throw response
    }
      flushUserList()
      //console.log("flushUserList2")
      // loading.value = false
  }).catch((response: any) => {
    message.error('error: ' + response.data)
    //console.log("flushUserList3")
    // loading.value = false
  })
  dialogFormVisible.value = !dialogFormVisible.value
}

function addRule() {
  addUsr(personRuleInfo.value).then((response: any) => {
    if (response.code !== 200) {
      //console.log("flushUserList11")
      throw response
    }
      flushUserList()
      //console.log("flushUserList2")
      // loading.value = false
  }).catch((response: any) => {
    message.error('error: ' + response.data)
    //console.log("flushUserList3")
    // loading.value = false
  })
  dialogFormVisible.value = !dialogFormVisible.value
}



</script>

<style scoped></style>
