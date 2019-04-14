import Layout from '@/views/Layout'
export const index = [{
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login/Login'], resolve);
    },
},

]

export const layout = [
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首頁',
                    icon: 'icon-home',
                },
                component: () => import('@/views/home/Home'),
            },
        ]
    },

]

export const routers = [
    ...index,//...layout
]
