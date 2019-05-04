import {localSave, localRead} from '@/libs/util'
export default {
    state: {
        fullScreen : localRead('FULL_SCREEN')
    },
    mutations: {
        SET_FULL_SCREEN(state,fullScreen){
            state.fullScreen = fullScreen
        }
    },
    actions: {

    }
}
