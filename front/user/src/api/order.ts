import http from ".";

export const createOrderAPI = () => {
	return http.post("/order");
};

export const updateOrderAPI = (id: string, data: any) => {
	return http.patch(`/order/${id}`, data);
};

export const addOrderListAPI = (id: number, data: any) => {
	return http.post(`/order/list/${id}`, data);
};

export const getOrderDetaiLListAPI = (id: string) => {
	return http.get(`/order/list/${id}`);
};

export const getOrderTotalPriceAPI = (id: string) => {
	return http.get(`/order/total/${id}`);
}
