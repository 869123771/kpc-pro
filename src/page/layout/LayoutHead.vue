<template>
    <Header fixed class="header">
        <div class = "icon-con">
            <Icon class="ion-navicon nav-icon" :class = "menuProps.collapse?'rotate':''" size="30" @click = "_toggle"/>
        </div>
    </Header>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Header,Icon} from 'kpc';
    export default {
        name: "LayoutHead",
        components : {
            Header,Icon
        },
        data() {
            return {

            }
        },
        computed : {
            ...mapGetters([
                'menuProps'
            ])
        },
        methods: {
            _toggle() {
                let {collapse} = this.menuProps
                this.$store.commit('SET_COLLAPSE',!collapse)
            },
        },
    }
</script>

<style scoped lang="less">
    .header {
        background: #fff;
        border-bottom: 1px solid #cad0dd;
        .icon-con{
            display: flex;
            align-items: center;
            padding-left: 1rem;
            .nav-icon {
                cursor: pointer;
                display:inline-block;
                transition: all ease 0.3s;
            }
            .rotate{
                transform: rotate(90deg);
                transition: all ease 0.3s;
            }
        }
    }
</style>
