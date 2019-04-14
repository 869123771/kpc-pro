import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router'
import {store} from '@/store/index'
import {constant} from '@/libs'
import {setToken, getToken, localSave, localRead} from '@/libs/util'

import MenuView from '@/views/common/MenuView'
import PageView from '@/views/common/PageView'
import LoginView from '@/views/login/Login'
import EmptyPageView from '@/views/common/EmptyPageView'
import HomePageView from '@/views/home/Home'
import Layout from '@/views/Layout'

Vue.use(Router)

const router = new Router({
    //mode: 'history',
    routes: routers
})
const {config: {loginName, homeName}} = constant
const whiteList = ['/login']
let asyncRouter = []

router.beforeEach((to, from, next) => {
    debugger;
    const token = getToken()
    let userRouter = localRead('USER_ROUTER')
    if (token) {
        if(to.name === loginName){
            next({name:homeName})
        }else{
            debugger;
            if (!asyncRouter.length) {
                if (!Object.keys(userRouter).length) {
                    let {user: {token, user: {username} = {}} = {}} = store.state
                    store.dispatch('GET_NAV_MENU', {token, username}).then((data) => {
                        asyncRouter = data
                        localSave('USER_ROUTER', asyncRouter)
                        go(to, next)
                    })
                } else {
                    asyncRouter = userRouter
                    go(to, next)
                }
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        }else{
            next({name:loginName})
        }
    }
});

const go = (to, next) => {
    asyncRouter = filterAsyncRouter(asyncRouter)
    router.addRoutes(asyncRouter)
    next({...to, replace: true})
    console.log(asyncRouter)
    store.commit('SET_NAV_MENU',asyncRouter)
}

const filterAsyncRouter = (routes) => {
    return routes.filter((route) => {
        let component = route.component
        if (component) {
            switch (route.component) {
                case 'MenuView':
                    route.component = Layout
                    break
                case 'PageView':
                    route.component = PageView
                    break
                case 'EmptyPageView':
                    route.component = EmptyPageView
                    break
                case 'HomePageView':
                    route.component = HomePageView
                    break
                default:
                    route.component = view(component)
            }
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children)
            }
            return true
        }
    })
}

const view = (path) => {
    return (resolve) => {
        import(`@/views/${path}.vue`).then(mod => {
            resolve(mod)
        })
    }
}

export default router
