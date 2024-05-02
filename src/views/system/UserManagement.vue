<template>
    <div>
    <div style="margin-bottom:20px;margin-left:0px;text-align: left;">
        <el-button type="primary" @click="addPerson" >添加用户/管理员</el-button>
    </div>
    <el-dialog title="添加用户/管理员" v-model="dialogFormVisible" width="500px">
    <el-form :model="personinfo" label-width="80px">
    <el-form-item label="用户类别">
        <el-select
            v-model="personinfo.role"
            placeholder="请选择类别"
            style="width:300px"

        >
            <el-option
                v-for="item in CategoryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            />
        </el-select>
    </el-form-item>
    
    <el-form-item label="姓名" prop="name">
      <el-input v-model="personinfo.name" placeholder="请输入姓名" style="width:300px"></el-input>
    </el-form-item>
    
    <el-form-item label="电话" prop="telephone">
      <el-input v-model="personinfo.telephone" placeholder="请输入电话" style="width:300px"></el-input>
    </el-form-item>
    
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="personinfo.password" placeholder="请输入密码" style="width:300px"></el-input>
    </el-form-item>

    <div style="text-align:right;">
        <el-button type="primary" round @click="submit">添加</el-button>
    </div>
  </el-form>
    </el-dialog>
    <el-table :data="tableData" style="font-size: 15px" border :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column label="操作">
        <template v-slot="scope">
            <el-button type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
            <!-- <el-popconfirm icon="el-icon-info" icon-color="red" title="确定删除该项吗？" style="margin-left: 10px;"
                            @confirm="deleteRow(scope.row)">
                
            </el-popconfirm> -->
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
        :total="tableTotal">
    </el-pagination>
</div>
</template>

<script lang="ts">
import {ref,reactive,onMounted,inject} from 'vue'
import {
    getUsrList,
    addUsr,
    delUsr
}from "../../../api/system.js"
export default{
    name: "UserManagement",
    setup(){
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
        let personinfo=ref({
            name:"",
            role:"",
            telephone:"",
            password:"",
        })
      
        let pagesize=ref(10)
        let currentPage=ref(1)
        let tableTotal=ref(100)
        let dialogFormVisible=ref(false)
        const CategoryOptions=[
            {
                label:"管理员",
                value:"admin",
            },
            {
                label:"普通用户",
                value:"user"
            }]
        const message:any=inject('message')
        function submit(){
            // 提交api
            addUsr(personinfo.value).then((response:any)=>{
                if(response.code!==200){
                    message.error('添加失败')
                    throw response
                } 
                message.success('添加成功')
                dialogFormVisible.value=false
                flushUserList()

            }).catch(err=>{
                message.error('添加失败')
            })
            
        }
        function handleSizeChange(size:number) {
            pagesize.value = size;
            flushUserList()
        }
        function handleCurrentChange(page:number) {
            currentPage.value = page;
            flushUserList()
        }
        function flushUserList(){
            getUsrList(currentPage.value,pagesize.value).then((response:any)=>{
                if (response.code !== 200) {
                throw response
                }
                tableData.value = response.data.userlist;
                tableTotal.value = response.data.total
               
            }).catch((response:any) => {
                message.error('error: ' + response.msg)
            })
        }
        function deleteRow(id:number){
            // 删除api
            delUsr(id).then((response:any)=>{
                if(response.code!==200) throw response
                message.success('删除成功')
                flushUserList()
            }).catch(err=>{
                message.error('删除失败！')
            })
        }
        function addPerson(){
            // message.error('添加失败！')
            dialogFormVisible.value=true
        }
        onMounted(() => {
            flushUserList()
              
        })
        return{
            tableData,
            personinfo,
            dialogFormVisible,
            CategoryOptions,
            tableTotal,
            message,
            pagesize,
            currentPage,
            deleteRow,
            addPerson,
            handleCurrentChange,
            handleSizeChange,
            flushUserList,
            submit
        }
        
    },
}


</script>

<style scoped>

</style>