<template>
    <el-card>
        <el-select style="width:300px" placeholder="Select Station"></el-select>
    </el-card>

    <el-card class="mt">
        <el-radio-group size="large">
            <el-radio-button label="All" :value="0" />
            <el-radio-button label="Idle" :value="1" />
            <el-radio-button label="In Use" :value="2" />
            <el-radio-button label="Connecting" :value="3" />
            <el-radio-button label="In Line" :value="4" />
            <el-radio-button label="Booked" :value="5" />
            <el-radio-button label="Fault" :value="6" />
        </el-radio-group>
    </el-card>

    <el-card class="mt">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="item">
                    <div class="pic">
                        <p>Idle</p>
                        <img :src="free" width="100px">
                        <p>80%</p>
                    </div>
                    <div class="info">
                        <h3>CD001</h3>
                        <hr class="mb">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
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