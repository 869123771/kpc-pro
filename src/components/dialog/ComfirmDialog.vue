<template>
    <Dialog v-model="dialog.show" :title="dialog.title" size="mini" :ok = "confirm">
        <Icon class = "ion-information-circled icon-tip"></Icon>
        <span class = "message">
            {{dialog.message}}
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
        watch : {
            comfirmDialog : {
                handler(props){
                    let {title,message} = props
                    this.dialog = {
                        ...props,
                        title : title || '提示',
                        message : message || '确认要删除吗'
                    }
                },
                immediate : true,
            }
        },
        data(){
            return {
                dialog : {}
            }
        },
        props : {
            comfirmDialog : {
                type : Object
            }
        },
        methods : {
            confirm(){
                this.$emit('confirm')
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
