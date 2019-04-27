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
    id: '1',
    label: "系统管理",
    path: '/sys_mgr',
    icon: 'sysMgr',
    name: 'sysMgr',
    meta: {},
    children: [
        {
            id: '1-1',
            label: "用户管理",
            path: '/user_mgr',
            component: 'views/sysMgr/userMgr/Index',
            icon: 'userMgr',
            name: 'userMgr',
            meta: {},
            children: []
        },
        {
            id: '1-2',
            label: "角色管理",
            path: '/role_mgr',
            component: 'views/sysMgr/roleMgr/Index',
            icon: 'roleMgr',
            name: 'roleMgr',
            meta: {},
            children: []
        },
        {
            id: '1-3',
            label: "菜单管理",
            path: '/menu_mgr',
            component: 'views/sysMgr/menuMgr/Index',
            icon: 'menuMgr',
            name: 'menuMgr',
            meta: {},
            children: []
        },
        {
            id: '1-4',
            label: "部门管理",
            path: '/dept_mgr',
            component: 'views/sysMgr/deptMgr/Index',
            icon: 'deptMgr',
            name: 'deptMgr',
            meta: {},
            children: []
        },
        {
            id: '1-5',
            label: "字典管理",
            path: '/dict_mgr',
            component: 'views/sysMgr/dictMgr/Index',
            icon: 'dictMgr',
            name: 'dictMgr',
            meta: {},
            children: []
        }
    ],
},
    {
        id: '2',
        label: "系统监控",
        path: '/sys_monitor',
        icon: 'sysMonitor',
        name: 'sysMonitor',
        meta: {},
        children: [
            {
                id: '2-1',
                label: "在线用户",
                path: '/online',
                component: 'views/sysMonitor/online/Index',
                icon: 'online',
                name: 'online',
                meta: {},
                children: []
            },
            {
                id: '2-2',
                label: "系统日志",
                path: '/sys_log',
                component: 'views/sysMonitor/sysLog/Index',
                icon: 'sysLog',
                name: 'sysLog',
                meta: {},
                children: []
            },
            {
                id: '2-3',
                label: "Redis监控",
                path: '/redis_monitor',
                component: 'views/sysMonitor/redisMonitor/Index',
                icon: 'redisMonitor',
                name: 'redisMonitor',
                meta: {},
                children: []
            },
            {
                id: '2-4',
                label: "请求追踪",
                path: '/http_trace',
                component: 'views/sysMonitor/httpTrace/Index',
                icon: 'httpTrace',
                name: 'httpTrace',
                meta: {},
                children: []
            },
            {
                id: '2-5',
                label: "系统信息",
                path: '/sys_info',
                component: 'views/sysMonitor/sysInfo/Index',
                icon: 'sysInfo',
                name: 'sysInfo',
                meta: {},
                children: []
            },
        ]
    },
    {
        id: '3',
        label: "任务调度",
        path: '/task_schedule',
        icon: 'taskSchedule',
        name: 'taskSchedule',
        meta: {},
        children: [
            {
                id: '3-1',
                label: "定时任务",
                path: '/timed_task',
                component: 'views/sysMonitor/timedTask/Index',
                icon: 'timedTask',
                name: 'timedTask',
                meta: {},
                children: []
            },
            {
                id: '3-2',
                label: "调度日志",
                path: '/schedule_log',
                component: 'views/sysMonitor/scheduleLog/Index',
                icon: 'scheduleLog',
                name: 'scheduleLog',
                meta: {},
                children: []
            },
        ]
    },
    {
        id: '4',
        label: "网络资源",
        path: '/web',
        icon: 'web',
        meta: {},
        children: [{
            id: '4-1',
            label: "天气查询",
            path: '/weather',
            component: 'views/webResource/Index',
            icon: 'weather',
            name: 'weather',
            meta: {
                keepAlive: true
            },
            children: []
        }, {
            id: '4-2',
            label: "每日一文",
            path: '/daily_article',
            component: 'views/dailyArticle/Index',
            icon: 'dailyArticle',
            name: 'dailyArticle',
            meta: {
                keepAlive: true
            },
            children: [],
        },
            {
                id: '4-3',
                label: "影视资讯",
                path: '/movie',
                component: 'views/movie/Index',
                icon: 'movie',
                meta: {
                    keepAlive: true
                },
                children: [
                    {
                        id: '4-3-1',
                        label: "正在热映",
                        path: '/movie_hot',
                        component: 'views/movieHot/Index',
                        icon: 'movieHot',
                        name : 'movieHot',
                        meta: {
                            keepAlive: true
                        },
                        children: [],
                    },
                    {
                        id: '4-3-2',
                        label: "即将上映",
                        path: '/movie_coming',
                        component: 'views/movieComing/Index',
                        icon: 'movieComing',
                        name: 'movieComing',
                        meta: {
                            keepAlive: true
                        },
                        children: [],
                    }
                ],
            }
        ]
    },
    {
        id: '5',
        label: "其他模块",
        path: '/other',
        icon: 'other',
        meta: {},
        children: [{
            id: '5-1',
            label: "导入导出",
            path: '/excel',
            component: 'views/excel/Index',
            icon: 'excel',
            name: 'excel',
            meta: {
                keepAlive: true
            },
            children: []
        }]
    },
]



