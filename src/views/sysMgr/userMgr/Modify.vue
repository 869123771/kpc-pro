<template>
    <div class="add">
        <Row>
            <Form labelWidth="60" ref="form">
                <FormItem model="form.username"
                          :rules="datas.type?{} : {required: true,username : userNameUnique}"
                          :messages="{required: '必填'}"
                >
                    <template slot="label">
                        <span class="append-star">*</span> 姓名
                    </template>
                    <Input v-model="form.username" fluid :readonly="Boolean(datas.type)"/>
                </FormItem>
                <Tooltip trigger="click" content="新用户默认密码为 1234qwer" class="w-100" v-if="!datas.type">
                    <FormItem label="密码" model="form.password"
                              :rules="{required: true}"
                              :messages="{required: '必填'}"
                    >
                        <Input type="password" v-model="form.password" readonly fluid/>
                    </FormItem>
                </Tooltip>
                <FormItem label="邮箱" model="form.email"
                          :rules="{email: true}"
                          :messages="{required: '必填'}"
                >
                    <Input v-model="form.email" fluid/>
                </FormItem>
                <FormItem label="手机"
                          model="form.mobile"
                          :rules="{
                            letter: true,
                            legalPhone: (value) => {
                            debugger;
                                if(!/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(value)){
                                    return '请输入合法的手机号'
                                }else{
                                    return true
                                }
                            }
                          }"
                >
                    <Input v-model="form.mobile" fluid/>
                </FormItem>
                <FormItem model="form.roleId"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <template slot="label">
                        <span class="append-star">*</span> 角色
                    </template>
                    <Select v-model="form.roleId" clearable multiple filterable fluid>
                        <template v-for="item in select.roleList">
                            <Option :value="item.roleId">{{item.roleName}}</Option>
                        </template>
                    </Select>
                </FormItem>
                <FormItem label="部门" model="form.deptId"
                >
                    <Input v-model="form.deptId" fluid/>
                </FormItem>
                <FormItem label="状态" model="form.status"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <template v-for="item in userStatus">
                        <Radio name="status" :trueValue="item.keyy" v-model="form.status">
                            {{item.valuee}}
                        </Radio>
                    </template>
                </FormItem>
                <FormItem label="性别" model="form.ssex"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <template v-for="item in sexList">
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
    import {mapState, mapActions} from 'vuex'
    import {Row, Col, Form, FormItem, Input, Radio, Tooltip, Select, Option, Message} from 'kpc'
    import {apiList, http, constant} from '@/libs'

    export default {
        name: "Modify",
        components: {
            Row, Col, Form, FormItem, Input, Radio, Tooltip, Select, Option, Message
        },
        props: {
            datas: {
                type: Object
            }
        },
        data() {
            return {
                form: {},
                select: {
                    roleList: []
                }
            }
        },
        watch: {
            datas: {
                async handler(props) {
                    debugger;
                    if (props.type) {             //编辑
                        this.setValue()
                    } else {
                        this.form = {
                            password: '1234qwer'
                        }
                    }
                },
                immediate: true
            }
        },
        computed: {
            ...mapState({
                sexList: ({common}) => common.sex,
                userStatus: ({common}) => common.userStatus
            }),
        },
        methods: {
            ...mapActions({
                getSex: 'GET_SEX',
                getUserStatus: 'GET_USER_STATUS'
            }),
            setValue(){
                let {roleId,username,email,mobile,deptId,status,ssex,userId,} = this.datas
                debugger;
                this.form = {
                    username,email,mobile,deptId,status,ssex,userId,
                    roleId: roleId.split(',').map(item => parseInt(item))
                }
            },
            async userNameUnique(value) {
                debugger;
                let {code, data} = await http.get(apiList.sys_mgr_user_mgr_username_check + '/' + value)
                if (!data) {
                    return Promise.reject('抱歉，该用户名已存在')
                } else {
                    return Promise.resolve(true)
                }
            },
            async save() {
                let valid = await this.$refs.form.validate()
                if (valid) {
                    let {roleId} = this.form
                    let res , message
                    let params = {
                        ...this.form,
                        roleId: roleId.join(',')
                    }
                    if(this.datas.type){      //修改
                        res = await http.put(apiList.sys_mgr_user_mgr_query, {params})
                        message = '修改成功'
                    }else{
                        res = await http.post(apiList.sys_mgr_user_mgr_query, {params})
                        message = '新增成功'
                    }
                    let {code, data} = res
                    if (code === constant.SUCCESS && data !== false) {
                        Message.success(message)
                        this.$emit('closeFlush')
                    }
                }
            },
            async getRoleList() {
                let params = {}
                let {code, data: {total, rows: roleList}} = await http.get(apiList.sys_mgr_role_mgr_query, params, params)
                if (code === constant.SUCCESS) {
                    this.select = {
                        ...this.select,
                        roleList
                    }
                    if(this.datas.type){
                        this.setValue()
                    }
                }
            }
        },
        created() {
            debugger;
            this.getSex()
            this.getUserStatus()
            this.getRoleList()
        }
    }
</script>

<style scoped lang="less">
    .add {
        .append-star {
            color: #db2828
        }

    }
</style>
