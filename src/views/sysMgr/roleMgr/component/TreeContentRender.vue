<script>
    import {Checkbox} from 'kpc'
    export default {
        name: "TreeContentRender",
        data(){
            return {
                checked : false
            }
        },
        props : {
           treeProps : {
               type : Object
           }
        },
        methods : {
            selectionChange(checkbox,key){
                debugger;
                let {tree:{checkedKeys}} = this.treeProps
                if(checkbox.get('value')){
                    checkedKeys.push(key)
                }else{
                    checkedKeys.splice(checkedKeys.indexOf(key),1)
                }
                this.$emit('checkedKeys',checkedKeys)
            }
        },
        render(h){
            let {tree:{checkedKeys},data:{key,label},node} = this.treeProps
            return (
                <span>
                    <Checkbox
                        value = {checkedKeys.includes(key)}
                        on={{'$change:value': (checkbox)=>this.selectionChange(checkbox,key)}}
                    />
                    <span className="k-label">{label}</span>
                </span>
            )
            debugger;
        }
    }
</script>

<style scoped>

</style>
