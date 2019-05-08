<script>
    import {Tooltip,Icon} from 'kpc'
    export default {
        name: "OperBtn",
        props : {
           btnInfo : {
               type : Array
           }
        },
        render(h){
            let btnInfo = this.btnInfo
            let props = {
                style: {
                    cursor: 'pointer',
                    paddingLeft: '0.5rem'
                }
            }
            return(
                <div>
                    {
                        btnInfo.map(({content,className,event})=>{
                            return(
                                <Tooltip placement="top" content = {content}>
                                    <Icon {...props} class = {className} onClick={() => event()}></Icon>
                                </Tooltip>
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
