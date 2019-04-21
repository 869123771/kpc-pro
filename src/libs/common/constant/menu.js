/**
 *
 * 动态模拟菜单
 *
 * label菜单的名字
 * path菜单的路径
 * icon菜单的图标（系统采用的阿里巴巴图表库）
 * compnent组件的地址
 * children子类菜单数组
 * group配置其他路由激活菜单高亮
 */
export default [{
    id: 1,
    label: "系统管理",
    path: '/sys_mgr',
    icon: 'icon-canshu',
    meta: {},
    children: [
        {
            id: 1 - 1,
            label: "用户管理",
            path: '/user_mgr',
            component: 'views/sysMgr/userMgr/Index',
            icon: 'icon-canshu',
            meta: {},
            children: []
        },
        {
            id: 1 - 2,
            label: "角色管理",
            path: '/role_mgr',
            component: 'views/sysMgr/roleMgr/Index',
            icon: 'icon-canshu',
            meta: {},
            children: []
        },
        {
            id: 1 - 3,
            label: "菜单管理",
            path: '/menu_mgr',
            component: 'views/sysMgr/menuMgr/Index',
            icon: 'icon-canshu',
            meta: {},
            children: []
        },
        {
            id: 1 - 4,
            label: "部门管理",
            path: '/dept_mgr',
            component: 'views/sysMgr/deptMgr/Index',
            icon: 'icon-canshu',
            meta: {},
            children: []
        },
        {
            id: 1 - 5,
            label: "字典管理",
            path: '/dict_mgr',
            component: 'views/sysMgr/dictMgr/Index',
            icon: 'icon-canshu',
            meta: {},
            children: []
        }
    ],
},
    {
        id: 2,
        label: "网络资源",
        path: '/web',
        icon: 'icon-biaodan',
        meta: {},
        children: [{
            id: 2 - 1,
            label: "天气查询",
            path: '/weather',
            component: 'views/webResource/Index',
            icon: 'icon-biaodan',
            meta: {
                keepAlive: true
            },
            children: []
        }, {
            id: 2 - 2,
            label: "每日一文",
            path: '/daily_article',
            component: 'views/dailyArticle/Index',
            icon: 'icon-biaodan',
            meta: {
                keepAlive: true
            },
            children: [],
        },
            {
                id: 2 - 3,
                label: "影视资讯",
                path: '/movie',
                component: 'views/movie/Index',
                icon: 'icon-biaodan',
                meta: {
                    keepAlive: true
                },
                children: [],
            }
        ]
    }
]



