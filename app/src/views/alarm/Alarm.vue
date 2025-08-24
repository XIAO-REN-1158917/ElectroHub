<template>
    <el-cark>
        <el-radio-group v-model="alarmRadio" size="large" class="mt">
            <el-radio-button label="Critical" :value="1"></el-radio-button>
            <el-radio-button label="High" :value="2"></el-radio-button>
            <el-radio-button label="Medium" :value="3"></el-radio-button>
            <el-radio-button label="Low" :value="4"></el-radio-button>
        </el-radio-group>
    </el-cark>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { alarmListApi } from "@/api/alarm";

interface AlarmListType{
    description: string,
    address: string,
    equNo: string,
    level: number,
    time: string,
    code: number,
    status: number,
}

const alarmRadio = ref < number > (1)
const alarmList = ref<AlarmListType[]>([])

onMounted(async () => {
    try {
        const { data } = await alarmListApi();
        alarmList.value=data
    } catch (error) {
        console.log(error)
    }
})

</script>