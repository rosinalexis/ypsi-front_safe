import axios from "axios";

axios.defaults.baseURL = `${process.env.VUE_APP_HTTP_API_URL}/api/`;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
