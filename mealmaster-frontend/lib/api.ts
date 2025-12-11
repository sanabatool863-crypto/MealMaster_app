import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.0.120:5000", // replace with your backend IP
});
