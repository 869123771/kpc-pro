import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router'
import {store} from '@/store'
import {constant} from '@/libs'
import { setToken, getToken} from '@/libs/util'

Vue.use(Router)

const router = new Router({
    //mode: 'history',
    routes: routers
})
const {config: {loginName,homeName}} = constant
router.beforeEach((to, from, next) => {
    debugger;
    const token = getToken()
    if (!token && to.name !== loginName) {
        // 未登录且要跳转的页面不是登录页
        next({
            name: loginName // 跳转到登录页
        })
    } else if (!token && to.name === loginName) {
        // 未登陆且要跳转的页面是登录页
        next() // 跳转
    } else if (token && to.name === loginName) {
        // 已登录且要跳转的页面是登录页
        next({
            name: homeName // 跳转到homeName页
        })
    } else {
        /*if (store.state.user.hasGetInfo) {
            turnTo(to, store.state.user.access, next)
        } else {
            store.dispatch('getUserInfo').then(user => {
                // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
                turnTo(to, user.access, next)
            }).catch(() => {
                setToken('')
                next({
                    name: 'login'
                })
            })
        }*/
    }
});


export default router
