import Service from './config'

export const allUserURL = "/user/list"

export function getUsrList(page,pageSize) {
    return Service.post(allUserURL,{page:page,pageSize:pageSize})
}

export const addUserURL = "/admin/add"

export function addUsr(data) {
    return Service.post(addUserURL,data)
}

export function delUsr(num) {
    return Service.delete(`/admin/${num}`)
}

export const getLogURL = "/admin/logs"
export function getLogList() {
    return Service.get(getLogURL)
}

export const getFilesURL = "/admin/files"
export function getFileList(page,pageSize) {
    return Service.post(getFilesURL,{page:page,pageSize:pageSize})
}