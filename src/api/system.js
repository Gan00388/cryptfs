import Service from "@/api/config.js"

export const allUserURL = "/usr/list/"

export function getUsrList(page, pageSize) {
    return Service.get(allUserURL, { params: { page: page, pageSize: pageSize } })
}

export const addUserURL = "/admin/add/"

export function addUsr(data) {
    return Service.post(addUserURL, data)
}

// export const delUserURL = "/admin/:id/"
export function delUsr(num) {
    return Service.delete(`/admin/${num}`)
}

export const getLogURL = "/admin/logs/"
export function getLogList() {
    return Service.get(getLogURL)
}

// 文件传输列表待完成