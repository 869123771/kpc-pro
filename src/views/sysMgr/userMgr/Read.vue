<template>
    <div class = "read">
        <Row>
            <Col span="6">
                <img :src="avatarLocation + form.avatar" class="img">
            </Col>
            <Col span="9">
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-android-person"></Icon>
                    <span class="label">账户:</span>
                    <span>{{form.username}}</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-ios-star-outline"></Icon>
                    <span class="label">角色:</span>
                    <span>{{form.roleName}}</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-tshirt-outline"></Icon>
                    <span class="label">性别:</span>
                    <span>{{form.ssex === '0'?'男':'女'}}</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-ios-telephone-outline"></Icon>
                    <span class="label">电话:</span>
                    <span>{{form.mobile}}</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-ios-email-outline"></Icon>
                    <span class="label">邮箱:</span>
                    <span>{{form.email}}</span>
                </div>
            </Col>
            <Col span="9">
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-ios-home-outline"></Icon>
                    <span class="label">部门:</span>
                    <span>{{form.deptName}}</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-ios-star-outline"></Icon>
                    <span class="label">状态:</span>
                    <template v-if="form.status === '1'">
                        <Tag size="mini" type="primary">有效</Tag>
                    </template>
                    <template v-else>
                        <Tag size="mini" type="danger">锁定</Tag>
                    </template>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-ios-time-outline"></Icon>
                    <span class="label">创建时间:</span>
                    <span>{{form.createTime}}</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-android-radio-button-off"></Icon>
                    <span class="label">最近登录:</span>
                    <span>{{form.lastLoginTime}}</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <Icon class="ion-ios-chatbubble-outline"></Icon>
                    <span class="label">描述:</span>
                    <span>{{form.description}}</span>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {Row,Col,Icon,Tag} from 'kpc'
    import {constant} from '@/libs'
    let {config:{avatarLocation}} = constant
    export default {
        name: "Read",
        components : {
            Row,Col,Icon,Tag
        },
        data(){
            return {
                avatarLocation
            }
        },
        props : {
            form : {
                type : Object
            }
        }
    }
</script>

<style scoped>

</style>
