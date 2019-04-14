<template>
    <Menu
            :expandedKeys.sync="expandedKeys"
            :selectedKey.sync="selectedKey"
    >
        <slide-menu :slide-menus="menuProps.navMenus"></slide-menu>
    </Menu>
</template>

<script>
    import {mapState} from 'vuex'
    import {Menu, MenuItem,Icon} from 'kpc'
    import SlideMenu from "./SlideMenu";
    export default {
        name: "ContextMenu",
        components : {
            SlideMenu,
            Menu, MenuItem,Icon
        },
        data(){
            return {
                "expandedKeys": [],
                "selectedKey": "3-1",
            }
        },
        computed : {
            ...mapState({
                menuProps : ({app})=>app.menuProps
            })
        }
    }
</script>

<style scoped>

</style>
