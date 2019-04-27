import Layout from '@/page/Layout'
export default [{
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
        path: '/home',
        label: '首页',
        component: () =>
            import ('@/page/index/Home')
    }]
}/*, {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{
        path: 'index',
        name: '个人信息',
        component: () =>
            import ( /!* webpackChunkName: "views" *!/ '@/views/info/index')
    }, {
        path: 'message',
        name: '消息中心',
        component: () =>
            import ( /!* webpackChunkName: "views" *!/ '@/views/info/message')
    }]
}, {
    path: '/advanced-router',
    component: Layout,
    children: [{
        path: 'mutative-detail/:id',
        name: '动态路由详情页',
        component: () =>
            import ( /!* webpackChunkName: "utils" *!/ '@/views/advanced-router/mutative-detail')
    }, {
        path: 'argument-detail',
        name: '参数路由详情页',
        component: () =>
            import ( /!* webpackChunkName: "utils" *!/ '@/views/advanced-router/argument-detail')
    }]
}, */
]
