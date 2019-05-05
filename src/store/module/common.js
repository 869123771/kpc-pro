import axios from "axios";
import {apiList,http,constant} from "@/libs";
export default {
    state: {
        menuProps: {
            collapse: false,
            activeName: '',
            openNames: [],
            menu: []
        },
        breadcrumb : [],
        sex : [],
        userStatus : [],
    },
    mutations: {
        SET_NAV_MENU(state,menu){
            state.menuProps = {
                ...state.menuProps,
                menu
            }
        },
        SET_COLLAPSE(state,collapse){
            state.menuProps = {
                ...state.menuProps,
                collapse
            }
        },
        SET_BREADCRUMB(state,breadcrumb){
            state.breadcrumb = breadcrumb
        },
        SET_MENU_PROPS(state,metched){
            debugger
            let openNames = []
            let activeName
            metched.forEach((match,index)=>{
                let {meta:{id}} = match
                if(index !== metched.length - 1){
                    openNames = [
                        ...openNames,
                        id
                    ]
                }else{
                    activeName = id
                }
            })
            state.menuProps = {
                ...state.menuProps,
                openNames,
                activeName
            }
        },
        SET_SEX(state,sex){
            state.sex = sex
        },
        SET_USER_STATUS(state,userStatus){
            state.userStatus = userStatus
        }
    },
    actions: {
        async GET_NAV_MENU({commit},{username,token}){
            debugger;
            let {status,data} = await axios.get(`${apiList.nav_menu}/${username}`,{
                headers: {
                    'Authentication': token,
                },
            })
            if(status === constant.SUCCESS){
                commit('SET_NAV_MENU',constant.menu)
                return data
            }
        },
        async GET_SEX({commit}){
            let {code,data:{rows}} = await http.get(apiList.common_dict,{fieldName: 'ssex'})
            if(code === constant.SUCCESS){
                commit('SET_SEX',rows)
            }
        },
        async GET_USER_STATUS({commit}){
            let params = {
                fieldName : 'status',
                tableName : 't_user'
            }
            let {code,data:{rows}} = await http.get(apiList.common_dict,params)
            if(code === constant.SUCCESS){
                commit('SET_USER_STATUS',rows)
            }
        }
    },
}
