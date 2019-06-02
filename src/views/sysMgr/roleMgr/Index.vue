<template>
    <div class="role-mgr">
        <Row>
            <Form ref="form">
                <Col span="10">
                    <FormItem label="角色" model="form.roleName" class="w-100">
                        <Input v-model="form.roleName" clearable fluid/>
                    </FormItem>
                </Col>
                <Col span="10">
                    <FormItem label="创建时间" model="form.createTime" class="w-full">
                        <Datepicker range v-model="form.createTime" clearable class="w-full"/>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button type="primary" @click="search" class="mx-2">
                        <i class="iconfont icon-search"></i>查询
                    </Button>
                    <Button @click="reset">
                        <i class="k-icon ion-ios-reload"><i/></i>重置
                    </Button>
                </Col>
            </Form>
        </Row>
        <Row class="mt-3">
            <Button @click="add">
                <i class="k-icon ion-plus"></i>新增
            </Button>
            <Button @click="del" v-show="show.delete" class="ml-2">
                <i class="k-icon ion-android-delete"></i>删除
            </Button>
            <Dropdown trigger="click">
                <Button class="ml-2">
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
                    :loading="table.loading"
                    size="small"
                    resizable
                    type="grid"
                    @$change:sort="_onSort"
                    @$change:checked="_onCheck"
                    :rowCheckable="false"
            />
            <div class="my-3 text-center">
                <Pagination :total="page.total" :current="page.pageNum" :limit="page.pageSize" @change="pageChange"
                            size="small"/>
            </div>
        </Row>
        <drag-drawer v-model="drawer.show"
                     :draggable="drawer.draggable"
                     :title="drawer.title"
                     :width = "drawer.width"
                     :placement="drawer.placement"
                     :scrollable="true"
                     @on-resize="handleResize"
        >
            <component :is="drawer.type" :role-info="drawer.data" ref="_drawer"
                       @closeAndFlush="closeAndFlush"></component>
            <div slot="footer-wrapper" class="text-center">
                <Tooltip content="确定放弃编辑？"
                         confirm
                         trigger="click"
                         @ok="ok"
                >
                    <Button>取消</Button>
                </Tooltip>
                <Button type="primary" class="mx-2 my-3" @click="save">确定</Button>
            </div>
        </drag-drawer>
        <comfirm-dialog :comfirmDialog="dialog" @confirm="confirmDel"></comfirm-dialog>
    </div>
</template>

<script>
    import {
        Row, Col, Form, FormItem, Dropdown, DropdownMenu, DropdownItem, Drawer,
        Input, Button, Datepicker, Table, Pagination, Icon, Tooltip, Message
    } from 'kpc'
    import {apiList, http, constant} from '@/libs'
    import {downloadFile} from '@/libs/tools'
    import Modify from './Modify'
    import OperBtn from 'components/table/OperBtn'
    import ComfirmDialog from 'components/dialog/ComfirmDialog'
    import DragDrawer from 'components/drag-drawer'
    import Read from './Read'

    export default {
        name: "Index",
        components: {
            Row, Col, Form, FormItem, Dropdown, DropdownMenu, DropdownItem, Drawer,
            Input, Button, Datepicker, Table, Pagination, Icon, Tooltip, Message,
            ComfirmDialog, DragDrawer
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
                    selection: [],
                    columns: {
                        oper: {
                            title: '操作',
                            width: '70',
                            align: 'center',
                            template: row => {
                                let btnInfo = [
                                    {
                                        content: '查看',
                                        className: 'ion-eye',
                                        permission: 'role:view',
                                        event: () => {
                                            this.view(row)
                                        }
                                    },
                                    {
                                        content: '修改',
                                        className: 'ion-edit',
                                        permission: 'role:update',
                                        event: () => {
                                            this.edit(row)
                                        }
                                    }
                                ]
                                return (
                                    <OperBtn btnInfo={btnInfo}></OperBtn>
                                )
                            }
                        },
                        roleName: {
                            title: '角色',
                            align: 'center',
                        },
                        remark: {
                            title: '描述',
                            align: 'center',
                        },
                        createTime: {
                            title: '创建时间',
                            align: 'center',
                            sortable: true
                        },
                        modifyTime: {
                            title: '修改时间',
                            align: 'center',
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
                show: {
                    delete: false
                },
                dialog: {
                    show: false,
                },
                drawer: {
                    show: false,
                    placement: 'right',
                    title: '新增角色',
                    draggable : true,
                    type: Modify,
                    data: {}
                },
            }
        },
        watch: {},

        methods: {
            handleResize (event) {
                const { atMin } = event
                /* eslint-disable */
                console.log(atMin);
            },
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
            _onCheck(instance) {
                let selection = instance.getCheckedData()
                if (selection.length) {
                    this.show = {
                        ...this.show,
                        delete: true
                    }
                } else {
                    this.show = {
                        ...this.show,
                        delete: false
                    }
                }
                this.table = {
                    ...this.table,
                    selection
                }
            },
            del() {
                this.dialog = {
                    ...this.dialog,
                    show: true
                }
            },
            async confirmDel() {
                debugger;
                let params = this.table.selection.map(item => item.roleId).join(',')
                let {code, data} = await http.delete(`${apiList.sys_mgr_role_mgr_query}/${params}`)
                if (code === constant.SUCCESS) {
                    Message.success('删除成功')
                    this.queryList()
                }
                this.dialog = {
                    ...this.dialog,
                    show: false
                }
            },
            view(row) {
                this.drawer = {
                    ...this.drawer,
                    show: true,
                    title: '角色信息',
                    hideClose: false,
                    type: Read,
                    data: row
                }
            },
            edit(row) {
                this.drawer = {
                    ...this.drawer,
                    show: true,
                    title: '修改角色',
                    hideClose: true,
                    type: Modify,
                    data: row
                }
            },
            save() {
                this.$refs._drawer.save()
            },
            closeAndFlush() {
                this.drawer = {
                    ...this.drawer,
                    show: false,
                }
                this.queryList()
            },
            pageChange({current: pageNum, limit: pageSize}) {
                this.page = {
                    ...this.page,
                    pageNum,
                    pageSize
                }
                this.queryList()
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
            add() {
                this.drawer = {
                    ...this.drawer,
                    show: true,
                    title: '新增角色',
                    hideClose: true,
                    type: Modify,
                    data: {}
                }
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
                let {code, data: {total, rows: datas}} = await http.get(apiList.sys_mgr_role_mgr_query, params)
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
            },
            async downLoadFile() {
                let {createTime, ...res} = this.form
                let params = {
                    ...res
                }
                let {code, data} = await http.post(apiList.sys_mgr_role_mgr_exprot, {params}, true)
                if (code === constant.SUCCESS) {
                    downloadFile(data, '角色信息')
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

    .k-drawer .k-dialog {
        width: 35%;
    }
</style>
