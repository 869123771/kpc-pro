import constant from "../../libs/common/constant";
import axios from "axios";
import apiList from "../../libs/common/api";

console.log(constant)
const {website, menu} = constant
export default {
    state: {
        website: website,
        menuProps: {
            collapse: false,
            activeName: '',
            openNames: [],
            menu: menu
        },
    },
    mutations: {
        SET_NAV_MENU(state,menu){
            state.menuProps = {
                ...state.menuProps,
                menu
            }
        },
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
