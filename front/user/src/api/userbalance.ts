import http from ".";

export const getUserBalanceAPI = () => {
  return http.get(`/userbalance/`);
}