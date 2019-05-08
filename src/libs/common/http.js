'use strict'
import axios from 'axios'
import qs from 'qs'
import {Message} from 'kpc';
import { constant } from "../index";
import store from '@/store/'
const ajax = axios.create({
    //baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
    timeout: 10000,
})
ajax.interceptors.request.use(config => {
    // loading
    let {user:{token}={}} = store.state
    config.headers = {
        ...config.headers,
        Authentication : token || ''
    }
    return config
}, error => {
    return Promise.reject(error)
})

ajax.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

 const checkStatus = (response) => {
    let { status: httpStatus, data: { message ,code ,data} } = response
    let httpStatusList = [200, 304, 400]
    let httpMsg
    switch (httpStatus) {
        case 400:
            httpMsg = '错误请求'
            break;
        case 401:
            httpMsg = '未授权，请重新登录'
            break;
        case 403:
            httpMsg = '拒绝访问'
            break;
        case 404:
            httpMsg = '请求错误,未找到该资源'
            break;
        case 405:
            httpMsg = '请求方法未允许'
            break;
        case 408:
            httpMsg = '请求超时'
            break;
        case 500:
            httpMsg = message || '服务器端出错'
            break;
        case 501:
            httpMsg = '网络未实现'
            break;
        case 502:
            httpMsg = '网络错误'
            break;
        case 503:
            httpMsg = '服务不可用'
            break;
        case 504:
            httpMsg = '网络超时'
            break;
        case 505:
            httpMsg = 'http版本不支持该请求'
            break;
        default:
            httpMsg = `连接错误${httpStatus}`
    }

    if (response && httpStatusList.includes(httpStatus)) {
        return { code : code || httpStatus, message, data }
    }
    // 异常状态下，把错误信息返回去
    return {
        code: httpStatus,
        message: httpMsg
    }
}

 const checkCode = (res)=>{
    let { code, message, data } = res
    if (res && (code !== constant.SUCCESS)) {
        Message.error(message)
    }
    return { code, message, data }
}

export default {
    post(url, data = {},responseType) {
        let handleType = this.handleType(data)
        let method = 'post'
        if(responseType){
            return this.download(url,handleType,method)
        }else{
            return this.ordinary(url,handleType,method)
        }
    },
    put(url,data = {}){
        let handleType = this.handleType(data)
        let method = 'put'
        return this.ordinary(url,handleType,method)
    },
    delete(url,data = {}){
        let handleType = this.handleType(data)
        let method = 'delete'
        return this.ordinary(url,handleType,method)
    },
    handleType(data){
        let handleType
        let {params} = {} = data
        if(params && typeof params === 'object'){
            handleType = {
                 data : qs.stringify(params),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }else{
            handleType = {
                data,
                'Content-Type': 'application/json'
            }
        }
        return handleType
    },
    ordinary(url,handleType,method){
        return ajax({
            method,
            url,
            ...handleType,
            transformResponse: [(data)=>{
                let res
                try{
                    res = JSON.parse(data)
                }catch(e){
                    res = {data}
                }
                return res
            }],
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    download(url, handleType,method){
        return ajax({
            method,
            url,
            ...handleType,
            responseType : 'blob'
        }).then(res=>{
            debugger;
            let {status,data} = res
            return {code :status, data}
        })
    },
    get(url, params) {
        return ajax({
            method: 'get',
            url,
            params, // get 请求时带的参数
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            transformResponse: [(data)=>{
                return {
                    data : JSON.parse(data),
                };
            }],
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}
