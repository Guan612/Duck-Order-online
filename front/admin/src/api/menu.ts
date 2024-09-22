import http from "./index";

export const getMenuListAPI = () => {
    return http.get('/menu');
};