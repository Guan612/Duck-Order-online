import http from ".";

export const getUserBalanceAPI = () => {
  return http.get(`/userbalance/`);
}

export const upbalanceAPI = ()=>{
  return http.get('/userbalance/upbalance')
}

export const getMyRankAPI = () =>{
  return http.get('/userbalance/myrank')
}

export const activityActiveAPI = (id:number,balance:number) => {
  return http.post(`/userbalance/activity/${id}`, {balance:balance})
}