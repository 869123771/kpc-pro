<template>
    <div class="modify">
        <Row>
            <Form labelWidth="120" ref="form">
                <FormItem label="角色名称" model="form.roleName"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <Input v-model="form.roleName"/>
                </FormItem>
                <FormItem label="角色描述" model="form.remark"
                >
                    <Input type="textarea" v-model="form.remark"/>
                </FormItem>
                <FormItem label="权限选择" model="form.menuId"
                          :rules="tree.checkedKeys.length ? {} : {required: true}"
                          :messages="{required: '必填'}"
                >
                    <Tree :data="tree.data"
                          checkbox
                          ref="tree"
                          :selectedKeys.sync="tree.selectedKeys"
                          :expandedKeys = "tree.expandedKeys"
                          @$change:checkedKeys = "checked"
                    />
                </FormItem>
            </Form>
        </Row>
    </div>
</template>

<script>
    import {Row, Col, Form, FormItem, Input, Tree} from 'kpc'
    import {apiList, http, constant} from "@/libs";

    export default {
        name: "Modify",
        components: {
            Row, Col, Form, FormItem, Input, Tree
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
                    selectedKeys: [],
                    expandedKeys : [],
                    checkedKeys : []
                }
            }
        },
        watch : {
            roleInfo : {
                handler(props){
                    let {roleId} = props
                    if(roleId){
                        this.form = {
                            ...props
                        }
                        this.getCheckedMenu()
                    }
                },
                immediate : true
            }
        },
        methods: {
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
            checked(tree,checkedKeys){
              this.tree = {
                  ...this.tree,
                  checkedKeys
              }
            },
            async save() {
                debugger;
                console.log(this.$refs.tree.getCheckedData());
                let valid = await this.$refs.form.validate()
                if (valid) {

                }
            },
            async getCheckedMenu(){
                let {roleId} =  this.roleInfo
                let {code, data = []} = await http.get(`${apiList.sys_mgr_role_menu}/${roleId}`)
                if (code === constant.SUCCESS) {
                    this.tree = {
                        ...this.tree,
                        selectedKeys : data,
                    }
                }
            },
            async getMenuInfo() {
                let {code, data = []} = await http.get(apiList.sys_mgr_menu_mgr)
                debugger;
                let {rows: {children},ids} = data
                if (code === constant.SUCCESS) {
                    let MenuData = this.handleMenu(children)
                    this.tree = {
                        ...this.tree,
                        data: MenuData,
                        expandedKeys : this.roleInfo.roleId ? ids : []
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
