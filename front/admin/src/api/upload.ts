import http from ".";

export function uploadFileAPI(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return http.post('/upload/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}