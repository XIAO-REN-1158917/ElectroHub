<template>
    <el-card>
        <el-radio-group v-model="alarmRadio" size="large" class="mt">
            <el-radio-button label="Critical" :value="1"></el-radio-button>
            <el-radio-button label="High" :value="2"></el-radio-button>
            <el-radio-button label="Medium" :value="3"></el-radio-button>
            <el-radio-button label="Low" :value="4"></el-radio-button>
        </el-radio-group>
    </el-card>
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
                <el-button :type="item.status===2?'warning':'primary'">
                    {{ getStatusForButton(item.status) }}
                </el-button>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { alarmListApi } from "@/api/alarm"
import { getFieldLabel, getAlarmLevelForProps, getAlarmLevelForText,getStatusFortext,getStatusForButton } from "./alarmMaps"

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