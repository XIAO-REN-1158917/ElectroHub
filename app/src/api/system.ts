import { post } from "@/utils/http";

const Api = {
    UserAuth: "/userAuth",
    EditAuth:"/setAuth"
} as const;

function getUserAuthApi(pageAuthority: string) {
    return post(Api.UserAuth,{pageAuthority})
}

function editAuthApi(account:string,btnList:string[],pageList:string[]) {
    return post(Api.EditAuth,{account,btnList,pageList})
}

export {
    getUserAuthApi,
    editAuthApi
}