import Service from './config'

export const uploadFileURL = "/user/uploadFile"
export function uploadFile(formData) {
    return Service.post(uploadFileURL, formData)
}

export const downloadFileURL = "/user/downloadFile"
export function downloadFile(localFile, storageName) {
    return Service.post(downloadFileURL, { localFile: localFile, storageName: storageName })
}

export const allFileURL = "/user/fileList/"

export function getFileList(page, pageSize) {
    return Service.post(allFileURL, { page: page, pageSize: pageSize })
}