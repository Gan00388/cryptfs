import { request } from './request'

// 测试能不能跑通
const test = (data) =>{
    return request({
        method: 'get',
        url: 'http://jsonplaceholder.typicode.com/posts',
        data
    })
}

// 登录接口参数
// data={
//     name: String或者phonenum: String,昵称或电话
//     passwd: String,密码
// }
const loginapi = (data) => {
    return request({
        method: 'post',
        url: '/user/login',
        data
    })
}

const loginnn = (data) => {
    return request({
        method: 'post',
        data
    })
}


// 注册接口参数
// data={
//     name: String,昵称
//     phonenum: String,电话
//     passwd: String,密码
// }
const registerapi = (data) => {
    return request({
        method: 'post',
        url: '/user/register',
        data
    })
}

// 登出接口  无参数
const logoutapi = (data) => {
    return request({
        method: 'post',
        url: '/user/logout',
        data
    })
}

// 修改密码，需要token，拦截器会加上
// data={
//     telephone: String,手机号
//     oldPassword: String,旧密码
//     onewPassword: String,新密码
// }
const changePasswordapi = (data) => {
    return request({
        method: 'post',
        url: '/user/changePassword',
        data
    })
}

// 获取用户列表，需要token，拦截器会加上
// data={
//     page: int,页数
//     pageSize: int,每页个数
// }
const listapi = (data) => {
    return request({
        method: 'post',
        url: '/user/list',
        data
    })
}

// 新增用户、管理员，需要token，拦截器会加上
// data={
//     name:String,昵称
//     telephone:String,手机号
//     password:String,密码
//     role:String,用户还是管理员
// }
const adduserapi = (data) => {
    return request({
        method: 'post',
        url: '/admin/add',
        data
    })
}

// 删除用户，需要token，拦截器会加上
// 路径参数id
const deleteuserapi = (data) => {
    return request({
        method: 'delete',
        url: '/admin/:id',
        data
    })
}

// 日志，需要token，拦截器会加上
const logsapi = (data) => {
    return request({
        method: 'get',
        url: '/admin/logs',
        data
    })
}


export default {
    loginapi,
    registerapi,
    logoutapi,
    changePasswordapi,
    listapi,
    adduserapi,
    deleteuserapi,
    logsapi,
    test,
    loginnn
}