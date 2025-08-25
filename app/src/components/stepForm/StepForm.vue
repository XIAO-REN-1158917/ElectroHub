<template>
    <div style="max-width: 600px">
        <el-steps :active="currentStep" finish-status="success" align-center>
            <el-step v-for="(step,index) in steps" :key="index" :title="step.title" />
        </el-steps>
    
        <div v-if="currentStep===0" class="mt">
            <slot name="step-1"></slot>
        </div>
        <div v-if="currentStep===1" class="mt">
            <slot name="step-2"></slot>
        </div>
        <div v-if="currentStep===2" class="mt">
            <slot name="step-3"></slot>
        </div>
        <div class="stepButtons">
            <el-button v-if="currentStep>0" @click="handleBack">Back</el-button>
            <el-button type="primary" @click="handleNextStep">
                {{currentStep===steps.length-1?"Submit":"Next"}}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const currentStep = ref<number>(0)
const props=defineProps(["steps","basicInfoFormRef","approvalInfoFormRef","supervisorInfoFormRef"])
const emit=defineEmits(["handleSubmit"])

const handleBack = () => {
    if (currentStep.value === 0) return
    currentStep.value--
    
}


const handleNextStep = () => {
    const forms=[props.basicInfoFormRef,props.approvalInfoFormRef,props.supervisorInfoFormRef]
    const currentForm = forms[currentStep.value]

    currentForm.validate((valid:boolean) => {
        if (valid) {
            if (currentStep.value<props.steps.length-1) {
                currentStep.value++
            } else {
                emit("handleSubmit")
            }
        }
    })
}

</script>