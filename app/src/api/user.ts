import { post } from "@/utils/http";

// Assign paths to variables for centralised management, making future development easier.
const Api = {
    Login: "/login"
} as const;

interface LoginParams {
    username: string;
    password: string
}

function loginApi(data: LoginParams): Promise<any> {
    return post(Api.Login, data)
}

export { loginApi }