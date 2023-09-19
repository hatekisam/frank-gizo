import { api } from "../config/axios";

export const fetchAllFolders = () => {
  return new Promise((resolve, reject) => {
    api
      .get(`/folders/`)
      .then((res) => {
        resolve(res.data.data.folders);
      })
      .catch((error) => {
        console.error("Error fetching All Folders:", error);
        reject(error);
      });
  });
};

export const fetchOneFolder = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/folders/${id}`)
      .then((res) => {
        resolve(res.data.data.folder);
      })
      .catch((error) => {
        console.error("Error fetching One Folder:", error);
        reject(error);
      });
  });
};

export const createFolder = (folder) => {
  return new Promise((resolve, reject) => {
    api
      .post(`/folders/`, folder)
      .then((res) => {
        console.log(res.data);
        resolve(res.data.data);
      })
      .catch((error) => {
        console.error("Error creating Folder:", error);
        reject(error);
      });
  });
};
