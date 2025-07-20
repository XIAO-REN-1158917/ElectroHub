import {ref} from "vue"
import { reactive } from "vue";

export function usePagination(loadData:()=>Promise<any>,initialPageSize=10) {
    const totals=ref<number>(0)

    const pageInfo = reactive({
        page: 1,
        pageSize:initialPageSize
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
        pageInfo.pageSize = initialPageSize
        
    }

    const setTotals = (total: number) => {
        totals.value=total
    }

    return {
        totals,
        pageInfo,
        handleSizeChange,
        handleCurrentChange,
        resetPagination,
        setTotals
    }

}