<template>
    <Breadcrumb>
        <template v-for = "{meta:{label}} in breadcrumb">
            <BreadcrumbItem>{{label}}</BreadcrumbItem>
        </template>
    </Breadcrumb>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Breadcrumb, BreadcrumbItem} from 'kpc';
    export default {
        name: "Index",
        components : {
            Breadcrumb, BreadcrumbItem
        },
        computed : {
            ...mapGetters(['breadcrumb'])
        }
    }
</script>

<style scoped>

</style>
