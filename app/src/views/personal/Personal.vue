<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card>
                <el-descriptions
                    direction="vertical"
                    border
                    style="margin-top: 20px"
                >
                    <el-descriptions-item
                        :rowspan="2"
                        :width="140"
                        label="Photo"
                        align="center"
                    >
                        <el-image
                            style="width: 100px; height: 100px"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        />
                    </el-descriptions-item>
                    <el-descriptions-item label="Username">Super Star</el-descriptions-item>
                    <el-descriptions-item label="Telephone">0277777777</el-descriptions-item>
                    <el-descriptions-item label="Place">Auckland</el-descriptions-item>
                    <el-descriptions-item label="Remarks">
                        <el-tag size="small" class="mr">Proactive</el-tag>
                        <el-tag size="small" class="mr">Easy going</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="Address">
                        4, w Avenue, Takapuna, Auckland, NZ
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card class="mt">
                <el-calendar v-model="value"/>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <span>Complete your profile</span>
                    </div>
                </template>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <StepForm :steps="steps" :form1="basicInfoRef" :form2="jobInfoRef" @handle-submit="handleSubmit">
                            <template #step-1>
                                <el-form :model="formData.basicInfo" ref="basicInfoRef">
                                    <el-form-item label="Name">
                                        <el-input v-model="formData.basicInfo.name"/>
                                    </el-form-item>
                                    <el-form-item label="Phone">
                                        <el-input v-model="formData.basicInfo.tel"/>
                                    </el-form-item>
                                    <el-form-item label="Address">
                                        <el-input v-model="formData.basicInfo.address"/>
                                    </el-form-item>
                                </el-form>
                            </template>
                            <template #step-2>
                                <el-form :model="formData.job" ref="jobInfoRef">
                                    <el-form-item label="Status">
                                        <el-select placeholder="Select Status" v-model="formData.job.status">
                                            <el-option label="Busy" value="1"></el-option>
                                            <el-option label="On Leave" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </StepForm>
                    </el-col>
                    <el-col :span="8">
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-around;">
                            <h1 style="margin-bottom: 40px;" class="mt">Profile Completeness</h1>
                            <el-progress type="circle" :percentage="85" />
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <!-- The following is just static content. -->
        <el-col :span="12">
            <el-card>
                <p class="mb">The following is just static content.</p>
                <el-badge :value="12" class="mr">
                    <el-button>To-Do</el-button>
                </el-badge>
                <el-badge :value="3" class="mr">
                    <el-button>Assigned to Me</el-button>
                </el-badge>
                <el-badge :value="12" class="mr">
                    <el-button>Department Announcements</el-button>
                </el-badge>
                <el-badge :value="3" class="mr">
                    <el-button>Messages</el-button>
                </el-badge>
                <el-badge :value="1" class="mr" type="primary">
                    <el-button>Assigned by Me</el-button>
                </el-badge>
            </el-card>

            <el-card class="mt">
                <el-collapse>
                    <el-collapse-item title="Account Deactivation Notice!" name="1">
                        <div style="display: flex;justify-content: space-between;" class="mt">
                            <h3>Employee resigned, account needs to be deactivated, please handle in time!</h3>
                            <el-button type="primary" size="small" class="mr" v-permission="'admin'">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Permission Change Notice!" name="2">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Jeff’s account permissions need to be updated due to department transfer!</h3>
                            <el-button type="primary" size="small" class="mr" v-permission="'user'">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Finance Disbursement Notice!" name="3">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Repair disbursement for Auckland charging station!</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Staff Transfer Notice!" name="4">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Lee transferred from Administration to Maintenance, needs processing!</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Business Trip Reimbursement Approval" name="5">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Operations Department: 7 staff business trip, reimbursement of $8700 requires approval</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Finance Disbursement Notice!" name="6">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Repair disbursement for Christchurch charging station!</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Staff Transfer Notice!" name="7">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Jane transferred from Administration to Maintenance, needs processing!</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Business Trip Reimbursement Approval" name="8">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Operations Department: 7 staff business trip, reimbursement of 8700 yuan requires approval</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Account Deactivation Notice!" name="9">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Employee resigned, account needs to be deactivated, please handle in time!</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Permission Change Notice!" name="10">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Lily’s account permissions need to be updated due to department transfer!</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>

                    <el-collapse-item title="Finance Disbursement Notice!" name="11">
                        <div style="display: flex;justify-content: space-between;">
                            <h3>Repair disbursement for Wellington charging station!</h3>
                            <el-button type="primary" size="small" class="mr">Handle</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-card>

        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import StepForm from "@/components/stepForm/StepForm.vue";
import type { FormInstance } from "element-plus";

const value = ref(new Date())
const steps = [
    { title: "Basic Info" },
    { title: "Job Info" }
]

const basicInfoRef = ref<FormInstance>()
const jobInfoRef = ref<FormInstance>()

const formData = ref({
    basicInfo: {
        name: "",
        address: "",
        tel:""
    },
    job: {
        status:""
    }
})

const handleSubmit = () => {
    console.log("Complete profile:",formData.value)
}
</script>