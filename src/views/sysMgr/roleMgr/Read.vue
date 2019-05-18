<template>
    <div class = "read">
        <Row class = "d-flex align-items-center mt-3">
            <div><Icon class = "ion-android-contacts"></Icon></div>
            <div class = "px-2">角色名称:</div>
            <div>{{form.roleName}}</div>
        </Row>
        <Row class = "d-flex align-items-center mt-3">
            <div><Icon class="ion-android-list"></Icon></div>
            <div class = "px-2">角色描述:</div>
            <div>{{form.remark}}</div>
        </Row>
        <Row class = "d-flex align-items-center mt-3">
            <div><Icon class = "ion-compass"></Icon></div>
            <div class = "px-2">创建时间:</div>
            <div>{{form.createTime}}</div>
        </Row>
        <Row class = "d-flex align-items-center mt-3">
            <div><Icon class = "ion-pinpoint"></Icon></div>
            <div class = "px-2">修改时间:</div>
            <div>{{form.modifyTime}}</div>
        </Row>
        <Row class = "mt-3">
            <div class = "d-flex align-items-center">
                <div><Icon class = "ion-trophy"></Icon></div>
                <div class = "px-2">所拥有的权限:</div>
            </div>
            <div>
                <Tree :data="tree.data"
                      ref="tree"
                      :checkedKeys.sync="tree.checkedKeys"
                      :expandedKeys = "tree.expandedKeys"
                >
                    <template slot="label" slot-scope="data, node">
                        <tree-content-render :tree-props="{data,node,tree}"></tree-content-render>
                    </template>
                </Tree>
            </div>
        </Row>
    </div>
</template>

<script>
    import {Row,Icon,Tree} from 'kpc'
    import {apiList,http,constant} from '@/libs'
    import TreeContentRender from './component/TreeContentRender'
    export default {
        name: "Read",
        components : {
            Row,Icon,Tree,TreeContentRender
        },
        props : {
            roleInfo : {
                type : Object
            }
        },
        data(){
          return {
              form : {},
              tree: {
                  data: [],
                  checkedKeys: [],
                  expandedKeys : []
              }
          }
        },
        watch : {
            roleInfo : {
                handler(props){
                   this.form = {
                       ...props
                   }
                },
                immediate : true
            }
        },
        methods : {
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
            async getCheckedMenu(){
                let {roleId} =  this.roleInfo
                let {code, data = []} = await http.get(`${apiList.sys_mgr_role_menu}/${roleId}`)
                if (code === constant.SUCCESS) {
                    this.tree = {
                        ...this.tree,
                        checkedKeys : data,
                    }
                }
            },
            async getMenuInfo() {
                let {code, data = {}} = await http.get(apiList.sys_mgr_menu_mgr)
                let {rows: {children},ids} = data
                if (code === constant.SUCCESS) {
                    let MenuData = this.handleMenu(children)
                    this.tree = {
                        ...this.tree,
                        data: MenuData,
                        expandedKeys : ids
                    }
                }
            }
        },
         created(){
             this.getMenuInfo()
             this.getCheckedMenu()
        }
    }
</script>

<style scoped>

</style>
