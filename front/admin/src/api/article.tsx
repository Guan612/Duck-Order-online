import http from ".";

export function getArticleListAPI() {
    return http.get("/article");
}

export function getArticleAPI(id:number){
    return http.get(`/article/${id}`)
}

export function addArticleAPI(data:any){
    return http.post("/article",data)
}

export function editArticleAPI(id:number, data:any){
    return http.patch(`/article/${id}`,data)
}

export function deleteArticleAPI(id:number){
    return http.delete(`/article/${id}`)
}