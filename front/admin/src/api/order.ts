import http from ".";

export function getOrderListAPI() {
	return http.get("/order");
}

export function getOrderDetailAPI(id: number) {
	return http.get(`/order/${id}`);
}

export const getOrderDetaiListAPI = (id: string) => {
	return http.get(`/order/list/${id}`);
};

export const selectOrderStatusAPI = (orderStatus: number[]) => {
	return http.get("/order/status/", { params: { orderStatus: orderStatus } });
};