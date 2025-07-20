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

        <el-card class="mt">
            <el-input v-model="name" style="max-width: 400px;" placeholder="Filter by Station's name">
                <template #append>
                    <el-button icon="Search" @click="loadRevenueListData"></el-button>
                </template>
            </el-input>            
            <el-table :data="revenueTableData" v-loading="loading">
                <el-table-column type="index" label="Index" width="80"></el-table-column>
                <el-table-column label="Name" prop="name"></el-table-column>
                <el-table-column label="ID"  prop="id"></el-table-column>
                <el-table-column label="City"  prop="city"></el-table-column>
                <el-table-column label="Total Piles"  prop="count"></el-table-column>
                <el-table-column label="Revenue Today" prop="day" sortable width="140">
                    <template #default="scope">
                        <span>{{ scope.row.day }}</span>
                        <el-tag :type="scope.row.percent>0?'success':'danger'" class="ml">
                            {{scope.row.percent>0?"+"+scope.row.percent+"%":scope.row.percent+"%"}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Monthly Revenue(k)"  prop="month" width="130">
                    <template #default="scope">
                        <span>{{ scope.row.month }}</span>
                        <el-tag :type="scope.row.mpercent>0?'success':'danger'" class="ml">
                            {{scope.row.mpercent>0?"+"+scope.row.mpercent+"%":scope.row.mpercent+"%"}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Electricity Revenue" prop="electricity"></el-table-column>
                <el-table-column label="Parking Revenue" prop="parkingFee"></el-table-column>
                <el-table-column label="Service Revenue" prop="serviceFee"></el-table-column>
                <el-table-column label="Membership Top-up" prop="member"></el-table-column>
            </el-table>
            <el-pagination 
                class="fr mt mb"
                v-model:current-page="pageInfo.page" 
                v-model:page-size="pageInfo.pageSize"
                :page-sizes="[10, 20, 30, 40]" 
                layout="sizes, prev, pager, next, jumper,total" 
                :total="totals" 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" 
                background
            />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import addThousandSeparator from '@/utils/thousandsSeparator';
import { revenueChartApi,revenueListApi } from '@/api/chargingStation';
import { useChart } from '@/hooks/useChart';
import { usePagination } from '@/hooks/usePagination';
import { ref, reactive, onMounted } from "vue";

const chartRef = ref(null)
const revenueTableData = ref([])
const loading = ref<boolean>(false)
const name=ref<string>("")

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

useChart(chartRef, setRevenueChartData)


const loadRevenueListData = async () => {
    loading.value=true 
    const { data: { list, total } } = await revenueListApi({ ...pageInfo,name:name.value })
    setTotals(total)
    loading.value=false 
    revenueTableData.value = list
    revenueTableData.value=list.map((item:any)=>({
        ...item,
        day:item.electricity+item.parkingFee+item.serviceFee+item.member
  }))
    
}

const {totals,pageInfo,handleCurrentChange,handleSizeChange,setTotals}=usePagination(loadRevenueListData)

onMounted(() => {
    loadRevenueListData()
})

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