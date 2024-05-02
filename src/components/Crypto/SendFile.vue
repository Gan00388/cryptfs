<template #trigger>
    <NameList />
    <div class="upload">
        <h1>文件发送</h1>
        <span>加密方式:</span>
        <el-radio-group v-model="radio">
            <el-radio label="SM4" border>SM4</el-radio>
            <el-radio label="AES" border>AES</el-radio>
        </el-radio-group>
        <el-upload
            ref="uploadRef"
            drag
            action="action"
            :before-upload="beforeUpload"
            :http-request="submitUpload"
            multiple="false"
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="upload-btn">
            <el-button type="primary" @click="submitUpload" :loading="loading">确 定</el-button>
        </div>
    </div>
</template>


<script setup lang="ts">

import { ref, Ref, computed, inject } from 'vue';
import NameList from './NameList.vue';
import store from '@/store';
import {
    uploadFile
} from "../../../api/crypto.js";

let radio = ref("SM4");
let loading = ref(false);
const formData = new FormData(); 
const uploadRef: Ref<any> = ref(); 
const receiverTelephone = computed(() => store.state.selectedUserTelephone);
const message:any=inject('message')

function beforeUpload(file : File) {

    // const file = event.file;
    formData.delete('localFile');
    formData.delete('storageName');
    formData.delete('receiverTelephone');
    formData.delete('method');

    formData.append('storageName', file.name); 
    formData.append('localFile', file);

    if(receiverTelephone.value != null)
    {
        formData.append('receiverTelephone', receiverTelephone.value); 
    }
    else{
        alert('请选择接收者');
    }
    formData.append('method', radio.value);

    // console.log('114514');
    
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
        alert('文件大小必须小于20MB!');
        return false; // 阻止文件上传
    }

    return false; // 文件大小和类型校验通过，允许上传
}

function submitUpload() {

    uploadRef.value.submit();
    
    console.log(formData);
    //上传文件
    loading.value = true
    uploadFile(formData).then((response:any)=>{
        // console.log(114);
        if (response.data['code'] !== 200) {
            throw response
        }
    }).catch((response:any) => {
        message.error('error: ' + response.data)
        loading.value = false
    });

}


</script>

<script lang="ts">
export default {
    name: 'SendFile',
};
</script>