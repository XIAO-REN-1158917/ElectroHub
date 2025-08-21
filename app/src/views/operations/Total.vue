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
                @node-click="handleNodeClick"
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
                    <el-form-item label="Template Name" prop="name">
                        <el-input v-model="tariffConfigForm.name" placeholder="Enter Tariff Template Name" :disabled="!title"/>
                    </el-form-item>
                    <el-form-item :label="'Time range '+(index+1)" v-for="(range,index) in tariffConfigForm.timeRange" :key="index">
                        <el-col :span="8">
                            <el-form-item label="From" :prop="'timeRange.'+index+'.start'" :rules="{required:true,message:'Please enter a start time.',trigger:'blur'}">
                                <el-time-picker v-model="range.start" value-format="hh:mm:ss" placeholder="Start time" style="width: 100%;" :disabled="!title" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="To" :prop="'timeRange.'+index+'.end'"  :rules="{required:true,message:'Please enter a start time.',trigger:'blur'}">
                                <el-time-picker v-model="range.end" value-format="hh:mm:ss" placeholder="End time" style="width: 100%;" :disabled="!title" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Tariff" :prop="'timeRange.'+index+'.tariff'" :rules="{required:true,message:'Please enter the tariff.',trigger:'blur'}">
                                <el-input v-model="range.tariff" placeholder="per kWh" style="width: 100%;" :disabled="!title" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-button 
                            type="danger" 
                            @click="handleRemoveTimeRange(index)" 
                            :disabled="tariffConfigForm.timeRange.length === 1"
                            circle 
                            icon="Delete"
                            size="small"
                            />
                        </el-col>
                    </el-form-item>
                    <el-button type="primary" class="mb" @click="handleAddTimeRange" :disabled="!title">Add Time Range</el-button>
                    <el-form-item label="Service Charge" prop="serviceCharge">
                        <el-input v-model="tariffConfigForm.serviceCharge" placeholder="per Hour" style="width: 100%;" :disabled="!title" />
                    </el-form-item>
                    <el-form-item label="Parking Charge" prop="parkingCharge">
                        <el-input v-model="tariffConfigForm.parkingCharge" placeholder="per Hour" style="width: 100%;" :disabled="!title" />
                    </el-form-item>
                    <el-form-item label="Remarks" prop="remarks">
                        <el-input v-model="tariffConfigForm.remarks" placeholder="Enter your remarks" type="textarea" :disabled="!title" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm" :disabled="!title">Create</el-button>
                        <el-button @click="resetForm" :disabled="!title">Reset</el-button>
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
    children?:CityListDataType[]
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

const handleNodeClick = (data:CityListDataType) => {
    if (data.children?.length) return
    title.value = data.label
    resetForm()
    
}

/** Tariff Settings */
const title = ref<string>("")
const tariffConfigFormRef = ref<FormInstance>()
const tariffRules = reactive<FormRules<tariffConfigFormType>>({
    name: [
        {required:true,message:"Please enter teamplate name",trigger:"blur"}
    ],
    serviceCharge: [
        {required:true,message:"Please enter service charge",trigger:"blur"}
    ],
    parkingCharge: [
        {required:true,message:"Please enter parking charge",trigger:"blur"}
    ],
    remarks: [
        {required:true,message:"Please enter remarks",trigger:"blur"}
    ],
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

const handleRemoveTimeRange = (index:number) => {
    if (tariffConfigForm.value.timeRange.length <= 1) return
    tariffConfigForm.value.timeRange.splice(index, 1)
}

const submitForm = () => {
    tariffConfigFormRef.value?.validate((valid) => {
        if (!valid) return
        console.log("Send to backend:",tariffConfigForm.value)
    })
}

const resetForm = () => {
    tariffConfigForm.value = {
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
    }
}

</script>