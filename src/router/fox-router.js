import {constant} from '@/libs'
import router from '@/router'
let {websit:{menu:{props:propsConfig}}} = constant
let routerList = []
let foxRouter = {
    //动态路由
    formatRoutes: (aMenu = [], first) =>{
        console.log(this)
        debugger;
        const aRouter = []
        const propsDefault = {
            label: propsConfig.label || 'label',
            path: propsConfig.path || 'path',
            icon: propsConfig.icon || 'icon',
            children: propsConfig.children || 'children',
            meta: propsConfig.meta || 'meta',
        }
        if (aMenu.length === 0) return;
        for (let i = 0; i < aMenu.length; i++) {
            const oMenu = aMenu[i];
            if (routerList.includes(oMenu[propsDefault.path])) return;
            const path = (() => {
                    if (first) {
                        return oMenu[propsDefault.path].replace('/index', '')
                    } else {
                        return oMenu[propsDefault.path]
                    }
                })(),
                component = oMenu.component,
                name = oMenu[propsDefault.label],
                icon = oMenu[propsDefault.icon],
                children = oMenu[propsDefault.children],
                meta = oMenu[propsDefault.meta];

            const isChild = children.length !== 0;
            const oRouter = {
                path: path,
                component(resolve) {
                    // 判断是否为首路由
                    if (first) {
                        require(['../page/index/Home'], resolve)
                        return
                        // 判断是否为多层路由
                    } else if (isChild && !first) {
                        require(['../page/Layout'], resolve)
                        return
                        // 判断是否为最终的页面视图
                    } else {
                        require([`../${component}.vue`], resolve)
                    }
                },
                name: name,
                icon: icon,
                meta: meta,
                redirect: (() => {
                    if (!isChild && first) return `${path}/index`
                    else return '';
                })(),
                // 处理是否为一级路由
                children: !isChild ? (() => {
                    if (first) {
                        oMenu[propsDefault.path] = `${path}/index`;
                        return [{
                            component(resolve) { require([`../${component}.vue`], resolve) },
                            icon: icon,
                            name: name,
                            meta: meta,
                            path: 'index'
                        }]
                    }
                    return [];
                })() : (() => {
                    return foxRouter.formatRoutes(children, false)
                })()
            }
            aRouter.push(oRouter)
        }
        if (first) {
            if (!routerList.includes(aRouter[0][propsDefault.path])) {
                router.addRoutes(aRouter)
                routerList.push(aRouter[0][propsDefault.path])
            }
        } else {
            return aRouter
        }
        return aRouter
    }
}

export default foxRouter
