import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
})

instance.interceptors.request.use(config => {
    // console.log(config)
    return config
})

instance.interceptors.response.use(res => {
    // console.log(res)
    return res
})