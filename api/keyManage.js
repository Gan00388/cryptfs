import Service from './config'

export const keyRegistURL = "/user/key/register"

export const keyRegist = () => {
    return Service.get(keyRegistURL)
}

export const keyDeleteURL = "/user/key/delete"

export const keyDelete = () => {
    return Service.delete(keyDeleteURL)
}

export const keyUpdateURL = "/user/key/update"

export const keyUpdate = (newUuid) => {
    return Service.get(keyUpdateURL, { params: { NewUuid: newUuid } })
}
