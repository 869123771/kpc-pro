<template>
    <div class="user-mgr">
        <Row>
            <Form ref="form">
                <div :class="form.fold?'fold':''">
                    <Col span="8">
                        <FormItem label="键" model="form.keyy" class="w-100">
                            <Input v-model="form.keyy" clearable fluid/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="值" model="form.valuee" class="w-100">
                            <Input v-model="form.valuee" clearable fluid/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="表名" model="form.tableName" class="w-100">
                            <Input v-model="form.tableName" clearable fluid/>
                        </FormItem>
                    </Col>
                </div>
                <Col span="8" class="mt-3" v-show="!form.fold">
                    <FormItem label="字段" model="form.fieldName" class="w-100">
                        <Input v-model="form.fieldName" clearable fluid/>
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
                    @$change:checked = "_onCheck"
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
                     :placement="drawer.placement"
                     :scrollable="true"
        >
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
        </drag-drawer>
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
    import DragDrawer from 'components/drag-drawer'
    import {apiList, http, constant} from '@/libs'
    import {downloadFile} from '@/libs/tools'
    import Modify from './Modify'

    export default {
        name: "Index",
        components: {
            Form, FormItem, Select, Option, Input, Datepicker, Dropdown, DropdownMenu, DropdownItem,
            Button, Row, Col, Icon, Table, Pagination, Tag, Dialog, Drawer, Tooltip,Message,
            ComfirmDialog,DragDrawer
        },
        data() {
            return {
                form: {
                    fold: true,
                    keyy: '',
                    valuee: '',
                    tableName : '',

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
                                        content : '修改',
                                        className : 'ion-edit',
                                        permission : 'dict:update',
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
                        keyy: {
                            title: '键',
                            align : 'center',
                        },
                        valuee: {
                            title: '值',
                            align : 'center',
                        },
                        tableName: {
                            title: '表名',
                            align : 'center',
                        },
                        fieldName: {
                            title: '字段',
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
                drawer: {
                    show: false,
                    draggable : true,
                    placement : 'right',
                    title: '新增字典',
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
                let params = {
                    ...this.form
                }
                let {code, data} = await http.post(apiList.sys_mgr_dict_mgr_exprot, {params},true)
                if (code === constant.SUCCESS) {
                    downloadFile(data, '字典信息')
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
                debugger;
                this.closeDrawer()
                this.queryList()
            },
            edit(row){
                this.drawer = {
                    ...this.drawer,
                    show: true,
                    title: '修改字典',
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
                let params = {
                    ...this.form,
                    ...this.page,
                }
                this.table = {
                    ...this.table,
                    loading: true,
                }
                let {code, data: {total, rows: datas}} = await http.get(apiList.sys_mgr_dict_mgr, params)
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
