import { post } from "@/utils/http";

const Api = {
    BatchDelete: "/batchDelete",
    QueryOrderDetail:"/orders/detail"
} as const;

function batchDeleteApi(order: string[]) {
    return post(Api.BatchDelete,{order})
}

function queryOrderDetailApi(orderNo: string) {
    return post(Api.QueryOrderDetail,orderNo)
}

export {
    batchDeleteApi,
    queryOrderDetailApi
}