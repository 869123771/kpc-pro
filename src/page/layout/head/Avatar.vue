<template>
    <div class="avatar">
        <Dropdown>
            <span class = "avatar-span">
                <img :src = "userInfo.avatarLocation + userInfo.avatar">
                <span class = "px-2">{{userInfo.username}}</span>
                <span><Icon class="ion-ios-arrow-down" /></span>
            </span>
            <DropdownMenu>
                <DropdownItem @click = "handleScreen">
                    <template v-if = "fullScreen">
                        <Icon class = "ion-android-contract pr-2"></Icon>退出全屏
                    </template>
                    <template v-else>
                        <Icon class = "ion-android-expand pr-2"></Icon>全屏
                    </template>
                </DropdownItem>
                <DropdownItem @click = "loginOut">
                    <Icon class = "ion-log-out pr-2"></Icon>退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    import {Icon,Dropdown,DropdownMenu,DropdownItem,Button} from 'kpc'
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    import {constant} from '@/libs'
    import {handleScreen} from '@/libs/util'
    let {config: {avatarLocation,loginName}} = constant
    export default {
        name: "Avatar",
        components : {
            Icon,Dropdown,DropdownMenu,DropdownItem,Button
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'user',
                'fullScreen'
            ]),
            userInfo() {
                let userInfo = {
                    ...this.user,
                    avatarLocation
                }
                return userInfo
            }
        },
        methods : {
            ...mapActions({
                quit : 'LOGIN_OUT'
            }),
            handleScreen(){
                this.$store.commit('SET_FULL_SCREEN',!this.fullScreen)
                handleScreen(!this.fullScreen)
            },
            loginOut(){
                this.quit()
                this.$router.push({name:loginName})
            },
        }
    }
</script>

<style scoped lang="less">
    .avatar{
        img{
            width : 34px;
            border-radius: 20px;
        }
        &-span{
            cursor : pointer;
        }
    }
</style>
