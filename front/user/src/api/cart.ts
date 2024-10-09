import http from ".";

export const getUserCartListAIP = () => {
	return http.get("/cart/byUserId");
};

export const addToCartAIP = (data: any) => {
	return http.post("/cart", data);
};
