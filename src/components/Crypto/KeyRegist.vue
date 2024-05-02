<template>
    <div>
        <h1>密钥注册</h1>
    </div>
    <div class="s1">
        <el-button @click="keyReg()">注册</el-button>
        <i class="el-icon-success" v-if="isSuccess == 1" name="Check"></i>
        <br>
        <el-button @click="keyDel()">删除</el-button>
        <i class="el-icon-success" v-if="isSuccess == 2" name="Check"></i>
        <br>
        <el-button @click="keyUpd()">更新</el-button>
        <i class="el-icon-success" v-if="isSuccess == 3" name="Check"></i>
        <br>
    </div>
</template>

<style lang="scss" scoped>
.s1 {
    color: #811fe9;
    padding: 20px;
    position: absolute;
    left: 40%;
    text-align: left;
}
</style>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import {
    keyRegist,
    keyDelete,
    keyUpdate,
} from '@/../api/keyManage';

import store from '@/store';

let uuid = ref("");
let isSuccess = ref(0);
const message: any = inject('message')

const keyReg = () => {
    isSuccess.value = 0;
    //1.密钥注册
    keyRegist().then((response: any) => {
        if (response.data['code'] !== 200) {
            throw response
        }
        else {
            store.dispatch('setKey', response.data.msg);
            isSuccess.value = 1;
        }
    }).catch((response: any) => {
        message.error('error: ' + response.data.msg)
    });
};
const keyDel = () => {
    isSuccess.value = 0;
    keyDelete().then((response: any) => {
        if (response.data['code'] !== 200) {
            throw response
        }
        else {
            store.dispatch('setKey', '');
            isSuccess.value = 2;
        }
    }).catch((response: any) => {
        message.error('error: ' + response.data.msg)
    });
};
const keyUpd = () => {
    isSuccess.value = 0;
    keyUpdate(uuid.value).then((response: any) => {
        if (response.data['code'] !== 200) {
            throw response
        }
        else {
            store.dispatch('setKey', response.data.msg);
            isSuccess.value = 3;
        }
    }).catch((response: any) => {
        message.error('error: ' + response.data.msg)
    });
};
</script>

<script lang="ts">
export default {
    name: 'KeyRegist',
};
</script>