import http from ".";

export const uploadImgAPI = (file: File) => {
  const formData = new FormData();
  formData.append("file", file); // 'file' 是后端接收的字段名

  return http.post("/upload/img", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // 确保 Axios 使用 multipart/form-data
    },
  });
};

export const uploadVideoAPI = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post("/upload/video", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadDocAPI = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post("/upload/doc", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
