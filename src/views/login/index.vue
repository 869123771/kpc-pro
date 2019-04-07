<template>
    <div class="login h-100">
        <vue-particle-line>
            <Row type="flex" justify="center" align="middle" class="z-1000 h-100">
                <Col span="5">
                    <Collapse v-model="collapse">
                        <CollapseItem title="login" value="loginItem">
                            <Form @submit="submit" ref="form" labelWidth = "0">
                                <FormItem model="form.username" :rules="{required: true}">
                                    <Input v-model="form.username" clearable/>
                                </FormItem>
                                <FormItem model="model.password" :rules="{required: true}">
                                    <Input type="password" v-model="form.password" clearable/>
                                </FormItem>
                                <FormItem class="form-item-button mb-4">
                                    <Button type="primary" fluid>登录</Button>
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
    import {Row, Col, Button, Form, FormItem, Input, Collapse, CollapseItem} from 'kpc'
    import vueParticleLine from 'vue-particle-line'
    import 'vue-particle-line/dist/vue-particle-line.css'
    import Vue from 'vue'

    Vue.use(vueParticleLine)
    export default {
        name: "index",
        components: {
            Row, Col, Button, Form, FormItem, Input, Collapse, CollapseItem
        },
        data() {
            return {
                collapse: ['loginItem'],
                form: {
                    username: '',
                    password: ''
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
        .form-item-button .k-content {
            width: 100%;
        }
        .k-collapse{
            background-color: #f8f9fa;
        }
        /deep/ .slot-wraper {
            height: 100%;
        }
        /deep/ .k-collapse-item > .k-content > .k-wrapper {
            padding: 0px;
        }
    }
</style>
