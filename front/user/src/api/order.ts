import http from ".";
export const createOrderAPI = () => {
	return http.post("/order");
};

export const addOrderListAPI = (id: number, data: any) => {
	return http.post(`/order/list/${id}`, data);
};
