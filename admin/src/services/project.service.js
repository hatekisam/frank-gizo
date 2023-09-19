import { api } from "../config/axios";

export const fetchAllProjects = () => {
  return new Promise((resolve, reject) => {
    api
      .get(`/projects/`)
      .then((res) => {
        resolve(res.data.data.projects);
      })
      .catch((error) => {
        console.error("Error fetching All Projects:", error);
        console.log(error);
        reject(error);
      });
  });
};

export const fetchOneProject = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/projects/${id}`)
      .then((res) => {
        resolve(res.data.data.project);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createProduct = (product) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/projects/`, product)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.error("Error creating Project:", error);
        reject(error);
      });
  });
};
