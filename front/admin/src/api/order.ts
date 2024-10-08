import http from ".";

export function getOrderListAPI() {
	return http.get("/order");
}

export function getOrderDetailAPI(id: number) {
	return http.get(`/order/${id}`);
}
