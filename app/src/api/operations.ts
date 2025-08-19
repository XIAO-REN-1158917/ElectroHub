import { post } from "@/utils/http";

const Api = {
    BatchDelete: "/batchDelete"
} as const;

function batchDeleteApi(order: string[]) {
    return post(Api.BatchDelete,{order})
}

export {batchDeleteApi}