<template>
    <div class="login h-100">
        <vue-particle-line>
            <Row type="flex" justify="center" align="middle" class="z-1000 h-100">
                <Col span="5">
                    <Collapse v-model="collapse">
                        <CollapseItem title="login" value="loginItem">
                            <Form layout="vertical" ref="form" class = "mt-3">
                                <FormItem model="form.username"
                                          :rules = "formRule.username.rules"
                                          :messages = "formRule.username.messages"
                                          hideLabel>
                                    <Input v-model="form.username" size = "large" clearable placeholder = "帐号">
                                        <template slot="prefix"><i class="ion-person"></i></template>
                                    </Input>
                                </FormItem>
                                <FormItem model="form.password"
                                          :rules = "formRule.password.rules"
                                          :messages = "formRule.password.messages"
                                          hideLabel>
                                    <Input type="password" v-model="form.password" size = "large" clearable placeholder = "密码">
                                        <template slot="prefix"><i class="ion-locked"></i></template>
                                    </Input>
                                </FormItem>
                                <FormItem model="form.way"
                                          :rules = "formRule.way.rules"
                                          :messages = "formRule.way.messages"
                                          hideLabel>
                                    <Select v-model="form.way" clearable fluid placeholder = "登录方式">
                                        <Option value="local">本地登录</Option>
                                        <Option value="uniportal">w3登录</Option>
                                    </Select>
                                </FormItem>
                                <FormItem class="form-item-button mb-4" hideLabel>
                                    <Button type="primary" size = "large" fluid @click = "handleSubmit">登录</Button>
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
    import {Row, Col, Button, Form, FormItem, Input,Select,Option,Collapse, CollapseItem} from 'kpc'
    import vueParticleLine from 'vue-particle-line'
    import 'vue-particle-line/dist/vue-particle-line.css'
    import Vue from 'vue'

    Vue.use(vueParticleLine)
    export default {
        name: "index",
        components: {
            Row, Col, Button, Form, FormItem, Input,Select,Option,Collapse, CollapseItem
        },
        data() {
            const rules = {
                rules : {required: true},
                messages : {required:'必填'}
            }
            return {
                collapse: ['loginItem'],
                form: {
                    username: '',
                    password: '',
                    way : ''
                },
                formRule : {
                    username : {
                        ...rules
                    },
                    password : {
                        ...rules
                    },
                    way : {
                        ...rules
                    }
                }
            }
        },
        methods : {
            async handleSubmit() {
                let valid = this.$refs.form.validate()
                if (valid) {

                } else {

                }
            },
        }
    }
</script>

<style scoped lang="less">
    .login {
        background-color: #283644;
        .z-1000 {
            z-index: 1000;
        }
        .k-collapse{
            background-color: #f8f9fa;
        }
        /deep/ .slot-wraper {
            height: 100%;
        }

    }
</style>
