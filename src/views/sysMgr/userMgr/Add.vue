<template>
    <div class = "add">
        <Row>
            <Form labelWidth="120" ref = "form">
                <FormItem label="用户名" model="form.username">
                    <Input v-model="form.username" />
                </FormItem>
                <FormItem label="密码" model="form.password">
                    <Input type="password" v-model="form.password" />
                </FormItem>
                <FormItem label="邮箱" model="form.email">
                    <Input v-model="form.email" />
                </FormItem>
                <FormItem label="手机" model="form.mobile">
                    <Input v-model="form.mobile" />
                </FormItem>
                <FormItem label="角色" model="form.roleId">
                    <Input v-model="form.roleId" />
                </FormItem>
                <FormItem label="部门" model="form.deptId">
                    <Input v-model="form.deptId" />
                </FormItem>
                <FormItem label="状态" model="form.status">
                    <Radio name="status" trueValue="1" v-model="form.status">锁定</Radio>
                    <Radio name="status" trueValue="0" v-model="form.status">有效</Radio>
                </FormItem>
                <FormItem label="性别" model="form.ssex">
                    <template v-for = "item in sexList">
                        <Radio name="status" :trueValue="item.keyy" v-model="form.ssex">
                            {{item.valuee}}
                        </Radio>
                    </template>
                </FormItem>
            </Form>
        </Row>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import {Row,Col,Form,FormItem,Input,Radio} from 'kpc'
    export default {
        name: "Add",
        components : {
            Row,Col,Form,FormItem,Input,Radio
        },
        props : {
            form : {
                type : Object
            }
        },
        computed : {
            ...mapState({
                sexList : ({common}) => common.sex
            })
        },
        methods : {
            ...mapActions({
                getSex : 'GET_SEX'
            })
        },
        mounted(){
            this.getSex()
        }
    }
</script>

<style scoped lang = "less">

</style>
