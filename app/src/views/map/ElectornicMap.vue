<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <MapContainer />
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="des">
                <div>1. Total charging stations: <el-text type="primary">10</el-text></div>
                <div>2. Most chargers in a single region: <el-text type="primary">Auckland (4)</el-text></div>
                <div>3. Regions with charging stations: <el-text type="primary">14</el-text></div>
                <div>4. Regions without charging stations: <el-text type="primary">22</el-text></div>
                <div>5. Cumulative charging stations: <el-text type="primary">Wellington (4)</el-text></div>
                <div>6. Highest single-day revenue: <el-text type="primary">Christchurch Riverside Charging Station</el-text></div>
                <div>7. Lowest single-day revenue: <el-text type="primary">Napier Marine Parade Charging Station</el-text></div>
                <div>8. Highest failure rate: <el-text type="primary">Rotorua Lakeside Charging Station</el-text></div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h3>Add New Station</h3>
                    </div>
                </template>
                <el-form :model="form" style="max-width: 600px;" label-width="85px">
                <el-form-item label="Station Name:">
                    <el-input placeholder="Enter station name" v-model="form.name" />
                </el-form-item>

                <el-form-item label="Station Address:">
                    <el-input placeholder="Enter station address" v-model="form.region" />
                </el-form-item>

                <el-form-item label="Longitude:">
                    <el-input placeholder="Enter longitude" v-model="form.longitude" />
                </el-form-item>

                <el-form-item label="Latitude:">
                    <el-input placeholder="Enter latitude" v-model="form.latitude" />
                </el-form-item>

                <el-form-item label="Enable Now:">
                    <el-switch v-model="form.now" />
                </el-form-item>

                <el-form-item label="Notes:">
                    <el-input placeholder="Enter notes" type="textarea" v-model="form.remarks" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">Create</el-button>
                    <el-button>Clear</el-button>
                </el-form-item>
                </el-form>

            </el-card>
        </el-col>
    </el-row>
    

</template>

<script lang="ts" setup>
// The form submission logic is the same as in earlier implementations. 
// Since this is a demo, we won't re-implement it here—this section is for display only.
    import MapContainer from '@/components/map/MapContainer.vue';
    import {reactive} from "vue"
    const form=reactive({
        name:"",
        region:"",
        longitude:"",
        latitude:"",
        now:"",
        remarks:""
    })
</script>

<style scoped>
    .des{line-height: 25px;}
</style>