import axios from "axios";

const Service = axios.create({
  baseURL: "",
  time: 10000,
});

Service.interceptors.request.use((config) => {
  if (config.url.includes("/upload")) {
    // 假设上传的 URL 包含 '/upload'
    config.headers["Content-Type"] = "multipart/form-data"; // 重要: 不要手动添加 boundary，让浏览器处理
  } else {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  config.headers.token =
    window.sessionStorage.getItem("token") === null
      ? null
      : window.sessionStorage.getItem("token");

  return config;
});

Service.interceptors.response.use((respose) => {
  const res = respose.data;
  return res;
});

export default Service;
