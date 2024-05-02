import Service from './config'

export const request = (config)=>{
    return Service({
        ...config,
        params: config.data
    })
}


