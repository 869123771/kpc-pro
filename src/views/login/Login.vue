<template>
    <div class="login h-100">
        <vue-particle-line>
            <Row type="flex" justify="center" align="middle" class="z-1000 h-100 px-3">
                <Col sm="12" xs="24" lg="6">
                    <Collapse v-model="collapse">
                        <CollapseItem title="login" value="loginItem">
                            <Form layout="vertical" ref="form" class="mt-3">
                                <FormItem model="form.username"
                                          :rules="formRule.username.rules"
                                          :messages="formRule.username.messages"
                                          hideLabel>
                                    <Input v-model="form.username" size="large" clearable placeholder="帐号">
                                    <template slot="prefix"><i class="ion-person"></i></template>
                                    </Input>
                                </FormItem>
                                <FormItem model="form.password"
                                          :rules="formRule.password.rules"
                                          :messages="formRule.password.messages"
                                          hideLabel>
                                    <Input type="password" v-model="form.password" size="large" clearable
                                           placeholder="密码">
                                    <template slot="prefix"><i class="ion-locked"></i></template>
                                    </Input>
                                </FormItem>
                                <FormItem model="form.way"
                                          :rules="formRule.way.rules"
                                          :messages="formRule.way.messages"
                                          hideLabel>
                                    <Select v-model="form.way" clearable fluid placeholder="登录方式">
                                        <Option value="local">本地登录</Option>
                                        <Option value="uniportal">w3登录</Option>
                                    </Select>
                                </FormItem>
                                <FormItem class="form-item-button mb-4" hideLabel>
                                    <Button type="primary" size="large" fluid @click="handleSubmit">登录</Button>
                                </FormItem>
                            </Form>
                        </CollapseItem>
                    </Collapse>
                </Col>
            </Row>
        </vue-particle-line>
    </div>
</template>

<script>
    import {Row, Col, Button, Form, FormItem, Input, Select, Option, Collapse, CollapseItem} from 'kpc'
    import vueParticleLine from 'vue-particle-line'
    import 'vue-particle-line/dist/vue-particle-line.css'
    import Vue from 'vue'
    import {mapMutations} from 'vuex'
    import {http, apiList, constant} from '@/libs'
    import { setToken} from '@/libs/util'
    const {config: {homeName}} = constant

    Vue.use(vueParticleLine)
    export default {
        name: "Login",
        components: {
            Row, Col, Button, Form, FormItem, Input, Select, Option, Collapse, CollapseItem
        },
        data() {
            const rules = {
                rules: {required: true},
                messages: {required: '必填'}
            }
            return {
                collapse: ['loginItem'],
                form: {
                    username: 'scott',
                    password: '1234qwer',
                    way: ''
                },
                formRule: {
                    username: {
                        ...rules
                    },
                    password: {
                        ...rules
                    },
                    way: {
                        ...rules
                    }
                }
            }
        },
        methods: {
            ...mapMutations({
                setToken: 'SET_TOKEN',
                setExpireTime: 'SET_EXPIRETIME',
                setPermissions: 'SET_PERMISSIONS',
                setRoles: 'SET_ROLES',
                setUser: 'SET_USER',
            }),
            async handleSubmit() {
                let valid = await this.$refs.form.validate()
                if (valid) {
                    this.login()
                }
            },
            async login() {
                let params = {
                    ...this.form
                }
                let {code,data} = await http.post(apiList.login, {params})
                if(code === constant.SUCCESS){
                    let {token,exipreTime,user,permissions,roles} = data
                    setToken(token)
                    this.setToken(token)
                    this.setExpireTime(exipreTime)
                    this.setUser(user)
                    this.setPermissions(permissions)
                    this.setRoles(roles)
                    this.$router.push({name:homeName})
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        background-color: #283644;
        .z-1000 {
            z-index: 1000;
        }
        .k-collapse {
            background-color: #f8f9fa;
        }
        /deep/ .slot-wraper {
            height: 100%;
        }

    }
</style>
