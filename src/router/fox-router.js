import Layout from '@/page/Layout'
import {constant} from '@/libs'
import router from '@/router'
let routerList = []
let foxRouter = {
    //动态路由
    formatRoutes: (menus = [],first) =>{
        const Routers = []
        if (!menus.length) return;
        menus.forEach(menu=>{
            let {id,path,name,icon,children,meta,component,label} = menu
            const isChild = children.length !== 0;
            const Router = {
                path: path,
                component(resolve) {
                    // 判断是否为首路由
                    if (first) {
                        require(['@/page/Layout'], resolve)
                        return
                        // 判断是否为多层路由
                    } else if (isChild && !first) {
                        require(['@/page/RouterView'], resolve)
                        return
                        // 判断是否为最终的页面视图
                    } else {
                        require([`../${component}.vue`], resolve)
                    }
                    if(isChild){
                        return require([`@/${component}`], resolve)
                    }else{
                        return Layout
                    }
                },
                name: name,
                icon: icon,
                meta: {
                    ...meta,
                    id,path,name,icon,label
                },
                redirect: (() => {

                })(),
                // 处理是否为一级路由
                children: !isChild ? (() => {
                    if (first) {
                        path = `${path}/index`;
                        return [{
                            component(resolve) { require([`../${component}.vue`], resolve) },
                            icon,
                            name,
                            meta: {
                                ...meta,
                                id,path,name,icon,label
                            },
                            path
                        }]
                    }
                    return [];
                })() : (() => {
                    return foxRouter.formatRoutes(children)
                })()
            }
            Routers.push(Router)
        })

        if (first) {
            if (!routerList.includes(Routers[0]['path'])) {
                router.addRoutes(Routers)
                routerList.push(Routers[0]['path'])
            }
        } else {
            return Routers
        }
        return Routers
    }
}

export default foxRouter
