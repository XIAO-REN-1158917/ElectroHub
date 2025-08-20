<template>
    <el-card>
        <el-descriptions :title="`Order No. ${$route.query.orderNo}`">
            <el-descriptions-item label="From Gary">
                We’re no longer using mock data to show the order details here.
                You can see from the tab above and the Order No. on this page that the parameter has been successfully passed from the Order page.
                If you check the console, you’ll see the backend also received the correct order number. This means we’ve successfully completed the order detail view feature.
            </el-descriptions-item>
            <el-descriptions-item>
                
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup lang="ts">
import { queryOrderDetailApi } from '@/api/operations';
import { onMounted,watch } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()


async function loadDetail() {
  const orderNo = route.query.orderNo as string
  const res = await queryOrderDetailApi(orderNo)
  if (res.code === 200) {
    console.log("Backend responded:",res.data)
  }
}

onMounted(loadDetail)

watch(() => route.query.orderNo, (val, oldVal) => {
  if (val && val !== oldVal) loadDetail()
})

</script>