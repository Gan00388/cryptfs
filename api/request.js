import Service from './config'

export const request = (config)=>{
    return Service({
        ...config,
        params: config.data
    })
}


export function login1(telePhone,passWord) {
    return Service.post('/user/login',{telephone:telePhone,password:passWord})
}