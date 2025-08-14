import { post } from "@/utils/http";

const Api = {
    MapList: "/mapList"
} as const;

function mapListApi() {
    return post(Api.MapList)
}

export {mapListApi}