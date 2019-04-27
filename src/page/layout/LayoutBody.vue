<template>
    <Body>
        <Breadcrumb>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Detail</BreadcrumbItem>
        </Breadcrumb>
        <router-view></router-view>
    </Body>
</template>

<script>
    import {Body,Breadcrumb, BreadcrumbItem,Button,Icon} from 'kpc';
    export default {
        name: "LayoutBody",
        components : {
            Body,Breadcrumb, BreadcrumbItem,Button,Icon
        }
    }
</script>

<style scoped>

</style>
