<template>
    <el-card>
        <!-- The fuzzy search functionality here is for demonstration purposes only 
         — in real projects, fuzzy search is typically implemented on the backend. -->
        <el-select 
        style="width:300px" 
        placeholder="Select Station"
        v-model="value"
        filterable
        >
        <el-option 
        v-for="item in stationList" 
        :key="item.id" 
        :value="item.name" 
        :label="item.name"></el-option>
        </el-select>
    </el-card>

    <el-card class="mt">
        <el-radio-group size="large" v-model="radio">
            <el-radio-button :label="`All(${allCount})`" :value="0" />
            <el-radio-button :label="`Idle(${checkCount(1)})`" :value="1" />
            <el-radio-button :label="`In Use(${checkCount(2)})`" :value="2" />
            <el-radio-button :label="`Connecting(${checkCount(3)})`" :value="3" />
            <el-radio-button :label="`In queue(${checkCount(4)})`" :value="4" />
            <el-radio-button :label="`Booked(${checkCount(5)})`" :value="5" />
            <el-radio-button :label="`Out of Order(${checkCount(6)})`" :value="6" />
        </el-radio-group>
    </el-card>

    <el-card class="mt">
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in pileList" :key="item.id">
                <div class="item">
                    <div class="pic">
                        <p v-if="item.status===1">Idle</p>
                        <p v-else-if="item.status===2">In Use</p>
                        <p v-else-if="item.status===3">Connecting</p>
                        <p v-else-if="item.status===4">In queue</p>
                        <p v-else-if="item.status===5">Booked</p>
                        <p v-else-if="item.status===6">Out of Order</p>
                        <img :src="item.status===1?free:(item.status===6?outline:ing)" width="100px">
                        <p v-if="item.status===2">{{item.percent}}</p>
                        <p v-else>0%</p>
                    </div>
                    <div class="info">
                        <h3>{{ item.id }}</h3>
                        <hr class="mb">
                        <p>Voltage:{{ item.voltage }}</p>
                        <p>Current:{{ item.current }}</p>
                        <p>Power:{{ item.power }}</p>
                        <p>Temp:{{ item.tem }}</p>
                    </div>
                </div>
                <div class="btn">
                    <div class="divder"></div>
                    <div>
                        <p class="fl ml" style="font-size: 12px;color: #999;">No Fault</p>
                        <div class="fr" style="text-align: right;">
                            <el-button size="small">Service Record</el-button>
                            <el-button size="small" type="primary">Usage Record</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts" setup>
import free from "@/assets/free.png"
import outline from "@/assets/outline.png"
import ing from "@/assets/ing.png"
import { currentListApi } from "@/api/chargingStation";
import { onMounted,ref,computed } from "vue";

//We’re not strictly specifying the type for the mock data here — in a real project, it would depend on the development requirements.
const stationList = ref<any>([]) //  for drop box
const pileList = ref<any>([]) //  for list

const loadCurrentListData = async () => {
    // const res = await currentListApi()
    const {data} = await currentListApi()
    // console.log(res)
    stationList.value = data
    pileList.value = data[0].list
    // console.log("current list",currentDataList.value[0].status)
}

onMounted(() => {
    loadCurrentListData()
})


const value = ref<string>("")
const radio=ref<number>(0)

function checkCount(num: number) {
    return pileList.value.filter((item: any) => item.status == num ).length
}

const allCount = computed(() => checkCount(1) + checkCount(2) + checkCount(3) + checkCount(4) + checkCount(5) + checkCount(6))

</script>

<style lang="less" scoped>
.item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: rgb(247, 251, 254);
    padding: 20px;
    border-radius: 10px 10px 0 0;
    margin-top: 20px;

    .pic {
        p {
            width: 76px;
            text-align: center;
            margin-bottom: 10px;
            color: rgb(61, 187, 146);
        }
    }

    .info {
        color: #999;
        margin-left: 30px;
        line-height: 26px;
        margin-top: -10px;
    }
}

.btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #f7fbfe;

    .divder {
        background-color: #f4f4f4;
        height: 2px;
        width: 95%;
        margin: auto;
    }
}
</style>