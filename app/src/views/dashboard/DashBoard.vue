<template>
    <el-row :gutter="20">
        <!-- left -->
        <!-- This section uses a static page due to simple or repetitive data logic. -->
        <el-col :span="18">
            <el-card>
                <div class="title mb">
                    <h3>Daily Equipment Report</h3>
                    <p class="ml">Last Updated: 11/07/2025</p>
                    <el-icon 
                    color="#86909C" 
                    style="margin-left: 5px;"
                    >
                    <Refresh />
                    </el-icon>
                </div>
                <div class="equipment">
                    <div class="item">
                        <h4 class="mt mb">Charging Pile Usage</h4>
                        <img :src="flash" class="mt mb">
                        <h1 class="mb">2263 / 3398</h1>
                        <div class="statistic-card">
                            <el-statistic :value="47">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                    Abnormal Device
                                    <el-tooltip
                                        effect="dark"
                                        content="47 Devices in Error State"
                                        placement="top"
                                    >
                                        <el-icon style="margin-left: 4px" :size="12">
                                        <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>than yesterday</span>
                                    <span class="green">
                                    24%
                                    <el-icon color="green">
                                        <CaretTop />
                                    </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4 class="mt mb">Charging Cabinet Usage</h4>
                        <img :src="flash2" class="mt mb">
                        <h1 class="mb">655 / 1233</h1>
                        <div class="statistic-card">
                            <el-statistic :value="22">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                    Abnormal Device
                                    <el-tooltip
                                        effect="dark"
                                        content="22 Devices in Error State"
                                        placement="top"
                                    >
                                        <el-icon style="margin-left: 4px" :size="12">
                                        <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>than yesterday</span>
                                    <span class="green">
                                    20%
                                    <el-icon color="red">
                                        <CaretTop />
                                    </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4 class="mt mb">Station Utilisation</h4>
                        <img :src="flash3" class="mt mb">
                        <h1 class="mb">72 / 95</h1>
                        <div class="statistic-card">
                            <el-statistic :value="9">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                    Abnormal Device
                                    <el-tooltip
                                        effect="dark"
                                        content="9 Devices in Error State"
                                        placement="top"
                                    >
                                        <el-icon style="margin-left: 4px" :size="12">
                                        <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>than yesterday</span>
                                    <span class="green">
                                    14%
                                    <el-icon color="green">
                                        <CaretTop />
                                    </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>Frequently Used Features</h1>
                    </div>
                </template>
                <div class="quick mt mb">
                    <el-row>
                        <el-col :span="4">
                            <img :src="repair">
                            <p>Device Maintenance</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="daily">
                            <p>Daily Report</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="progress">
                            <p>Task Progress</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="total">
                            <p>Revenue Breakdown</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="money">
                            <p>Revenue Summary</p>
                        </el-col>
                        <el-col :span="4">
                            <img :src="remain">
                            <p>Pending Tasks</p>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>Energy Statistics</h1>
                    </div>
                </template>
                <el-row>
                    <el-col :span="6">
                        <div ref="pieChartRef" style="width: 100%; height: 400px;">

                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div ref="lineChartRef" style="width: 100%; height: 400px;">

                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>

        <!-- right -->
        <el-col :span="6">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h1>Equipment Overview</h1>
                    </div>
                </template>
                <div ref="radarChartRef" style="width: 100%; height: 240px;"></div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import flash from "@/assets/flash.png"
import flash2 from "@/assets/flash2.png"
import flash3 from "@/assets/flash3.png"
import repair from "@/assets/repair.png"
import progress from "@/assets/progress.png"
import remain from "@/assets/remain.png"
import total from "@/assets/total.png"
import money from "@/assets/money.png"
import daily from "@/assets/daily.png"
import { useChart } from "@/hooks/useChart"
import { ref,reactive } from "vue"
import { lineChartDataApi,pieChartDataApi,radarChartDataApi } from "@/api/dashboard"

const lineChartRef = ref(null)
const pieChartRef = ref(null)
const radarChartRef = ref(null)

const setLineChartData = async () => {
    const chartOptions: any = reactive({
        title: {
            text: 'Power Statistics',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}kw'
            }
        },
        series: [
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "purple",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "lightgreen",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "skyblue",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },

        ]
    });
    const res = await lineChartDataApi()
    chartOptions.legend.data = res.data.list.map((item: any) => item.name);
    for (let i = 0; i < res.data.list.length; i++) {
        chartOptions.series[i].name = res.data.list[i].name
        chartOptions.series[i].data = res.data.list[i].data
    }
    return chartOptions
}

const setPieChartData = async () => {
    const chartOptions: any = reactive({
        legend: {
            top: 'bottom'
        },
        tooltip: {
            trigger: "item",
            formatter: '{a}<br/>{b}:{c}'
        },
        series: [
            {
                name: 'Revenue',
                type: 'pie',
                radius: ["30%", "60%"],
                center: ['50%', '50%'],
                roseType: "area",
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "12",
                        fontWeight: "bold"
                    }
                },
                data: []
            }
        ],
        graphic: {
            type: 'text',
            left: "center",
            top: "center",
            style: {
                text: "Revenue",
                fontSize: 20,
                fill: "#333"
            }
        }
    })
    const res = await pieChartDataApi()
    chartOptions.series[0].data = res.data.list;
    return chartOptions
}

const setRadarChartData = async () => {
    const chartOptions = reactive({
        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'Idle', max: 65 },
                { name: 'In Use', max: 160 },
                { name: 'Faulty', max: 300 },
                { name: 'Under Maintenance', max: 380 },
                { name: 'Replaced', max: 520 },
                { name: 'Scrapped', max: 250 }
            ]
        },
        series: [
            {
                name: 'Equipment Overview',
                type: 'radar',
                data: [
                    {
                        value: [],
                        name: 'Equipment Overview'
                    },
                ]
            }
        ]
    })
    const res = await radarChartDataApi();
    chartOptions.series[0].data[0].value = res.data.list;
    return chartOptions;
}



useChart(lineChartRef, setLineChartData)
useChart(pieChartRef, setPieChartData)
useChart(radarChartRef,setRadarChartData)


</script>

<style lang="less" scoped>
.title{
    display: flex;
    font-size: 20px;
    font-weight: bold;
    align-items: flex-end;
    text-align: center;
    p{
        color: #86909C;
    }
}
.equipment{
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    .item{
        h1{
            font-size: 36px;
        }
        :deep(.el-statistic__content) {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
}
.quick {

    margin-top: 30px;
    text-align: center;

    p {
        margin-top: 10px;
        color: #333;
    }
}


</style>