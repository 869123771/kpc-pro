<template>
    <div class="user-mgr">
        <Row>
            <Form ref="form">
                <div :class="form.fold?'fold':''">
                    <Col span="12">
                        <FormItem label="用户名" model="form.username" class="w-100">
                            <Input v-model="form.username" clearable fluid/>
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
                    <FormItem label="创建时间" model="form.createTime" class="w-100">
                        <Datepicker range v-model="form.createTime" clearable class="w-100"/>
                    </FormItem>
                </Col>
                <FormItem hideLabel class="tail float-right" :class="form.fold?'':'mt-3'">
                    <Button type="primary" @click="search" class="mr-2">
                        <i class="iconfont icon-search"></i>查询
                    </Button>
                    <Button @click="reset">
                        <i class="k-icon ion-ios-reload"><i/></i>重置
                    </Button>
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
            </Form>
        </Row>
        <Row class="mt-3">
            <Button @click="add">
                <i class="k-icon ion-plus"></i>新增
            </Button>
            <Button @click="del" v-show = "show.delete" class = "ml-2">
                <i class="k-icon ion-android-delete"></i>删除
            </Button>
            <Dropdown trigger="click">
                <Button class = "ml-2">
                    更多操作
                    <Icon class="ion-ios-arrow-down"/>
                </Button>
                <DropdownMenu>
                    <DropdownItem @click="downLoadFile">导出Excel</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Row>
        <Row class="my-3">
            <Table
                    :scheme="table.columns"
                    :data="table.datas"
                    :sort="table.sort"
                    :group.async="table.group"
                    :loading="table.loading"
                    resizable
                    type="grid"
                    @$change:sort="_onSort"
                    @$change:group="_onGroup"
                    @$change:checked = "_onCheck"
                    :rowCheckable="false"
            />
            <div class="my-3 text-center">
                <Pagination :total="page.total" :current="page.pageNum" :limit="page.pageSize" @change="pageChange"
                            size="small"/>
            </div>
        </Row>
        <Dialog v-model="modal.show" title="用户信息">
            <template slot="body">
                <component :is="modal.component" :form="modal.form"></component>
            </template>
            <div slot="footer-wrapper"></div>
        </Dialog>
        <Drawer v-model="drawer.show" :title="drawer.title" :closable="false" hideClose ref="addUser" class="drawer">
            <component :is="drawer.type" ref="_drawerBody" :datas = "drawer.datas" @closeFlush="closeFlush"></component>
            <div slot="footer-wrapper" class="text-center">
                <Tooltip content="确定放弃编辑？"
                         confirm
                         trigger="click"
                         @ok="ok"
                >
                    <Button>取消</Button>
                </Tooltip>
                <Button type="primary" class="mx-2 my-3" @click="confirm">确定</Button>
            </div>
        </Drawer>
        <comfirm-dialog :comfirmDialog = "dialog" @confirm = "confirmDel"></comfirm-dialog>
    </div>
</template>

