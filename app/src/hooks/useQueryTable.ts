import { onMounted, reactive, ref, unref } from "vue"
import {post} from "@/utils/http"

export function useQueryTable<T>(url: string, initialParams:any) {
    const tableData = ref<T[]>([])
    const loading = ref<boolean>(false)
    const totals = ref<number>(0)
    const pageInfo = reactive({
        page: 1,
        pageSize:10
    })

    const loadData = async () => {
        loading.value = true
        
        try {
            // This only wraps the query form request — other request types still need to be re-wrapped in the api folder.
            // unref turns reactive data back into its original plain value.
            const { data: { list, total } } = await post(url, { ...unref(initialParams), ...pageInfo })
            tableData.value = list
            totals.value = total
        } catch(error) {
            console.log(error)
        } finally {
            loading.value=false
        }
    }

    onMounted(() => {
        loadData()
    })

    const handleSizeChange = (size:number) => {
        pageInfo.pageSize = size
        loadData()
    }

    const handleCurrentChange = (page: number) => {
        pageInfo.page = page
        loadData()
    }

    const resetPagination = () => {
        pageInfo.page = 1
        pageInfo.pageSize = 10
        loadData()
    }

    return {
        tableData,
        loading,
        totals,
        pageInfo,
        loadData,
        handleSizeChange,
        handleCurrentChange,
        resetPagination
    }
}