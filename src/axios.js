import axios from "axios";

axios.defaults.baseURL = "https://127.0.0.1:8000/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
