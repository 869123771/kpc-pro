/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import PageRouter from './page/'
import ViewsRouter from './views/'
import FoxRouter from './fox-router';
import Store from '@/store/'
import {constant} from '@/libs'
import {setToken, getToken, localSave, localRead} from '@/libs/tools'

Vue.use(VueRouter)

const router = new VueRouter({
    //mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    },
    routes : [...PageRouter, ...ViewsRouter]
})
let {menu,config: {loginName, homeName}} = constant
let whiteList = ['/login']
let asyncRouter

router.beforeEach((to, from, next) => {
    const {meta = {},matched = []} = to;
    const {user:{roles}} = Store.state
    let userRouter = localRead('USER_ROUTER')
    if (getToken()) {
        if(matched.length){
            Store.commit('SET_BREADCRUMB',matched)
            Store.commit('SET_MENU_PROPS',matched)
        }
        if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
            next({ path: '/' })
        } else {
            if (!asyncRouter) {
                if (!userRouter) {
                    debugger;
                    let {user: {token, user: {username} = {}} = {}} = Store.state
                    Store.dispatch('GET_NAV_MENU', {token, username}).then((data) => {
                        localSave('USER_ROUTER', menu)
                        asyncRouter = menu
                        go(to, next)
                    }).catch(()=>{
                        /*store.dispatch('FedLogOut').then(() => {
                            next({ path: '/login' })
                        })*/
                    })
                }else {
                    asyncRouter = userRouter
                    go(to, next)
                }
            }else{
                next()
            }
            /*if(roles.length){   //如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
                let dynamicRouter = FoxRouter.formatRoutes(menu,true)
                router.addRoutes(dynamicRouter)
                next({...to, replace: true })

            }*/

        }
    } else {
        //判断是否需要认证，没有登录访问去登录页
        if (meta.isAuth === false) {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach((to,from) => {

});

const go =  (to, next) => {
    let dynamicRouter = FoxRouter.formatRoutes(menu,true)
    debugger;
    router.addRoutes(dynamicRouter)
    Store.commit('SET_NAV_MENU',menu)
    next({...to, replace: true })
}

export default router
