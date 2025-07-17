<template>
    <el-dialog
        :model-value="dialogVisible"
        :title="title"
        @close="hanleCancel()"
        destroy-on-close
    >
        <el-form 
        label-width="120"
        :rules="rules"
        :model="ruleForm"
        ref="formRef"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="Name:" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="ID:" prop="id">
                        <el-input 
                        v-model="ruleForm.id"
                        :disabled="disabled"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="City:" prop="city">
                        <el-input v-model="ruleForm.city"></el-input>
                    </el-form-item>
                    <el-form-item label="Manager:" prop="person">
                        <el-input v-model="ruleForm.person"></el-input>
                    </el-form-item>
                    <el-form-item label="Tel:" prop="tel">
                        <el-input v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Fast Charger:" prop="fast">
                        <el-input v-model="ruleForm.fast"></el-input>
                    </el-form-item>
                    <el-form-item label="Slow Charger:" prop="slow">
                        <el-input v-model="ruleForm.slow"></el-input>
                    </el-form-item>
                    <el-form-item label="Status:" prop="status" >
                        <el-select 
                        placeholder="Status" 
                        v-model="ruleForm.status"
                        :disabled="disabled"
                        >
                            <el-option label="All" :value="1"></el-option>
                            <el-option label="In Use" :value="2"></el-option>
                            <el-option label="Available" :value="3"></el-option>
                            <el-option label="Under Maintenance" :value="4"></el-option>
                            <el-option label="Pending Repair" :value="5"></el-option>
                        </el-select>
                    </el-form-item >
                    <el-form-item label="In Use:" prop="inUse">
                        <el-input 
                        v-model="ruleForm.inUse"
                        :disabled="disabled"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Fault:" prop="fault" >
                        <el-input 
                        v-model="ruleForm.fault"
                        :disabled="disabled"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="hanleCancel">
                    Cancel
                </el-button>
                <el-button 
                type="primary"
                @click="handleConfirm"
                >
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import type { FormRules,FormInstance } from "element-plus"
import type { RowType } from "@/types/station"
import { useStationStore } from "@/store/station";
import { storeToRefs } from "pinia";
import { editStationApi } from "@/api/chargingStation";
import { ElMessage } from "element-plus";

const props=defineProps({
    dialogVisible: {
        type: Boolean,
        required: true
    }
})

const ruleForm=ref<RowType>({
    name:"",
    id:"",
    city:"",
    fast:"",
    slow:"",
    status:1,
    inUse:"",
    fault:"",
    person:"",
    tel:""
})



// Simplified validation for demo purposes only.
const rules = reactive<FormRules<RowType>>({
  name: [
    { required: true, message: "Station name is required", trigger: "blur" }
  ],
  id: [
    { required: true, message: "Station ID is required", trigger: "blur" }
  ],
  city: [
    { required: true, message: "City is required", trigger: "blur" }
  ],
  person: [
    { required: true, message: "Attendant name is required", trigger: "blur" }
  ],
  tel: [
    { required: true, message: "Attendant phone number is required", trigger: "blur" }
  ],
  fast: [
    { required: true, message: "Number of fast chargers is required", trigger: "blur" }
  ],
  slow: [
    { required: true, message: "Number of slow chargers is required", trigger: "blur" }
  ],
  status: [
    { required: true, message: "Station status is required", trigger: "blur" }
  ],
  inUse: [
    { required: true, message: "Current charging count is required", trigger: "blur" }
  ],
  fault: [
    { required: true, message: "Fault count is required", trigger: "blur" }
  ]
});

const emit = defineEmits(["close","reload"])

const stationStore = useStationStore()
const { rowData } = storeToRefs(stationStore)
const title=ref<string>("")

watch(() => props.dialogVisible, () => {

    if (rowData.value.name) {
        title.value="Edit Station"
        disabled.value = true
    } else {
        title.value = "Add New Station"
        disabled.value = false
    }

    ruleForm.value = rowData.value
})
const disabled = ref<boolean>(false)

const hanleCancel = () => {
    emit("close")
}

const formRef=ref<FormInstance>()

const handleConfirm = () => {
    formRef.value?.validate(async(valid: boolean) => {
        if (valid) {
            const res = await editStationApi(ruleForm.value)
            if (res.code == 200) {
                ElMessage({
                    message: res.data,
                    type: "success"
                });
                hanleCancel();
                emit("reload")
            }
        }
    })
    
}

</script>