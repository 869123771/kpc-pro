<template>
    <Layout class="layout">
        <layout-aside></layout-aside>
        <Layout>
            <layout-head></layout-head>
            <layout-body></layout-body>
        </Layout>
    </Layout>
</template>
<script>
    import {Layout} from 'kpc';
    import LayoutAside from './layout/LayoutAside'
    import LayoutHead from './layout/LayoutHead'
    import LayoutBody from './layout/LayoutBody'
    export default {
        name : 'layout',
        components: {
            Layout,
            LayoutAside,LayoutHead,LayoutBody
        },
        data() {
            return {

            }
        }
    }
</script>
