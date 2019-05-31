<template>
    <div class="login h-full">
        <vue-particle-line>
            <Row type="flex" justify="center" align="middle" class="z-999 h-full px-3">
                <Col sm="12" xs="24" lg="6">
                    <Collapse v-model="collapse">
                        <CollapseItem title="login" value="loginItem">
                            <Form layout="vertical" ref="form" class="mt-3">
                                <FormItem model="form.username"
                                          :rules="formRule.username.rules"
                                          :messages="formRule.username.messages"
                                          hideLabel>
                                    <Input v-model="form.username" fluid size="large" clearable placeholder="帐号">
                                    <template slot="prefix"><i class="ion-person"></i></template>
                                    </Input>
                                </FormItem>
                                <FormItem model="form.password"
                                          :rules="formRule.password.rules"
                                          :messages="formRule.password.messages"
                                          hideLabel>
                                    <Input type="password" v-model="form.password" fluid size="large" clearable
                                           placeholder="密码">
                                    <template slot="prefix"><i class="ion-locked"></i></template>
                                    </Input>
                                </FormItem>
                                <FormItem model="form.way"
                                          :rules="formRule.way.rules"
                                          :messages="formRule.way.messages"
                                          hideLabel>
                                    <Select v-model="form.way" clearable fluid size="large" clearable placeholder="登录方式">
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
                    username: 'mrbird',
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
                    this.$store.dispatch('LOGIN',data)
                    this.$router.push({name:homeName})
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        background-color: #283644;
        .z-999 {
            z-index: 999;
        }
        .k-collapse {
            background-color: #f8f9fa;
        }
        /deep/ .slot-wraper {
            height: 100%;
        }

    }
</style>
