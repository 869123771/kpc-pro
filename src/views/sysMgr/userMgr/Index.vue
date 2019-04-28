<template>
    <div class="user-mgr">
        <Form>
            <Row>
                <div :class="form.fold?'fold':''">
                    <Col span="12">
                        <FormItem label="用户名" model="form.username" class="w-100">
                            <Input v-model="form.userName" clearable fluid/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="部门" model="form.deptId" class="w-100">
                            <Select v-model="form.deptId" clearable fluid>
                                <Option value="15073">人事部</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </div>
                <Col span="12" class="mt-3" v-show="!form.fold">
                    <FormItem label="日期" model="form.date" class="w-100">
                        <Datepicker range v-model="form.date" clearable class="w-100"/>
                    </FormItem>
                </Col>
                <FormItem hideLabel class="tail float-right" :class="form.fold?'':'mt-3'">
                    <Button type="primary" @click = "search">查询</Button>
                    <Button class="mx-2">重置</Button>
                    <Button type="none" @click="fold">
                        <span v-if="form.fold">
                            <span>展开</span>
                            <Icon class="ion-ios-arrow-down arrow"/>
                        </span>
                        <span v-else>
                            <span>收起</span>
                            <Icon class="ion-ios-arrow-up arrow"/>
                        </span>
                    </Button>
                </FormItem>
            </Row>
            <Row class = "my-3">
                <Table :scheme="table.columns" :data="table.datas" resizable type = "grid" size = "small"/>
                <div class = "my-3 text-center">
                    <Pagination :total="page.total" :current="page.pageNum" :limit = "page.pageSize" @change="_onChange" size = "small"/>
                </div>
            </Row>
        </Form>
    </div>
</template>

<script>
    import {Form, FormItem, Select, Option, Input, Datepicker, Button, Row, Col, Icon, Table,Pagination} from 'kpc'
    import {mapState} from 'vuex'
    import axios from 'axios'
    import {apiList} from '@/libs'
    export default {
        name: "Index",
        components: {
            Form, FormItem, Select, Option, Input, Datepicker, Button, Row, Col, Icon, Table,Pagination
        },
        data() {
            return {
                form: {
                    fold: true,
                    userName: '',
                    deptId: '',
                    date: '',
                },
                table: {
                    columns: {
                        userName : {
                            title: '用户名',
                            key: 'username'
                        },
                        sex : {
                            title : '性别',
                            key : 'sex'
                        },
                        email : {
                            title : '邮箱',
                            key : 'email'
                        }
                    },
                    datas: []
                },
                page : {
                    total : 0,
                    pageNum : 1,
                    pageSize : 10
                }
            }
        },
        computed : {
            ...mapState({
                token : ({user})=>user.token
            })
        },
        methods: {
            fold() {
                let {fold} = this.form
                this.form = {
                    ...this.form,
                    fold: !fold
                }
            },
            _onChange(v){
                debugger;
            },
            search(){
                this.queryList()
            },
            queryList(){
                let params = {
                    ...this.form,
                    ...this.page
                }
                axios.get(apiList.sys_mgr_user_mgr_query,{
                    headers: {
                        Authentication : this.token
                    },
                    params
                }).then(({data:{total,rows}})=>{
                    debugger;
                    this.table = {
                        ...this.table,
                        datas : rows
                    }
                    this.page = {
                        ...this.page,
                        total
                    }
                })
            }
        },
        mounted(){
            this.queryList()
        }
    }
</script>

<style scoped lang="less">
    .user-mgr {
        /deep/ button:focus {
            outline: none;
        }
        .fold {
            width: calc(100% - 250px);
            display: inline-block;
        }
        .arrow {
            padding-left: 0.5rem;
            font-size: 20px;
            padding-bottom: -7px;
            display: inline-block;
            margin-bottom: 4px;
        }
    }
</style>
