import { post, get } from "@/utils/http"
import type { RowType } from "@/types/station";

const Api = {
    StationList: "/station",
    EditStation: "/station/edit", 
    DeleteStation: "/station/delete",
    RevenueChart:"/revenueChart"
    
} as const;

interface ListType{
    page:number,
    pageSize:number,
    name?:string,
    id?:string,
    status:number
}

function stationListApi(data:ListType) {
    return post(Api.StationList,data)
}

function editStationApi(data:RowType) {
    return post(Api.EditStation,data)
}

function deleteStationApi(id: string) {
    return post(Api.DeleteStation,{id})
}

function revenueChartApi() {
    return get(Api.RevenueChart)
}



export {stationListApi,editStationApi,deleteStationApi,revenueChartApi}