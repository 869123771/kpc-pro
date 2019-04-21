<template>
    <Layout class="layout">
        <Aside :collapse="collapse" fixed size="large">
            <div class="logo">LOGO</div>
            <context-menu></context-menu>
        </Aside>
        <Layout>
            <Header fixed>
                <Button type="none" size="large" style="height: 64px" @click="_toggle">
                    <Icon class="ion-navicon" size="30"/>
                </Button>
            </Header>
            <Body>
            <Breadcrumb>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Detail</BreadcrumbItem>
            </Breadcrumb>
            <router-view></router-view>
            </Body>
        </Layout>
        <router-view></router-view>
    </Layout>
</template>
<script>
    import {Layout, Header, Aside, Body, Footer,Breadcrumb, BreadcrumbItem,Button} from 'kpc';
    import ContextMenu from "../components/menu/ContextMenu";
    export default {
        name : 'layout',
        components: {
            ContextMenu,
            Layout, Header, Aside, Body, Footer,Breadcrumb, BreadcrumbItem, Button
        },
        data() {
            return {
                "collapse": false,
            }
        },
        methods: {
            _toggle() {
                this.collapse = !this.collapse;
            },
        },
    }
</script>
