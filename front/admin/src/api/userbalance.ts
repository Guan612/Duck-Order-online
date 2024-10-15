import http from ".";

export const getAllBalanceAPI = () =>{
    return http.get("/userbalance/all");
}

export const updateUserbalanceAPI = (id:number, balance:number) =>{
    return http.patch(`/userbalance/${id}`, {balance:balance});
}