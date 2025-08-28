import { get } from "@/utils/http"

const Api = {
    ArticleCategory:"/document"
    
} as const;

function articleCategoryApi() {
    return get(Api.ArticleCategory)
}

export {articleCategoryApi}