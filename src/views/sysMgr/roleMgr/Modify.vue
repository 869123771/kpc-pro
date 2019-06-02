<template>
    <div class="modify">
        <Row>
            <Form labelWidth="120" ref="form">
                <FormItem label="角色名称" model="form.roleName"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <Input v-model="form.roleName" class = "w-full"/>
                </FormItem>
                <FormItem label="角色描述" model="form.remark"
                >
                    <Input type="textarea" v-model="form.remark" class = "w-full"/>
                </FormItem>
                <FormItem label="权限选择" model="form.menuId"
                          :rules="tree.checkedKeys.length ? {} : {required: true}"
                          :messages="{required: '必填'}"
                >
                    <Tree :data="tree.data"
                          ref="tree"
                          :expandedKeys.sync="tree.expandedKeys"
                    >
                        <template slot="label" slot-scope="data, node">
                            <tree-content-render :tree-props="{data,node,tree}"
                                                 @checkedKeys="checkedKeys"></tree-content-render>
                        </template>
                    </Tree>
                </FormItem>
            </Form>
        </Row>
    </div>
</template>

<script>
    import {Row, Col, Form, FormItem, Input, Tree, Checkbox,Message} from 'kpc'
    import {apiList, http, constant} from "@/libs";
    import TreeContentRender from './component/TreeContentRender'

    export default {
        name: "Modify",
        components: {
            Row, Col, Form, FormItem, Input, Tree, Checkbox,Message,
            TreeContentRender
        },
        props: {
            roleInfo: {
                type: Object
            }
        },
        data() {
            return {
                form: {
                    roleName: '',
                    remark: '',
                    menuId: ''
                },
                tree: {
                    data: [],
                    expandedKeys: [],
                    checkedKeys: []
                }
            }
        },
        watch: {
            roleInfo: {
                handler(props) {
                    let {roleId} = props
                    if (roleId) {
                        this.form = {
                            ...props
                        }
                        this.getCheckedMenu()
                    }
                },
                immediate: true
            }
        },
        methods: {
            checkedKeys(checkedKeys) {
                let expandedKeys = this.$refs.tree.get('expandedKeys')
                debugger;
                this.tree = {
                    ...this.tree,
                    checkedKeys,
                    expandedKeys
                }
            },
            handleMenu(menus) {
                let Menus = menus.map(menu => {
                    let {children, text} = menu
                    if (children && children.length) {
                        this.handleMenu(children)
                    } else {
                        menu.label = text
                    }
                    menu.label = text
                    return menu
                })
                return Menus
            },
            async save() {
                debugger;
                let {roleId} = this.roleInfo
                let {roleName, remark} = this.form
                let {checkedKeys} = this.tree
                let params = {
                    roleName, remark,
                    roleId,
                    menuId: checkedKeys.join(',')
                }
                let valid = await this.$refs.form.validate()
                if (valid) {
                    let res
                    if(roleId){
                        res = await http.put(apiList.sys_mgr_role_mgr_query, {params})
                    }else{
                        res = await http.post(apiList.sys_mgr_role_mgr_query, {params})
                    }
                    if (res.code === constant.SUCCESS) {
                        Message.success('操作成功')
                        this.$emit('closeAndFlush')
                    }
                }
            },
            async getCheckedMenu() {
                let {roleId} = this.roleInfo
                let {code, data = []} = await http.get(`${apiList.sys_mgr_role_menu}/${roleId}`)
                if (code === constant.SUCCESS) {
                    this.tree = {
                        ...this.tree,
                        checkedKeys: data,
                    }
                }
            },
            async getMenuInfo() {
                let {code, data = []} = await http.get(apiList.sys_mgr_menu_mgr)
                debugger;
                let {rows: {children}, ids} = data
                if (code === constant.SUCCESS) {
                    let MenuData = this.handleMenu(children)
                    this.tree = {
                        ...this.tree,
                        data: MenuData,
                        expandedKeys: this.roleInfo.roleId ? ids : undefined
                    }
                }
            }
        },
        mounted() {
            this.getMenuInfo()
        }
    }
</script>

<style scoped>

</style>
