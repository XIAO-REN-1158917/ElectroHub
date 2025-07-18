<template>
    <div>
        <!-- Static data for demonstration -->
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>Today</h4>
                    </div>
                    <div class="total">
                        <h1>{{addThousandSeparator(23982)}}</h1>
                        <div class="percent">21%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>This Month</h4>
                    </div>
                    <div class="total">
                        <h1>{{addThousandSeparator(123982)}}</h1>
                        <div class="percent">11%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>Member Prepaid</h4>
                    </div>
                    <div class="total">
                        <h1>{{addThousandSeparator(53982)}}</h1>
                        <div class="percent">15%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>Service Fee</h4>
                    </div>
                    <div class="total">
                        <h1>{{addThousandSeparator(3982)}}</h1>
                        <div class="percent">22%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>Parking Fee</h4>
                    </div>
                    <div class="total">
                        <h1>{{addThousandSeparator(5982)}}</h1>
                        <div class="percent">11%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document />
                            </el-icon>
                        </div>
                        <h4>Power Expenses</h4>
                    </div>
                    <div class="total">
                        <h1>{{addThousandSeparator(9398)}}</h1>
                        <div class="percent">31%</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        
        <el-card class="mt">
            <div ref="chartRef" style="width: 100%;height: 300px;"></div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import addThousandSeparator from '@/utils/thousandsSeparator';
import { revenueChartApi } from '@/api/chargingStation';
import { useChart } from '@/hooks/useChart';
import { ref, reactive } from "vue";

const chartRef=ref(null)

const setRevenueChartData=async ()=>{
    const chartOptions = reactive({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        },
        yAxis: [
            {
                type: 'value',
                name: 'Sales',
                position: 'left'
            },
            {
                type: 'value',
                name: 'Views',
                position: 'right'
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                data: [],
                yAxisIndex: 0,
                itemStyle: {
                    color: '#409eff'
                }
            },
            {
                name: '',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                itemStyle: {
                    color: '#409eff'
                },
                smooth: true
            }
        ]
    });
    const res = await revenueChartApi()
    chartOptions.legend.data = res.data.list.map((item: any) => item.name);
    for (let i = 0; i < res.data.list.length; i++) {
        chartOptions.series[i].name = res.data.list[i].name
        chartOptions.series[i].data = res.data.list[i].data
    }
    return chartOptions
}

useChart(chartRef,setRevenueChartData)


</script>

<style lang="less" scoped>
.title{
    display: flex;
    align-items: center;
    .round{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgb(235, 236, 245);
        text-align: center;
        line-height: 30px;
        margin-right: 20px;
    }
    h4{color: #666;}
}
.total{
    display: flex;
    align-items: center;
    h1{
        font-size: 30px;
        margin-right: 20px;
    }
    .percent{
        display: inline-block;
        padding: 3px 5px;
        height: 20px;
        font-size: 12px;
        background-color: rgb(235, 247, 239);
        border-radius: 2px;
        color:green;
        line-height: 20px;
    }
}
</style>