<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model="searchParams.no" placeholder="Please enter member ID"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input v-model="searchParams.tel" placeholder="Please enter phone number"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input v-model="searchParams.name" placeholder="Please enter member name"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="loadData">Filter</el-button>
                <el-button @click="handleReset">Reset</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column type="index" label="#" width="80"/>
            <el-table-column prop="memberCardNumber" label="Member ID"></el-table-column>
            <el-table-column prop="cardType" label="Member Class"></el-table-column>
            <el-table-column prop="issueDate" label="Issue Date"></el-table-column>
            <el-table-column prop="holderName" label="Name"></el-table-column>
            <el-table-column prop="holderPhone" label="Phone"></el-table-column>
            <el-table-column prop="cardBalance" label="Balance"></el-table-column>
            <el-table-column prop="transactionRecords" label="Transaction record">
                <template #default="scope">
                    <el-popover
                        placement="top-start"
                        title="Transaction record"
                        :width="200"
                        trigger="hover"
                        content="this is content, this is content, this is content"
                    >
                        <template #reference>
                            <el-button class="m-2">Transactions</el-button>
                        </template>
                        <el-timeline style="max-width: 600px;">
                            <el-timeline-item 
                            v-for="(item,index) in scope.row.transactionRecords" 
                            color="#0bbd87" 
                            :timestamp="item.transactionDate"
                            :key="index"
                            >
                                <p>Amount:{{ item.transactionAmount }}</p>
                                <p>Item:{{ item.transactionType }}</p>
                            </el-timeline-item>
                        </el-timeline>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="validUntil" label="Expiry"></el-table-column>
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
import { ref } from "vue"
import { useQueryTable } from "@/hooks/useQueryTable";

const searchParams = ref({
    no: "",
    tel: "",
    name:""
})

const {tableData,loading,loadData,totals,pageInfo,handleCurrentChange,handleSizeChange,resetPagination }=useQueryTable("/member",searchParams)

const handleReset = () => {
    searchParams.value = {
        no: "",
        tel: "",
        name:""
    }
    resetPagination()
}
</script>