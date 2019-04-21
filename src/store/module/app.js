import Vue from 'vue'
import axios from 'axios'
import apiList from "../../libs/common/api";
import constant from "../../libs/common/constant";
export default {
    state: {
        layout: {
            sidebarWidth: {
                width: '12%'
            },
            mainWidth: {
                width: '88%',
                'margin-left': '12%'
            }
        },
        breadcrumbList: [],
        navTagList : []
    },
    getters: {},
    mutations: {
        shrinkMenu(state) {
            let {
                menuProps,
                menuProps: {
                    collapse
                },
                layout
            } = state
            if (collapse) {
                state.layout = {
                    sidebarWidth: {
                        width: '12%'
                    },
                    mainWidth: {
                        width: '88%',
                        'margin-left': '12%'
                    }
                }
            } else {
                state.layout = {
                    sidebarWidth: {
                        width: '64px'
                    },
                    mainWidth: {
                        'margin-left': '64px',
                        width: 'auto',
                    }
                }
            }
            state.menuProps = {
                ...menuProps,
                collapse: !collapse,
            }
        },
        activeMenu(state, {path}) {
            let {
                menuProps,
                menuProps: {
                    collapse
                }
            } = state
            state.menuProps = {
                ...menuProps,
                activeName: path,
            }
        },

        activeBreadcrumb(state, {matched}) {
            let breadcrumbList = []
            matched.filter(item => item.path).forEach(({path, meta}) => {
                if (path !== '/home') {
                    breadcrumbList = [
                        ...breadcrumbList,
                        {path, ...meta}
                    ]
                }
            })
            breadcrumbList.unshift({path: '/home', title: '首頁', icon: 'icon-home'})
            state.breadcrumbList = breadcrumbList
        },
        activeNavTag(state,{path,title}) {
            debugger;
            let defaultTagList = [{path: '/home', title: '首頁', closable : false}]
            let {navTagList} = state
            let addTagList = []

            if(navTagList.length){
                navTagList.forEach(item=>{
                    if(!navTagList.map(item=>item.path).includes(path) && !addTagList.map(item=>item.path).includes(path)){
                        if(navTagList.length >= 5){
                            navTagList.splice(1,1)
                        }
                        addTagList.push({path,title,current:true,closable : true})
                    }else{
                        if(item.path === path){
                            item.current= true;
                        }else{
                            item.current= false;
                        }
                    }
                })

            }else{
                defaultTagList.forEach(item=>{
                    if(item.path !== path){
                        addTagList.push({path,title,current:true,closable : true})
                    }else{
                        item.current= true;
                    }
                })
                navTagList = defaultTagList
            }
            state.navTagList = [...navTagList,...addTagList]
        },
        removeNavTag(state,tagProps){
            debugger;
            let {path,current} = tagProps
            let {navTagList} = state
            let newTagList = navTagList
            navTagList.forEach((item,index)=>{
                if(item.path === path){
                    if(current){
                        newTagList[index-1].current = true;
                        location.href = location.origin + '#' + newTagList[index-1].path
                    }
                    newTagList.splice(index,1)
                }
            })
            state.navTagList = newTagList
        }
    },
    actions: {

    }
}
