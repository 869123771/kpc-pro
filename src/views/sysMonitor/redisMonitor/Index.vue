<template>
    <div class = "index">
        <Row>
            <Col span = "12">
                <v-chart :options="options" auto-resize ref = "memory"></v-chart>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {Row,Col} from 'kpc'
    import ECharts from 'vue-echarts/components/ECharts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/tooltip';
    import {http,apiList,constant} from '@/libs'
    import dayjs from 'dayjs'
    let customParams = {
        minMemory : 1e10,
        maxMemory : -1e10,
        xData : [],
        yData : []
    }
    export default {
        name: "Index",
        components: {
            'v-chart': ECharts,
            Row,Col
        },
        data(){
            return {
                options: {
                    title: {
                        text: '堆叠区域图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['邮件营销']
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            min : '',
                            max : ''
                        }
                    ],
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                    ]
                }
            }
        },
        methods : {
            async redisMemory(){
                debugger;
                let {xData,yData} = customParams
                let time =  dayjs().format('hh:mm:ss')
                let {code,data:{used_memory}} = await http.get(apiList.sys_monitor_redis_memory)
                if(code === constant.SUCCESS){
                    debugger;
                    let currentMemory = used_memory / 1000

                    xData = [
                        ...xData,
                        time
                    ]
                    yData = [
                        ...yData,
                        currentMemory
                    ]

                    if(xData.length >= 6){
                        xData.shift()
                    }
                    if(yData.length >= 6){
                        yData.shift()
                    }
                    let minMemory = yData.sort()[0]
                    let maxMemory = yData.sort()[yData.length - 1]
                    customParams = {
                        ...customParams,
                        xData,yData
                    }
                    console.log('min' + minMemory)
                    console.log('max' + maxMemory)
                    this.options = {
                        ...this.options,
                        xAxis : [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: xData
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                min : minMemory,
                                max : maxMemory,
                            }
                        ],
                        series: [
                            {
                                type: 'line',
                                smooth: true,
                                itemStyle  : {
                                    borderWidth : 0
                                },
                                lineStyle : {
                                    color : '#008ffb',
                                    width : 5
                                },
                                areaStyle: {
                                    color : '#b1ddfd'
                                },
                                data: yData
                            },
                        ]
                    }
                    console.log(this.$refs.memory)
                    this.$refs.memory.refresh()
                }
            },
            refreshChart(){
                this.timer = setInterval(()=>{
                    this.redisMemory()
                },3000)

            }
        },
        beforeDestroy () {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        mounted(){
            this.refreshChart()
        }
    }
</script>

<style scoped>

</style>
