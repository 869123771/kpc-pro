import {localSave, localRead} from '@/libs/util'
import { setToken} from '@/libs/util'
export default {
    state: {
        token: localRead('USER_TOKEN'),
        expireTime: localRead('EXPIRE_TIME'),
        permissions: localRead('PERMISSIONS'),
        roles: localRead('ROLES'),
        user: localRead('USER'),
        theme: localRead('THEME'),
    },
    mutations: {
        SET_TOKEN(state, token) {
            localSave('USER_TOKEN', token)
            state.token = token
        },
        SET_EXPIRETIME(state, expireTime) {
            localSave('EXPIRE_TIME', expireTime)
            state.expireTime = expireTime
        },
        SET_PERMISSIONS(state, permissions) {
            localSave('PERMISSIONS', permissions)
            state.permissions = permissions
        },
        SET_ROLES(state, roles) {
            localSave('ROLES', roles)
            state.roles = roles
        },
        SET_USER(state, user) {
            localSave('USER', user)
            state.user = user
        },
        SET_THEME(state, theme) {
            localSave('THEME', theme)
            state.theme = theme
        },

    },

    actions: {
        LOGIN({commit},data){
            let {token,exipreTime,user,permissions,roles} = data
            setToken(token)
            commit('SET_TOKEN',token)
            commit('SET_EXPIRETIME',exipreTime)
            commit('SET_USER',user)
            commit('SET_PERMISSIONS',permissions)
            commit('SET_ROLES',roles)
        },
        LOGIN_OUT({commit}){
            setToken('')
            localSave('USER_ROUTER', '')
            commit('SET_TOKEN','')
            commit('SET_EXPIRETIME','')
            commit('SET_USER','')
            commit('SET_PERMISSIONS','')
            commit('SET_ROLES','')
        }
    },

}
