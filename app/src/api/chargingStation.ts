import { post } from "@/utils/http"

const Api = {
    StationList: "/stationList",
    
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

export {stationListApi}