import { post } from "@/utils/http";

const Api = {
    UserAuth: "/userAuth"
} as const;

function getUserAuthApi(pageAuthority: string) {
    return post(Api.UserAuth,{pageAuthority})
}

export {getUserAuthApi}