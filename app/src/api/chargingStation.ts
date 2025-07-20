import { post, get } from "@/utils/http"
import type { RowType } from "@/types/station";

const Api = {
    StationList: "/station",
    EditStation: "/station/edit", 
    DeleteStation: "/station/delete",
    RevenueChart: "/revenueChart",
    RevenueList:"/revenueList"
    
} as const;

interface ListType{
    page:number,
    pageSize:number,
    name?:string,
    id?:string,
    status:number
}

interface RevenueType{
    page:number,
    pageSize:number,
    name:string
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

function revenueListApi(data:RevenueType) {
    return post(Api.RevenueList,data)
}



export {
    stationListApi,
    editStationApi,
    deleteStationApi,
    revenueChartApi,
    revenueListApi
}