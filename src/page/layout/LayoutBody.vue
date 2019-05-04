<template>
    <Body class = "body">
        <breadcrumb></breadcrumb>
        <router-view></router-view>
    </Body>
</template>

<script>
    import {Body} from 'kpc';
    import Breadcrumb from '@/components/breadcrumb/Index'
    export default {
        name: "LayoutBody",
        components : {
            Body,Breadcrumb
        },
    }
</script>

<style scoped lang="less">
    .body{
        /deep/ .k-breadcrumb{
            padding : 1rem 0;
        }
    }
</style>
