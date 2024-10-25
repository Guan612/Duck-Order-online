import http from ".";

export const getArticleListAPI = () => {
	return http.get("/article");
};

export const getArticleDetailAPI = (id: number) => {
	return http.get(`/article/${id}`);
};
