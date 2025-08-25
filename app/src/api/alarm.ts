import { get } from "@/utils/http"

const Api = {
    AlarmList:"/alarmList"
    
} as const;

function alarmListApi() {
    return get(Api.AlarmList)
}

export {alarmListApi}