import Vue from 'vue'
import Vuex from 'vuex'

//import user from './module/user'
import app from './module/app'
import user from './module/user'
import common from './module/common'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    getters,
    modules: {
        user,
        app,
        common
    }
})
console.log(store)
export default store
