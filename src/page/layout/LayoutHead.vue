<template>
    <Header fixed class="header">
        <collpse></collpse>
        <div class = "avatar-con">
            <avatar></avatar>
        </div>
    </Header>
</template>

<script>
    import {Header,Icon} from 'kpc';
    import Collpse from './head/Collapse'
    import Avatar from './head/Avatar'
    export default {
        name: "LayoutHead",
        components : {
            Header,Icon,Collpse,Avatar
        },
        data() {
            return {

            }
        },
    }
</script>

<style scoped lang="less">
    .header {
        background: #fff;
        border-bottom: 1px solid #cad0dd;
        .avatar-con{
            float: right;
            margin-right: 1rem;
        }
    }
    .header>div{
        display: inline-block;
        height: inherit;
        overflow: hidden;
    }
</style>
