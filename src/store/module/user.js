import {localSave, localRead} from '@/libs/util'

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
            state.expireTime = permissions
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
        }
    },

    actions: {},

}
