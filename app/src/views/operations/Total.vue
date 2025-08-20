<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card>
                <el-input 
                style="width:80%;" 
                placeholder="Enter Key Words" 
                v-model="filterText">
                    <template #append>
                        <el-button icon="Search"></el-button>
                    </template>
                </el-input>
                <el-tree 
                ref="treeRef"
                class="mt"
                style="max-width: 600px;" 
                :props="defaultProps"
                :data="cityListData"
                :filter-node-method="filterNode"
                ></el-tree>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h3>{{ title }} - Tariff Configuration</h3>
                    </div>
                </template>
                <el-form ref="tariffConfigFormRef" :model="tariffConfigForm" :rules="tariffRules" label-width="auto">
                    <el-form-item label="Template Name">
                        <el-input v-model="tariffConfigForm.name" placeholder="Enter Tariff Template Name"/>
                    </el-form-item>
                    <el-form-item :label="'Time range '+(index+1)" v-for="(range,index) in tariffConfigForm.timeRange" :key="index">
                        <el-col :span="8">
                            <el-form-item>
                                <el-time-picker v-model="range.start" placeholder="Start time" style="width: 100%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="1" style="text-align:center">--</el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-time-picker v-model="range.end" placeholder="End time" style="width: 100%;" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="Tariff">
                                <el-input v-model="range.tariff" placeholder="per kWh" style="width: 100%;" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-button type="primary" class="mb" @click="handleAddTimeRange">Add Time Range</el-button>
                    <el-form-item label="Service Charge">
                        <el-input v-model="tariffConfigForm.serviceCharge" placeholder="per Hour" style="width: 100%;" />
                    </el-form-item>
                    <el-form-item label="Parking Charge">
                        <el-input v-model="tariffConfigForm.parkingCharge" placeholder="per Hour" style="width: 100%;" />
                    </el-form-item>
                    <el-form-item label="Remarks">
                        <el-input v-model="tariffConfigForm.remarks" placeholder="Enter your remarks" type="textarea" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">Create</el-button>
                        <el-button>Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue"
import { cityListApi } from "@/api/operations"
import type {ElTree,FormInstance,FormRules} from "element-plus"

interface CityListDataType {
    label: string,
    children?:CityListDataType
}
interface tariffConfigFormType{
    name: string,
    serviceCharge: string,
    parkingCharge: string,
    remarks: string,
    timeRange: Array<{
        start: string,
        end: string,
        tariff: string
    }>
}

const filterText = ref<string>("")
const cityListData = ref<CityListDataType[]>([])
const treeRef = ref<InstanceType<typeof ElTree>>()

watch(filterText, (val) => {
    treeRef.value!.filter(val)
})

const defaultProps = {
    children: "children",
    label:"label"
}

onMounted(async() => {
    try { 
        const { data } = await cityListApi()
        cityListData.value=data
    } catch (error) {
        console.log(error)
    }
})

const filterNode = (value:string,data:CityListDataType) => {
    if (!value) return true
    return data.label.includes(value)
}

/** Tariff Settings */
const title = ref<string>("")
const tariffConfigFormRef = ref<FormInstance>()
const tariffRules = reactive<FormRules<tariffConfigFormType>>({

})

const tariffConfigForm = ref<tariffConfigFormType>({
    name: "",
    serviceCharge: "",
    parkingCharge: "",
    remarks: "",
    timeRange: [
        {
            start: "",
            end: "",
            tariff:""
        }
    ]
})

const handleAddTimeRange = () => {
    tariffConfigForm.value.timeRange.push({
            start: "",
            end: "",
            tariff:""
        })
}

</script>