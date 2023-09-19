import axios from "axios"


export const api = axios.create({
        baseURL: import.meta.env.VITE_REACT_BACKEND_URL
})

api.interceptors.request.use(config => {
        const token = localStorage.getItem("invmantok")
        if (token) {
                config.headers.Authorization = `Bearer  ${token}`;
        }
        return config
})