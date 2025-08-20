<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="Order No." v-model="orderQueryParams.orderNo"></el-input>
            </el-col>

            <el-col :span="6">
                <el-select placeholder="Status" v-model="orderQueryParams.status">
                    <el-option label="All" :value="1"></el-option>
                    <el-option label="In Progress" :value="2"></el-option>
                    <el-option label="Fulfilled" :value="3"></el-option>
                    <el-option label="Exception" :value="4"></el-option>
                </el-select>
            </el-col>

            <el-col :span="6" v-model="orderQueryParams.EquipmentNo">
                <el-input placeholder="Equipment No."></el-input>
            </el-col>

            <el-col :span="6">
                <el-button type="primary" @click="loadData">Filter</el-button>
                <el-button @click="handleResetQueryForm">Reset</el-button>
            </el-col>

            <el-col :span="6" class="mt" v-model="orderQueryParams.stationName">
                <el-input placeholder="Station Name"></el-input>
            </el-col>

            <el-col :span="6" class="mt">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    @change="handleChange"
                    value-format="DD-MM-YYYY"
                />
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="danger" :disabled="!selectionList.length" @click="handleBatchDelete">Batch Delet</el-button>
        <el-button type="primary" icon="Download" :disabled="!selectionList.length" @click="handleExportToExcel">Export to Excel</el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" v-loading="loading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="Order No." prop="orderNo"></el-table-column>
            <el-table-column label="Order Date" prop="date"></el-table-column>
            <el-table-column label="Start" prop="startTime"></el-table-column>
            <el-table-column label="End" prop="endTime"></el-table-column>
            <el-table-column label="Equip. No." prop="equipmentNo"></el-table-column>
            <el-table-column label="Amount" prop="amount"></el-table-column>
            <el-table-column label="Payment Method" prop="paymentMethod"></el-table-column>
            <el-table-column label="Status" prop="status">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.status==2">In Progress</el-tag>
                    <el-tag type="primary" v-if="scope.row.status==3">Fulfilled</el-tag>
                    <el-tag type="warning" v-if="scope.row.status==4">Exception</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Operate" width="160">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleOrderDetail(scope.row.orderNo)">Details</el-button>
                    <el-button type="danger" size="small">Delete</el-button>
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
        :total=totals
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
    </el-card>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { useQueryTable } from "@/hooks/useQueryTable"
import { batchDeleteApi } from "@/api/operations"
import { ElMessage } from "element-plus"
import { useRouter,useRoute } from "vue-router"
import { useTabsStore } from "@/store/tabs"
import * as XLSX from "xlsx"
import {saveAs} from "file-saver"

interface OrderQueryType{
    orderNo: string,
    status: number,
    EquipmentNo: string,
    stationName: string,
    startDate: string,
    endDate:string
}

interface OrderTableRowType{
    orderNo: string,
    date: string,
    startTime: string,
    endTime: string,
    equipmentNo: string,
    amount: number,
    paymentMethod: string,
    status:number
}

const date = ref()
const orderQueryParams = ref<OrderQueryType>({
    orderNo: "",
    status: 1,
    EquipmentNo: "",
    stationName: "",
    startDate: "",
    endDate:""
})

const handleChange = (val: string[]) => {
    //Use startDate and endDate instead of an array — more common for backends
    orderQueryParams.value.startDate = val[0]
    orderQueryParams.value.endDate=val[1]
}

const {
        tableData,
        loading,
        totals,
        pageInfo,
        loadData,
        handleSizeChange,
        handleCurrentChange,
        resetPagination
} = useQueryTable<OrderTableRowType>("/orderList", orderQueryParams)

const handleResetQueryForm = () => {
    date.value = ""
    orderQueryParams.value = {
        orderNo: "",
        status: 1,
        EquipmentNo: "",
        stationName: "",
        startDate: "",
        endDate:""
    }
    resetPagination()
}

const selectionList=ref<OrderTableRowType[]>([])
const handleSelectionChange = (selection: OrderTableRowType[]) => {
    selectionList.value=selection
}

const handleBatchDelete = async() => {
    try {
        const res = await batchDeleteApi(selectionList.value.map((item: OrderTableRowType) => item.orderNo))
        if (res.code===200) {
            ElMessage({
                message: res.data,
                type:"success"
            })
            loadData()
        }
    } catch (error) {
        console.log(error)
    }
}

const router = useRouter()
const tabStore=useTabsStore()
const {addTab,setCurrentTab}=tabStore
const handleOrderDetail = (orderNo: string) => {
    console.log("From Orders view: order No.",orderNo)
    addTab(orderNo + " Detail", "/operations/detail?orderNo="+orderNo, "Share")
    setCurrentTab(orderNo + " Detail", "/operations/detail?orderNo="+orderNo)
    router.push("/operations/detail?orderNo="+orderNo)
}

const route = useRoute()

watch(() => route.name, (to, from) => {
    // console.log(to, from)
    if (to == "orders" && from != "detail") {
        loadData()
    }
})

const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(selectionList.value)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([wbout], { type: "application/octet-stream" })
    saveAs(blob,"Orders.xlsx")
}

</script>