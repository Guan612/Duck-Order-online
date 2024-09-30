import http from ".";

export const getUserCartListAIP = () => {
  return http.get("/cart/byUserId");
};
