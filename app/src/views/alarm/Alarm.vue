<template>
    <!-- <el-card>
        <el-radio-group v-model="alarmRadio" size="large" class="mt">
            <el-radio-button label="Critical" :value="1"></el-radio-button>
            <el-radio-button label="High" :value="2"></el-radio-button>
            <el-radio-button label="Medium" :value="3"></el-radio-button>
            <el-radio-button label="Low" :value="4"></el-radio-button>
        </el-radio-group>
    </el-card> -->
    <el-card class="mt" v-for="item in alarmList" :key="item.equNo">
        <el-alert :title="`Exception occurred in ${item.address}`" type="warning" show-icon/>
        <el-descriptions :border="true" :column="4" direction="vertical" class="mt">
            <el-descriptions-item v-for="(val,key) in item" :label="getFieldLabel(key)">
                <el-tag v-if="key==='level'" :type="getAlarmLevelForProps(val as number)">
                    {{ getAlarmLevelForText(val as number) }}
                </el-tag>
                <el-text type="danger" v-else-if="key==='status'">
                    {{ getStatusFortext(val as number) }}
                </el-text>
                <span v-else>{{ val }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="Operate">
                <el-button
                @click="drawer=true" 
                :type="item.status===2?'warning':'primary'">
                    {{ getStatusForButton(item.status) }}
                </el-button>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
    <el-drawer
    v-model="drawer"
    title="Manage alarm tickets"
    >
        <StepForm 
        :steps="steps" 
        :form1="basicInfoFormRef"
        :form2="approvalInfoFormRef"
        :form3="supervisorInfoFormRef"
        @handle-submit="handleSubmit"
        >
            <template #step-1>
                <el-form 
                ref="basicInfoFormRef" 
                :model="formData.basicInfo" 
                :rules="formRules.basicInfoRules"
                >
                    <el-form-item label="Name" prop="name">
                        <el-input v-model="formData.basicInfo.name"/>
                    </el-form-item>
                    <el-form-item label="Phone" prop="phone">
                        <el-input v-model="formData.basicInfo.phone"/>
                    </el-form-item>
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="formData.basicInfo.email"/>
                    </el-form-item>
                    <el-form-item label="Employee ID" prop="employeeID">
                        <el-input v-model="formData.basicInfo.employeeID"/>
                    </el-form-item>
                    <el-form-item label="URGENT">
                        <el-switch v-model="formData.basicInfo.urgent"></el-switch>
                    </el-form-item>
                    <el-form-item label="Other Options">
                        <el-checkbox-group v-model="formData.basicInfo.other">
                            <el-checkbox value="1">Replace</el-checkbox>
                            <el-checkbox value="2">Repair</el-checkbox>
                            <el-checkbox value="3">Inspect</el-checkbox>
                            <el-checkbox value="4">Report</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="Remarks">
                        <el-input v-model="formData.basicInfo.remark" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </template>

            <template #step-2>
                <el-form 
                ref="approvalInfoFormRef" 
                :model="formData.approvalInfo"
                :rules="formRules.approvalInfoRules"
                >
                    <el-form-item label="Approver" prop="approver">
                        <el-select placeholder="Select Approver" v-model="formData.approvalInfo.approver">
                            <el-option label="Admin-1" value="1"></el-option>
                            <el-option label="Admin-2" value="2"></el-option>
                            <el-option label="Admin-3" value="3"></el-option>
                            <el-option label="Admin-4" value="4"></el-option>
                            <el-option label="Admin-5" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Reviewer" prop="reviewer">
                        <el-select placeholder="Select Reviewer" v-model="formData.approvalInfo.reviewer">
                            <el-option label="Admin-1" value="1"></el-option>
                            <el-option label="Admin-2" value="2"></el-option>
                            <el-option label="Admin-3" value="3"></el-option>
                            <el-option label="Admin-4" value="4"></el-option>
                            <el-option label="Admin-5" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>

            <template #step-3>
                <el-form
                ref="supervisorInfoFormRef" 
                :model="formData.supervisorInfo"
                :rules="formRules.supervisorInfoRules"
                >
                    <el-form-item label="Name" prop="name">
                        <el-input v-model="formData.supervisorInfo.name"/>
                    </el-form-item>
                    <el-form-item label="Phone" prop="phone">
                        <el-input v-model="formData.supervisorInfo.phone"/>
                    </el-form-item>
                </el-form>
            </template>
        </StepForm>
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { alarmListApi } from "@/api/alarm"
import { getFieldLabel, getAlarmLevelForProps, getAlarmLevelForText,getStatusFortext,getStatusForButton } from "./alarmMaps"
import StepForm from "@/components/stepForm/StepForm.vue"
import type { FormInstance } from "element-plus"
import { ElMessage } from 'element-plus'

interface AlarmListType{
    description: string,
    address: string,
    equNo: string,
    level: number,
    time: string,
    code: number,
    status: number,
}

const alarmList = ref<AlarmListType[]>([])

onMounted(async () => {
    try {
        const { data } = await alarmListApi();
        alarmList.value=data
    } catch (error) {
        console.log(error)
    }
})

const drawer = ref<boolean>(false)
const steps = [
    { title: "Basic Info" },
    { title: "Approval Info" },
    { title: "Supervisor Info" },
]

const formData = ref({
    basicInfo: {
        name: "",
        email: "",
        phone: "",
        employeeID: "",
        urgent: true,
        other: [],
        remark:""
    },
    approvalInfo: {
        approver: "",
        reviewer:""
    },
    supervisorInfo: {
        name: "",
        phone:""
    }
})

const formRules = {
    basicInfoRules: {
        name: [
            { required: true, message: "Please enter name", trigger: "blur" }
        ],
        email: [
            { required: true, message: "Please enter email", trigger: "blur" }
        ],
        phone: [
            { required: true, message: "Please enter phone Number", trigger: "blur" }
        ],
        employeeID: [
            { required: true, message: "Please enter employee ID", trigger: "blur" }
        ],
    },
    approvalInfoRules: {
        approver: [
            { required: true, message: "Please select approver", trigger: "blur" }
        ],
        reviewer: [
            { required: true, message: "Please select reviewer", trigger: "blur" }
        ],
    },
    supervisorInfoRules: {
        name: [
            {required: true, message: "Please enter name", trigger: "blur"}
        ],
        phone: [
            { required: true, message: "Please enter phone Number", trigger: "blur" }
        ]
    }
}


const basicInfoFormRef = ref<FormInstance>()
const approvalInfoFormRef = ref<FormInstance>()
const supervisorInfoFormRef = ref<FormInstance>()

const handleSubmit=()=>{
    console.log(formData.value);
    ElMessage({
    message: 'Assign successfully',
    type: 'success',
  });
  drawer.value=false;
}

</script>