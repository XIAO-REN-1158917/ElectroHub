import { get } from "@/utils/http"

const Api = {
    LineChartData: "/lineChartData",
    PieChartData: "/pieChartData",
    RadarChartData:"/radarChartData"
    
} as const;

function lineChartDataApi() {
    return get(Api.LineChartData)
}

function pieChartDataApi() {
    return get(Api.PieChartData)
}

function radarChartDataApi() {
    return get(Api.RadarChartData)
}

export {lineChartDataApi,pieChartDataApi,radarChartDataApi}