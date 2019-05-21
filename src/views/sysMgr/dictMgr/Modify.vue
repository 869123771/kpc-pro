<template>
    <div class="add">
        <Row>
            <Form labelWidth="60" ref="form">
                <FormItem model="form.keyy"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <template slot="label">
                        <span class="append-star">*</span>键
                    </template>
                    <Input v-model="form.keyy" fluid/>
                </FormItem>

                <FormItem model="form.valuee"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <template slot="label">
                        <span class="append-star">*</span>值
                    </template>
                    <Input v-model="form.valuee" fluid/>
                </FormItem>

                <FormItem model="form.tableName"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <template slot="label">
                        <span class="append-star">*</span>表名
                    </template>
                    <Input v-model="form.tableName" fluid/>
                </FormItem>
                <FormItem model="form.fieldName"
                          :rules="{required: true}"
                          :messages="{required: '必填'}"
                >
                    <template slot="label">
                        <span class="append-star">*</span>字段
                    </template>
                    <Input v-model="form.fieldName" fluid/>
                </FormItem>
            </Form>
        </Row>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {Row, Col, Form, FormItem, Input, Radio, Tooltip, Select, Option, Message} from 'kpc'
    import {apiList, http, constant} from '@/libs'

    export default {
        name: "Modify",
        components: {
            Row, Col, Form, FormItem, Input, Radio, Tooltip, Select, Option, Message
        },
        props: {
            datas: {
                type: Object
            }
        },
        data() {
            return {
                form: {},
            }
        },
        watch: {
            datas: {
                async handler(props) {
                    debugger;
                    if (props.type) {             //编辑
                        this.setValue()
                    }
                },
                immediate: true
            }
        },
        computed: {

        },
        methods: {
            setValue(){
                let {keyy,valuee,tableName,fieldName,} = this.datas
                this.form = {
                    keyy,valuee,tableName,fieldName,
                }
            },
            async save() {
                let valid = await this.$refs.form.validate()
                if (valid) {
                    let res , message
                    let params = {
                        ...this.form,
                    }
                    if(this.datas.type){      //修改
                        res = await http.put(apiList.sys_mgr_dict_mgr, {params})
                        message = '修改成功'
                    }else{
                        res = await http.post(apiList.sys_mgr_dict_mgr, {params})
                        message = '新增成功'
                    }
                    let {code, data} = res
                    if (code === constant.SUCCESS && data !== false) {
                        Message.success(message)
                        this.$emit('closeFlush')
                    }
                }
            },
        },
        created() {

        }
    }
</script>

<style scoped lang="less">
    .add {
        .append-star {
            color: #db2828
        }

    }
</style>
