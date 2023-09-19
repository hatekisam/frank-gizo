import { api } from "../config/axios";

export const fetchAllUsers = () => {
  return new Promise((resolve, reject) => {
    api
      .get(`/users/`)
      .then((res) => {
        resolve(res.data.data.users);
      })
      .catch((error) => {
        reject({ message: `Error fetching all Users`, error });
      });
  });
};

export const fetchOneUser = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/users/${id}`)
      .then((res) => {
        resolve(res.data.data.user);
      })
      .catch((error) => {
        reject({ message: `Error fetching User: ${id}`, error });
      });
  });
};

export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/users/`, user)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.error("Error creating Users:", error);
        reject(error);
      });
  });
};
