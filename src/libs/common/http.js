'use strict'
import axios from 'axios'
import qs from 'qs'
import sweetAlert from './sweetAlert'
import { constant } from "../index";

const ajax = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
    timeout: 1000,
})
ajax.interceptors.request.use(config => {
    // loading
    config.headers = {
        ...config.headers
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

function checkStatus(response) {
    let { status: httpStatus, data: { msg,code,data} } = response
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
            httpMsg = '服务器端出错'
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
        return { code, msg, data }
    }
    // 异常状态下，把错误信息返回去
    return {
        code: httpStatus,
        msg: httpMsg
    }
}

function checkCode(res) {
    let { code, msg, data } = res
    if (res && (code !== constant.SUCCESS)) {
        sweetAlert.error(msg)
    }
    return { code, msg, data }
}

export default {
    post(url, data) {
        debugger;
        console.log(qs);
        return ajax({
            method: 'post',
            url,
            data : qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
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
    get(url, params) {
        return ajax({
            method: 'get',
            url,
            params, // get 请求时带的参数
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
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
