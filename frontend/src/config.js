import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://e-commerce-react-app-demo.herokuapp.com/api/"
})