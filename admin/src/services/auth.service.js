import { api } from "../config/axios";

const setAuthorizationHeader = (cookie) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${cookie}`;
};

export const loginService = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/auth/login`, data)
      .then((res) => {
        const { message, token } = res.data;
        setAuthorizationHeader(token);
        localStorage.setItem("token", token);
        localStorage.setItem("uid", res.data.data._id);
        resolve({ message });
      })
      .catch((error) => {
        console.log(error)
        reject(error.response.data.message);
      });
  });
};

export const checkLoggedIn = async () => {
  const uid = await localStorage.getItem("uid");
  if (uid) {
    return true;
  }
  return false;
};
