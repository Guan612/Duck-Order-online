import http from ".";

export const getRoomListAPI = () => {
  return http.get("/chat/room");
}