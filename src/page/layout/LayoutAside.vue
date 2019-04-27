<template>
    <Aside class = "aside" :collapse="menuProps.collapse" fixed>
        <div class="logo">LOGO</div>
        <context-menu></context-menu>
    </Aside>
</template>


<script>
    import {mapGetters} from 'vuex'
    import {Aside} from 'kpc';
    import ContextMenu from "@/components/menu/ContextMenu";
    export default {
        name: "LayoutAside",
        components: {
            ContextMenu,
            Aside
        },
        computed : {
            ...mapGetters([
                'menuProps'
            ])
        },
    }
</script>

<style scoped lang = "less">
    .aside{
        .logo{
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background: gray;
            margin: 17px 20px;
            -webkit-transition: all .25s ease-in-out;
            transition: all .25s ease-in-out;
        }
    }
</style>
