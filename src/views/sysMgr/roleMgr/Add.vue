<template>
    <div class = "add">
        <vue-scroll>
            <Row>
                <Form labelWidth="120" ref = "form">
                    <FormItem label="角色名称" model="form.roleName">
                        <Input v-model="form.roleName" />
                    </FormItem>
                    <FormItem label="角色描述" model="form.roleDesc"
                    >
                        <Input type="textarea" v-model="form.roleDesc" />
                    </FormItem>
                    <FormItem label="权限选择" model="form.roleDesc"
                    >
                        <Input type="textarea" v-model="form.roleDesc" />
                    </FormItem>
                </Form>
            </Row>
        </vue-scroll>
    </div>
</template>

<script>
    import {Row,Col,Form,FormItem,Input} from 'kpc'
    export default {
        name: "Add",
        components : {
            Row,Col,Form,FormItem,Input
        },
        props : {
            form : {
                type : Object
            }
        }
    }
</script>

<style scoped>

</style>
