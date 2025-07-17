<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model.trim="formParams.input" placeholder="Enter name or ID">
                    <template #append>
                        <el-select v-model="select" style="width: 115px">
                        <el-option label="Filter by name" value="name" />
                        <el-option label="Filter by ID" value="id" />
                        </el-select>
                    </template>
                </el-input>
            </el-col>

            <el-col :span="6">
                <el-select placeholder="Charging Station Status" v-model="formParams.value">
                    <el-option label="All" :value="1"></el-option>
                    <el-option label="In Use" :value="2"></el-option>
                    <el-option label="Available" :value="3"></el-option>
                    <el-option label="Under Maintenance" :value="4"></el-option>
                    <el-option label="Pending Repair" :value="5"></el-option>
                </el-select>
            </el-col>

            <el-col :span="6">
                <el-button type="primary" @click="loadStationListData">Filter</el-button>
                <el-button @click="handleReset">Reset</el-button>
            </el-col>
        </el-row>
    </el-card>
    <!-- This section uses a static page due to simple or repetitive data logic. -->
    <el-card class="mt">
        <el-row>
            <el-col :span="6">
                <el-statistic title="Total Power Charged (kWh)" :value="268900" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="Total Charging Sessions" :value="1389"></el-statistic>
            </el-col>
            <el-col :span="6">
                <el-statistic title="Service Areas" :value="88" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="Total Revenue (NZD)" :value="622178"></el-statistic>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="primary" icon="Plus" @click="handleAdd">Add Station</el-button>
    </el-card>

    <el-card>
        <el-table 
        :data="stationListTableData" 
        style="width: 100%"
        v-loading="loading"
        >
            <el-table-column type="index" width="50" label="No." />
            <el-table-column prop="name" label="Name"  />
            <el-table-column prop="id" label="ID"  />
            <el-table-column prop="city" label="City"  />
            <el-table-column prop="fast" label="Fast"  />
            <el-table-column prop="slow" label="Slow"  />
            <el-table-column prop="status" label="Status">
                <template #default="scope">
                    <el-tag v-if="scope.row.status==2" type="primary">In Use</el-tag>
                    <el-tag v-if="scope.row.status==3" type="success">Idel</el-tag>
                    <el-tag v-if="scope.row.status==4" type="warning">Maint.</el-tag>
                    <el-tag v-if="scope.row.status==5" type="danger">Fault</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="inUse" label="In Use"  />
            <el-table-column prop="fault" label="Fault"  />
            <el-table-column prop="person" label="Person"  />
            <el-table-column prop="tel" label="Tel"  />
            <el-table-column label="Operate" width="140">
                <template #default="scope">
                    <el-button 
                    type="primary" 
                    size="small"
                    @click="edit(scope.row)"
                    >Edit</el-button>
                    <el-Popconfirm 
                    title="Are you sure to delete this station?"
                    @confirm="handleDelete(scope.row.id)"
                    >
                        <template #reference>
                            <el-button 
                            type="danger" 
                            size="small"
                            >Delet</el-button>
                        </template>                           
                    </el-Popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        class="fr mt mb"
        v-model:current-page="pageInfo.page"
        v-model:page-size="pageInfo.pageSize"
        background
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRef"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
    </el-card>
    <stationForm 
    :dialog-visible="visible"
    @close="visible=false"
    @reload="loadStationListData"
    />
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { stationListApi,deleteStationApi } from "@/api/chargingStation"; 
import stationForm from "./components/StationForm.vue";
import type { RowType } from "@/types/station";
import { useStationStore } from "@/store/station";
import { ElMessage } from "element-plus";


const select = ref("name")
const formParams = reactive({
    input: "",
    value:1
})

const loading = ref<boolean>(false)


const stationListTableData = ref<RowType[]>([])
const pageInfo = reactive({
    page: 1,
    pageSize: 10,
    
})

const loadStationListData = async () => {
    loading.value=true
    const { data: { list, total } } = await stationListApi({ ...pageInfo,status:formParams.value,[select.value]:formParams.input })
    loading.value=false
    stationListTableData.value = list
    totalRef.value=total
}
const totalRef=ref<number>(0)
const handleSizeChange=((size:number) => {
    pageInfo.pageSize = size
    loadStationListData()
})
const handleCurrentChange = ((page:number) => {
    pageInfo.page = page
    loadStationListData()
})



const handleReset = () => {
    pageInfo.page = 1
    pageInfo.pageSize = 10
    formParams.input = ""
    formParams.value = 1
    select.value="name"
    loadStationListData()
}

onMounted(() => {
    loadStationListData()
})

const visible = ref<boolean>(false)
const stationStore = useStationStore()
const {setRowData,resetFormData}=stationStore
const edit = (row: RowType) => {
    setRowData(row)
    visible.value=true
}

const handleAdd = () => {
    resetFormData()
    visible.value = true
}

const handleDelete =async (id:string) => {
    try {
        const res = await deleteStationApi(id)
        if (res.code == 200) {
            ElMessage({
                message: res.data,
                type:"success"
            })
        }
        loadStationListData()
    } catch {
        
    }
  
}


</script>