<script>
    import {
        Form, FormItem, Select, Option, Input, Tag, Dropdown, DropdownMenu, DropdownItem,
        Datepicker, Button, Row, Col, Icon, Table, Pagination, Dialog, Drawer, Tooltip,Message
    } from 'kpc'
    import OperBtn from 'components/table/OperBtn'
    import ComfirmDialog from 'components/dialog/ComfirmDialog'
    import {apiList, http, constant} from '@/libs'
    import {downloadFile} from '@/libs/util'
    import Read from './Read'
    import Modify from './Modify'

    export default {
        name: "Index",
        components: {
            Form, FormItem, Select, Option, Input, Datepicker, Dropdown, DropdownMenu, DropdownItem,
            Button, Row, Col, Icon, Table, Pagination, Tag, Dialog, Drawer, Tooltip,Message,ComfirmDialog
        },
        data() {
            return {
                form: {
                    fold: true,
                    username: '',
                    deptId: '',
                    status: '',
                    createTime: '',
                    createTimeFrom: '',
                    createTimeTo: '',
                },
                table: {
                    loading: false,
                    sort: {},
                    group: {},
                    columns: {
                        oper: {
                            title: '操作',
                            width: '70',
                            align : 'center',
                            template: row => {
                                let btnInfo = [
                                    {
                                        content : '查看',
                                        className : 'ion-eye',
                                        event : ()=>{
                                            this.view(row)
                                        }
                                    },
                                    {
                                        content : '修改',
                                        className : 'ion-edit',
                                        event : ()=>{
                                            this.edit(row)
                                        }
                                    }
                                ]
                                return(
                                    <OperBtn btnInfo = {btnInfo}></OperBtn>
                                )
                            }
                        },
                        username: {
                            title: '用户名',
                            sortable: true,
                            align : 'center',
                        },
                        ssex: {
                            title: '性别',
                            align : 'center',
                            template: (data) => {
                                let {ssex} = data
                                let title = '保密'
                                switch (ssex) {
                                    case '0' :
                                        title = '男';
                                        break
                                    case '1' :
                                        title = '女';
                                        break
                                }
                                return <span>{title}</span>
                            },
                        },
                        email: {
                            title: '邮箱',
                            align : 'center',
                        },
                        deptName: {
                            title: '部门',
                            align : 'center',
                            sortable: true
                        },
                        mobile: {
                            title: '电话',
                            align : 'center',
                        },
                        status: {
                            title: '状态',
                            align : 'center',
                            template: (data) => {
                                let {status} = data
                                let tag
                                switch (status) {
                                    case '0' :
                                        tag = {...tag, type: 'danger', label: '锁定'};
                                        break
                                    case '1' :
                                        tag = {...tag, type: 'primary', label: '有效'};
                                        break
                                }
                                return <Tag type={tag.type} size="small">{tag.label}</Tag>
                            },
                            group: [
                                {label: '全部', value: ''},
                                {label: '锁定', value: '0'},
                                {label: '有效', value: '1'},
                            ]
                        },
                        createTime: {
                            title: '创建时间',
                            align : 'center',
                        },
                    },
                    datas: [],
                    selection : []
                },
                page: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10
                },
                show : {
                    delete : false
                },
                modal: {
                    show: false,
                    form: {},
                    component: Read
                },
                drawer: {
                    show: false,
                    title: '新增角色',
                    type: Modify,
                    datas : {}
                },
                dialog : {
                    show :false,
                }
            }
        },
        methods: {
            fold() {
                let {fold} = this.form
                this.form = {
                    ...this.form,
                    fold: !fold
                }
            },
            _onSort(c, sort) {
                let {key, type} = sort
                let {datas} = this.table
                datas.sort((a, b) => {
                    return type === 'desc' ?
                        (a[key] > b[key] ? -1 : 1) :
                        (a[key] > b[key] ? 1 : -1);
                })
                this.table = {
                    ...this.table,
                    datas,
                    sort
                }
            },
            _onGroup(c, group) {
                let {status} = group
                this.form = {
                    ...this.form,
                    status
                }
                this.queryList()
            },
            _onCheck(instance){
                let selection = instance.getCheckedData()
                if(selection.length){
                    this.show = {
                        ...this.show,
                        delete : true
                    }
                }else{
                    this.show = {
                        ...this.show,
                        delete : false
                    }
                }
                this.table = {
                    ...this.table,
                    selection
                }
            },
            del(){
                this.dialog = {
                    ...this.dialog,
                    show : true
                }
            },
            async confirmDel(){
                debugger;
                let params = this.table.selection.map(item=>item.userId).join(',')
                let {code,data} = await http.delete(`${apiList.sys_mgr_user_mgr_query}/${params}`)
                if(code === constant.SUCCESS){
                    Message.success('删除成功')
                    this.queryList()
                }
                this.dialog = {
                    ...this.dialog,
                    show : false
                }
            },
            async downLoadFile() {
                let {createTime, ...res} = this.form
                let params = {
                    ...res
                }
                let {code, data} = await http.post(apiList.sys_mgr_user_mgr_export, {params},true)
                if (code === constant.SUCCESS) {
                    downloadFile(data, '用户信息')
                }
            },
            confirm() {
                this.$refs._drawerBody.save()
            },
            add() {
                this.drawer = {
                    ...this.drawer,
                    show: true,
                    datas : {
                        type : 0            //新增
                    }
                }
            },
            closeDrawer() {
                this.drawer = {
                    ...this.drawer,
                    show: false
                }
            },
            ok() {
                this.closeDrawer()
            },
            closeFlush() {
                this.closeDrawer()
                this.queryList()
            },
            view(row) {
                debugger;
                this.modal = {
                    ...this.modal,
                    show: true
                }
                this.modal = {
                    ...this.modal,
                    form: {...row}
                }
            },
            edit(row){
                this.drawer = {
                    ...this.drawer,
                    show: true,
                    title: '修改角色',
                    type: Modify,
                    datas : {
                        ...row,
                        type : 1            //编辑
                    }
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
            reset() {
                this.$refs.form.reset();
            },
            search() {
                this.queryList()
            },
            async queryList() {
                let {createTime, ...res} = this.form
                let [createTimeFrom, createTimeTo] = createTime ? createTime : []
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
                let {code, data: {total, rows: datas}} = await http.get(apiList.sys_mgr_user_mgr_query, params)
                if (code === constant.SUCCESS) {
                    this.table = {
                        ...this.table,
                        datas,
                        loading: false
                    }
                    this.page = {
                        ...this.page,
                        total
                    }
                }
            }
        },
        mounted() {
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
            width: calc(100% - 282px);
            display: inline-block;
        }
        .tail {
            width: inherit;
        }
        .arrow {
            padding-left: 0.5rem;
            font-size: 20px;
            padding-bottom: -7px;
            display: inline-block;
            margin-bottom: 4px;
        }
    }

    .k-dialog {
        /deep/ .img {
            width: 114px;
        }
        /deep/ .label {
            padding: 0 0.5rem;
        }
    }

    .drawer {
        .k-dialog {
            width: 35%;
        }
    }
</style>
