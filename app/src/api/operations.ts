import { post,get } from "@/utils/http";

const Api = {
    BatchDelete: "/batchDelete",
    QueryOrderDetail: "/orders/detail",
    CityList:"/cityList"
} as const;

function batchDeleteApi(order: string[]) {
    return post(Api.BatchDelete,{order})
}

function queryOrderDetailApi(orderNo: string) {
    return post(Api.QueryOrderDetail,orderNo)
}

function cityListApi() {
    return get (Api.CityList)
}

export {
    batchDeleteApi,
    queryOrderDetailApi,
    cityListApi
}