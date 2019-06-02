<script>
    import {Tooltip,Icon} from 'kpc'
    import {mapState} from 'vuex'
    export default {
        name: "OperBtn",
        props : {
           btnInfo : {
               type : Array
           }
        },
        computed : {
            ...mapState({
                permissions : ({user})=> user.permissions
            })
        },
        render(h){
            let btnInfo = this.btnInfo
            let props = {
                style: {
                    cursor: 'pointer',
                    paddingLeft: '0.25rem',
                    paddingRight : '0.25rem',
                }
            }
            return(
                <div>
                    {
                        btnInfo.map(({content,className,permission,event})=>{
                            return(
                                this.permissions.includes(permission) ?
                                <Tooltip placement="top" content = {content}>
                                    <Icon {...props} class = {className} onClick={() => event()}></Icon>
                                </Tooltip>
                                    : null
                            )
                        })
                    }
                </div>
            )
        }
    }
</script>

<style scoped>

</style>
