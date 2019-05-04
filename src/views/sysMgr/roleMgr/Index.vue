<template>
    <div class="role-mgr">
        <Row>
            <Form ref = "form">
                <Col span="10">
                    <FormItem label="角色" model="form.roleName" class="w-100">
                        <Input v-model="form.roleName" clearable fluid/>
                    </FormItem>
                </Col>
                <Col span="10">
                    <FormItem label="创建时间" model="form.createTime" class="w-100">
                        <Datepicker range v-model="form.createTime" clearable class="w-100"/>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button type="primary" @click="search" class="mx-2">
                        <i class="iconfont icon-search"></i>查询</Button>
                    <Button @click="reset">
                        <i class = "k-icon ion-ios-reload"><i/></i>重置</Button>
                </Col>
            </Form>
        </Row>
        <Row class = "mt-3">
            <Button @click = "add">
                <i class = "k-icon ion-plus"></i>新增</Button>
            <Dropdown trigger="click" class = "px-2">
                <Button>
                    更多操作<Icon class="ion-ios-arrow-down" />
                </Button>
                <DropdownMenu>
                    <DropdownItem @click = "downLoadFile">导出Excel</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Row>
        <Row class="my-3">
            <Table
                    :scheme="table.columns"
                    :data="table.datas"
                    :sort="table.sort"
                    :loading="table.loading"
                    size="small"
                    resizable
                    type="grid"
                    @$change:sort="_onSort"
            />
            <div class="my-3 text-center">
                <Pagination :total="page.total" :current="page.pageNum" :limit="page.pageSize" @change="pageChange"
                            size="small"/>
            </div>
        </Row>
        <Drawer v-model="drawer.show" :title="drawer.title" :closable = "false" hideClose ref="addRole">
            <component :is = "drawer.type" :form = "drawer.form"></component>
            <div slot="footer-wrapper" class = "text-center">
                <Button>取消</Button>
                <Button type = "primary" class = "mx-2 my-3">确定</Button>
            </div>
        </Drawer>

    </div>
</template>

<script>
    import {Row, Col, Form, FormItem, Dropdown,DropdownMenu,DropdownItem,Drawer,
        Input, Button, Datepicker,Table,Pagination,Icon} from 'kpc'
    import {apiList,http,constant} from '@/libs'
    import {downloadFile} from '@/libs/util'
    import Add from './Add'
    export default {
        name: "Index",
        components: {
            Row, Col, Form, FormItem,Dropdown,DropdownMenu,DropdownItem,Drawer,
            Input, Button, Datepicker,Table,Pagination,Icon,
        },
        data() {
            return {
                form: {
                    roleName: '',
                    createTime: '',
                    createTimeFrom: '',
                    createTimeTo: '',
                },
                table: {
                    loading: false,
                    sort: {},
                    columns: {
                        oper: {
                            title: '操作',
                            width: '70',
                            template: row => {
                                let props = {
                                    style: {
                                        cursor: 'pointer'
                                    },
                                    class: "ion-eye",
                                }
                                return <Icon {...props} onClick={() => this.view(row)}></Icon>
                            }
                        },
                        roleName: {
                            title: '角色',
                        },
                        remark: {
                            title: '描述',
                        },
                        createTime: {
                            title: '创建时间',
                            sortable: true
                        },
                        modifyTime: {
                            title: '修改时间',
                            sortable: true
                        },
                    },
                    datas: []
                },
                page: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10
                },
                drawer : {
                    show : false,
                    title : '新增角色',
                    type : Add,
                    form : {}
                },
            }
        },
        watch : {

        },

        methods: {
            _onSort(c, sort) {
                debugger;
                let {key, type} = sort
                let {datas} = this.table
                datas.reverse()
                this.table = {
                    ...this.table,
                    datas,
                    sort
                }
            },
            pageChange({current: pageNum, limit: pageSize}) {
                this.page = {
                    ...this.page,
                    pageNum,
                    pageSize
                }
                this.queryList()
            },
            add(){
                this.drawer = {
                    ...this.drawer,
                    show : true
                }
            },
            reset(){
                this.$refs.form.reset();
            },
            search() {
                this.queryList()
            },
            async queryList() {
                let {createTime,...res} = this.form
                let [createTimeFrom,createTimeTo] = createTime ? createTime : []
                let params = {
                    ...res,
                    ...this.page,
                    createTimeFrom,
                    createTimeTo
                }
                this.table = {
                    ...this.table,
                    loading: true,
                }
                let {code,data:{total,rows:datas}} = await http.get(apiList.sys_mgr_role_mgr_query,params)
                if(code === constant.SUCCESS){
                    this.table = {
                        ...this.table,
                        datas,
                        loading : false
                    }
                    this.page = {
                        ...this.page,
                        total
                    }
                }
            },
            async downLoadFile(){
                let {createTime,...res} = this.form
                let params = {
                    ...res
                }
                let {code,data} = await http.postDownload(apiList.sys_mgr_role_mgr_exprot,{params})
                if(code === constant.SUCCESS){
                    downloadFile(data,'角色信息')
                }
            },
        },
        mounted() {
            this.queryList()
        }
    }
</script>

<style scoped lang="less">
    .role-mgr {

    }
    .k-dialog{
        width: 35%;
    }
</style>
