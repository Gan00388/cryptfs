import axios from "axios"

const Service = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    time: 10000
})

Service.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem('token') === null ? null : window.sessionStorage.getItem('token')
    return config
})

Service.interceptors.response.use((respose) => {
    const res = respose.data
    return res
})

export default Service