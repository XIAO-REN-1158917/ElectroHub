<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model="formParams.input" placeholder="Enter name or ID">
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
                <el-button type="primary">Filter</el-button>
                <el-button>Reset</el-button>
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


</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const select = ref("name")
const formParams = reactive({
    input: "",
    value:1
})

const handleAdd = () => {
    
}

</script>