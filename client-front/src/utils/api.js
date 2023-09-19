//base url

export const API_URL = "https://shdr-apis.onrender.com";

//retrieve token from local storage
export const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
};