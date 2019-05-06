<template>
    <Dialog v-model="comfirmDialog.show" :title="comfirmDialog.title" size="mini">
        <Icon class = "ion-information-circled icon-tip"></Icon>
        <span class = "message">
            {{comfirmDialog.message}}
        </span>
    </Dialog>
</template>

<script>
    import {Dialog,Icon} from 'kpc'
    export default {
        name: "ComfirmDialog",
        components : {
            Dialog,Icon
        },
        props : {
            comfirmDialog : {
                type : Object,
                default : {
                    title : '提示',
                    show : true,
                    message : '确认要删除吗'
                }
            }
        }
    }
</script>

<style scoped>
    .icon-tip{
        font-size: 40px;
        color : #0a5eee;
        padding-right: 1rem;
    }
    .k-body{
        display: flex;
        align-items: center;
    }
    .message{
        font-size : 20px;
    }
</style>
