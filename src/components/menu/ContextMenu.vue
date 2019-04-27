<template>
    <vue-scroll>
        <Menu
                :expandedKeys.sync="menuProps.openNames"
                :selectedKey.sync="menuProps.activeName"
                :collapse="menuProps.collapse"
        >
            <slide-menu :slide-menus="menu"></slide-menu>
        </Menu>
    </vue-scroll>
</template>

<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'
    import {Menu, MenuItem,Icon} from 'kpc'

    Vue.component('SlideMenu',{
        functional : true,
        render(h,{props}){
            const loop = (slideMenus) => {
                if (!slideMenus.length) return
                return slideMenus.map(({id,path,icon,label,children}) => {
                    return <MenuItem key = {id} to = {path}>
                        <i class = {'iconfont pr-2 icon-' + icon}></i>
                        {label}
                        {
                            children && children.length ?
                                <Menu key = {id}>
                                    {loop(children)}
                                </Menu> : undefined
                        }
                    </MenuItem>
                })
            }
            return loop(props.slideMenus)
        }
    })

    export default {
        name: "ContextMenu",
        components : {
            Menu, MenuItem,Icon
        },
        data(){
            return {
                expandedKeys: [],
                selectedKey : "2-1",
            }
        },
        computed : {
            ...mapState({
                menuProps : ({common})=>common.menuProps
            }),
            menu(){
                return this.menuProps.menu
            }
        }
    }
</script>

<style scoped>

</style>
