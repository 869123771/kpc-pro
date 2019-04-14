<template>
    <div class="slide-menu">
        <template v-for="slideMenu in slideMenus">
            <Menu v-if="slideMenu.children.length" :key="slideMenu.path">
                <slide-menu :navMenus="slideMenu.children"></slide-menu>
            </Menu>
            <MenuItem v-else :key="slideMenu.path">
                <Icon :class="slideMenu.icon"></Icon>
                <span class="menu-item-title">{{slideMenu.name}}</span>
            </MenuItem>
        </template>
    </div>
</template>

<script>
    import {Menu, MenuItem,Icon} from 'kpc'
    export default {
        name: "SlideMenu",
        components : {
            Menu, MenuItem,Icon
        },
        props : {
            slideMenus : {
                type : Array
            }
        }
    }
</script>

<style scoped>

</style>
