import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router'
import {store} from '@/store'

console.log(store)

Vue.use(Router)

const router = new Router({
    //mode: 'history',
    routes: routers
})


router.beforeEach((to, from, next) => {
    debugger;
    next();
});


export default router
