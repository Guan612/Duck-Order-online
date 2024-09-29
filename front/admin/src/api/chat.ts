import http from ".";

export const getRoomListAPI = () => {
  return http.get("/chat/room");
}

export const getRoomByIdAPI = (id: string) => {
	return http.get(`/chat/room/${id}`);
};