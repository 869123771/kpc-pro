import Cookies from 'js-cookie'
// cookie保存的天数
import constant from './common/constant'

const {config: {cookieExpires}} = constant

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export const localSave = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const localRead = (key) => {
    return JSON.parse(localStorage.getItem(key)) || ''
}

export const downloadFile = (data, filename) => {
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
}

export const handleScreen = (fullScreen) => {
    let main = document.body
    if (fullScreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    } else {
        if (main.requestFullscreen) {
            main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
            main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
            main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
            main.msRequestFullscreen()
        }
    }
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (()=>{
    if (document.addEventListener) {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return (element, event, handler) => {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

