import constant from "../../libs/common/constant";
import axios from "axios";
import apiList from "../../libs/common/api";

console.log(constant)
const {menu} = constant
export default {
    state: {
        menuProps: {
            collapse: false,
            activeName: '',
            openNames: [],
            menu: menu
        },
        breadcrumb : [],
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
        }
    },
    actions: {
        async GET_NAV_MENU({commit},{username,token}){
            let {status,data} = await axios.get(`${apiList.nav_menu}/${username}`,{
                headers: {
                    'Authentication': token,
                },
            })
            if(status === constant.SUCCESS){
                return data
            }

        }
    },
}
