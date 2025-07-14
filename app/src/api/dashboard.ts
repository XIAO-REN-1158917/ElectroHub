import { get } from "@/utils/http"

const Api = {
    LineChartData: "/lineChartData",
    PieChartData:"/pieChartData"
} as const;

function lineChartDataApi() {
    return get(Api.LineChartData)
}

function pieChartDataApi() {
    return get(Api.PieChartData)
}

export {lineChartDataApi,pieChartDataApi}