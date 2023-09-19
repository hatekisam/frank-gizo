import { api } from "../config/axios";

export const fetchAllNots = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/notifications/${id}`)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((error) => {
        console.error("Error fetching All Notifications:", error);
        reject(error);
      });
  });
};
